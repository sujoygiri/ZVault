import {
    app,
    BrowserWindow,
    ipcMain,
    IpcMainInvokeEvent,
    shell,
    dialog,
    IpcMainEvent
} from "electron";
import path from "node:path";
import os from "node:os";
import fs from "node:fs";
import { Buffer } from "node:buffer";
import crypto, { Encoding } from "node:crypto";
import {
    BOOLEAN,
    DuckDBConnection,
    DuckDBInstance,
    DuckDBMaterializedResult,
    INTEGER,
    UUID,
    VARCHAR,
} from "@duckdb/node-api";
import argon2 from "@node-rs/argon2";
import { drive_v3, drive as googleDrive } from "@googleapis/drive";
import { OAuth2Client } from "google-auth-library";

const REDIRECT_URI = 'http://localhost';
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
const USER_DATA_PATH = app.getPath("userData");
const TOKEN_PATH = path.join(USER_DATA_PATH, 'drive-token.enc');
const VAULT_PATH = path.join(USER_DATA_PATH, "vault.db");
const TEMP_VAULT_PATH = path.join(app.getPath("temp"), 'zvault-cloud-latest.db');
const VAULT_DATA_PATH = path.join(USER_DATA_PATH, "vault.data");
const BACKUP_FOLDER_NAME = 'ZVault Backups';

let vaultDEK: Buffer | null = null;
let dbConnection: DuckDBConnection | null = null;
let mainWindow: BrowserWindow | null = null;
let passwordWindow: BrowserWindow | null = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        minWidth: 1200,
        height: 900,
        minHeight: 900,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"), // Optional preload
            nodeIntegration: false, // Keep false for security
            contextIsolation: true,
        },
    });

    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url).catch((err) => {
            console.log(err);
        });
        return { action: "deny" };
    });

    if (app.isPackaged) {
        // In packaged app, files are next to the executable
        mainWindow
            .loadFile(path.join(process.resourcesPath, "renderer", "index.html"))
            .catch((err) => {
                console.log(err);
            });
    } else {
        // In development, load from src folder
        const rendererPath = path.join(
            __dirname,
            "..",
            "..",
            "src",
            "renderer",
            "index.html",
        );
        mainWindow.loadFile(rendererPath).catch((err) => {
            console.log(err);
        });

        // Optional: Auto-open dev tools in dev mode
        // win.webContents.openDevTools({ mode: 'detach' });
    }
}

app.whenReady().then(() => {
    ipcMain.handle("vaultExistStatus", vaultExistStatus);
    ipcMain.handle("unlockVault", unlockVault);
    ipcMain.handle("addNewData", addNewData);
    ipcMain.handle("deleteData", deleteData);
    ipcMain.handle("editData", editData);
    ipcMain.handle("createNewVault", createNewVault);
    ipcMain.handle("decryptSensitiveData", decryptSensitiveData);
    ipcMain.handle("fetchData", fetchData);
    ipcMain.handle("connectToCloud", connectToCloud);
}).then(() => {
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// context bridge api calls handler
function vaultExistStatus(): boolean {
    return fs.existsSync(VAULT_PATH);
}


async function initializeDbConnection(dbEncryptionKey: string) {
    try {
        const dbInstance = await DuckDBInstance.create();
        dbConnection = await dbInstance.connect();
        await dbConnection.run(
            `ATTACH '${VAULT_PATH}' AS vault (ENCRYPTION_KEY '${dbEncryptionKey}', ENCRYPTION_CIPHER 'GCM')`,
        );
        // initialize the table to store the data
        await dbConnection.run(`CREATE TABLE IF NOT EXISTS vault.accounts (
            id UUID PRIMARY KEY DEFAULT uuidv7(),
            iv VARCHAR NOT NULL,
            tag VARCHAR NOT NULL,
            title VARCHAR NOT NULL,
            category VARCHAR NOT NULL,
            encrypted_data VARCHAR NOT NULL,
            url VARCHAR NOT NULL,
            icon_hint VARCHAR,
            is_favorite BOOLEAN DEFAULT FALSE,
            last_modified TIMESTAMPTZ DEFAULT now()
        )`);
        await dbConnection.run(`CREATE TABLE IF NOT EXISTS vault.texts (
            id UUID PRIMARY KEY DEFAULT uuidv7(),
            iv VARCHAR NOT NULL,
            tag VARCHAR NOT NULL,
            title VARCHAR NOT NULL,
            category VARCHAR NOT NULL,
            encrypted_data VARCHAR NOT NULL,
            is_favorite BOOLEAN DEFAULT FALSE,
            last_modified TIMESTAMPTZ DEFAULT now()
        )`);
        await dbConnection.run(`USE vault`);
    } catch (error) {
        if (dbConnection) {
            dbConnection.closeSync();
        }
        dbConnection = null;
        console.log({ error, where: "initializeDbConnection" });
    }
}

async function deriveMasterKey(
    password: string,
    salt: Buffer
): Promise<Buffer> {
    const userDeviceThreadsCount = os.cpus().length;
    return await argon2.hashRaw(password, {
        // algorithm: argon2.Algorithm.Argon2id,
        parallelism: userDeviceThreadsCount <= 2 ? 1 : userDeviceThreadsCount / 2,
        timeCost: 5,
        memoryCost: 19 * 1024,
        salt
    });
}

function encryptData(
    vaultData: string,
    key: Buffer,
    inputEncoding: Encoding,
    outputEncoding: Encoding,
) {
    const IV = crypto.randomBytes(32);
    const cipherGCM = crypto.createCipheriv("aes-256-gcm", key, IV);
    const encryptedData =
        cipherGCM.update(vaultData, inputEncoding, outputEncoding) +
        cipherGCM.final(outputEncoding);
    const TAG = cipherGCM.getAuthTag();
    return {
        IV: IV.toString(outputEncoding),
        TAG: TAG.toString(outputEncoding),
        encryptedData,
    };
}

function decryptData(
    decryptionIV: string,
    decryptionTAG: string,
    encryptedData: string,
    decryptionKey: Buffer,
    inputEncoding: Encoding,
    outputEncoding: Encoding,
) {
    const IV = Buffer.from(decryptionIV, inputEncoding);
    const TAG = Buffer.from(decryptionTAG, inputEncoding);
    const cipherData = Buffer.from(encryptedData, inputEncoding);
    const deCipherData = crypto.createDecipheriv(
        "aes-256-gcm",
        decryptionKey,
        IV,
    );
    deCipherData.setAuthTag(TAG);
    let decryptedData = deCipherData.update(
        cipherData,
        undefined,
        outputEncoding,
    );
    decryptedData += deCipherData.final(outputEncoding);
    return decryptedData;
}

async function getTableData(
    tableName: DataTables,
    columnName: string,
    pageNum: number,
    pageSize: number,
    sortingOrder: "ASC" | "DESC",
) {
    try {
        let offset = (pageNum - 1) * pageSize;
        if (dbConnection) {
            const fetchRowsCountQuery =
                await dbConnection.run(`SELECT COUNT(*) as total_rows FROM ${tableName}`);
            const tableRowsCountInJson =
                await fetchRowsCountQuery.getRowObjectsJson();
            const totalTableRowsCount = Number(tableRowsCountInJson[0]["total_rows"]);
            if (totalTableRowsCount !== 0 && totalTableRowsCount > pageSize && offset === totalTableRowsCount) offset = (pageNum - 2) * pageSize;
            let fetchTableRowsQuery: DuckDBMaterializedResult | null = null;
            if (tableName === "accounts") {
                fetchTableRowsQuery = await dbConnection.run(
                    `SELECT id, title, category, icon_hint, is_favorite, url, last_modified
                     FROM ${tableName}
                     ORDER BY ${columnName} ${sortingOrder} LIMIT $a
                     OFFSET $b`,
                    { a: pageSize, b: offset },
                    { a: INTEGER, b: INTEGER },
                );
            } else {
                fetchTableRowsQuery = await dbConnection.run(
                    `SELECT id, title, category, is_favorite, last_modified
                     FROM ${tableName}
                     ORDER BY ${columnName} ${sortingOrder} LIMIT $a
                     OFFSET $b`,
                    { a: pageSize, b: offset },
                    { a: INTEGER, b: INTEGER },
                );
            }
            const tableRows = await fetchTableRowsQuery.getRowObjectsJson();
            return {
                rows: tableRows,
                totalEntries: totalTableRowsCount,
                type: tableName,
            };
        } else {
            throw new Error(
                "Something went wrong with db connection at getTableData",
            );
        }
    } catch (error) {
        console.log({ error, where: "getTableData" });
    }
}

async function getAppData() {
    const storedAppData = await fs.promises.readFile(VAULT_DATA_PATH, { encoding: "utf8" });
    return JSON.parse(storedAppData)
}

async function createNewVault(_event: IpcMainInvokeEvent, password: string) {
    try {
        const dbEncryptionKeySalt = crypto.randomBytes(32);
        const dekEncryptionKeySalt = crypto.randomBytes(32);

        const dbEncryptionKey = await deriveMasterKey(
            password,
            dbEncryptionKeySalt
        );

        await initializeDbConnection(dbEncryptionKey.toString("hex"));

        const dekEncryptionKey = await deriveMasterKey(
            password,
            dekEncryptionKeySalt
        );
        vaultDEK = crypto.randomBytes(32);
        // encrypt DEK
        const encryptedDEKMetaData = encryptData(
            vaultDEK.toString("hex"),
            dekEncryptionKey,
            "hex",
            "hex",
        );
        const appDataToStore = {
            dbEncryptionKeySalt: dbEncryptionKeySalt.toString("hex"),
            dekEncryptionKeySalt: dekEncryptionKeySalt.toString("hex"),
            ...encryptedDEKMetaData
        }
        await fs.promises.writeFile(VAULT_DATA_PATH, JSON.stringify(appDataToStore));
        return await getTableData("accounts", "id", 1, 10, "ASC");
    } catch (error) {
        console.log({ error, where: "create new vault" });
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

async function unlockVault(_event: IpcMainInvokeEvent, password: string) {
    try {
        const appData = await getAppData();

        const dbEncryptionKey = await deriveMasterKey(
            password,
            Buffer.from(appData.dbEncryptionKeySalt, "hex"),
        );

        await initializeDbConnection(dbEncryptionKey.toString("hex"));

        const dekEncryptionKey = await deriveMasterKey(
            password,
            Buffer.from(appData.dekEncryptionKeySalt, "hex"),
        );

        const decryptedDEK = decryptData(
            appData.IV,
            appData.TAG,
            appData.encryptedData,
            dekEncryptionKey,
            "hex",
            "hex",
        );
        vaultDEK = Buffer.from(decryptedDEK, "hex");
        return await getTableData("accounts", "id", 1, 10, "ASC");
    } catch (error) {
        // await dbConnection.run(`DETACH vault`)
        if (dbConnection) {
            dbConnection.closeSync();
        }
        dbConnection = null;
        if (error instanceof Error) {
            console.error({ error, message: error.message });
        }
    }
}

function getDataTableName(type: DataType): DataTables {
    if (type === "password") {
        return "accounts";
    } else {
        return "texts";
    }
}

async function decryptSensitiveData(
    _event: IpcMainInvokeEvent,
    id: string,
    type: DataType,
) {
    try {
        if (dbConnection && vaultDEK) {
            let tableName = getDataTableName(type);
            const resultAsPromise = await dbConnection.run(
                `SELECT id, iv, tag, encrypted_data FROM ${tableName} WHERE id = $a`,
                { a: id },
                { a: VARCHAR },
            );
            const resultAsJson = await resultAsPromise.getRowObjectsJson();
            const result = resultAsJson[0];
            return decryptData(
                String(result.iv),
                String(result.tag),
                String(result.encrypted_data),
                vaultDEK,
                "hex",
                "utf8",
            );
        } else {
            throw new Error(
                "DB connection or VaultDEK not found in decryptSensitiveData",
            );
        }
    } catch (error) {
        console.log({ error, where: "decryptSensitiveData" });
    }
}

async function addNewData(
    _event: IpcMainInvokeEvent,
    data: NewPassword | NewText,
    pageNum: number,
    pageSize: number,
) {
    try {
        if (vaultDEK && dbConnection) {
            let columnName: string = "id";
            let tableName = getDataTableName(data.type);
            if (data.type === "password") {
                const sensitivePasswordData = {
                    usernameOrEmail: data.usernameOrEmail,
                    password: data.password,
                    note: data.note,
                };
                // need to add validation before storing into database
                const encryptedPasswordMetadata = encryptData(
                    JSON.stringify(sensitivePasswordData),
                    vaultDEK,
                    "utf8",
                    "hex",
                );
                await dbConnection.run(
                    `INSERT INTO ${tableName} (iv, tag, title, category, encrypted_data, url) VALUES ($a, $b, $c, $d, $e, $f)`,
                    { a: encryptedPasswordMetadata.IV, b: encryptedPasswordMetadata.TAG, c: data.title, d: data.category, e: encryptedPasswordMetadata.encryptedData, f: data.url },
                    { a: VARCHAR, b: VARCHAR, c: VARCHAR, d: VARCHAR, e: VARCHAR, f: VARCHAR },
                );
            } else {
                const sensitiveTextData = {
                    content: data.content,
                };
                // need to add validation before storing into database
                const encryptedPasswordMetadata = encryptData(
                    JSON.stringify(sensitiveTextData),
                    vaultDEK,
                    "utf8",
                    "hex",
                );
                await dbConnection.run(
                    `INSERT INTO texts (iv, tag, title, category, encrypted_data) VALUES ($a, $b, $c, $d, $e)`,
                    {
                        a: encryptedPasswordMetadata.IV,
                        b: encryptedPasswordMetadata.TAG,
                        c: data.title,
                        d: data.category,
                        e: encryptedPasswordMetadata.encryptedData,
                    },
                    { a: VARCHAR, b: VARCHAR, c: VARCHAR, d: VARCHAR, e: VARCHAR },
                );
            }
            return await getTableData(
                tableName,
                columnName,
                pageNum,
                pageSize,
                "ASC",
            );
        } else {
            throw new Error("Something went wrong @addNewData");
            // need to send error that vaultDEK is missing
        }
    } catch (error) {
        console.log({ error, where: "add new password" });
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

async function deleteData(
    _event: IpcMainInvokeEvent,
    id: string,
    type: DataType,
    pageNum: number,
    pageSize: number,
) {
    try {
        if (dbConnection) {
            let columnName: string = "id";
            let tableName = getDataTableName(type);
            await dbConnection.run(
                `DELETE FROM ${tableName} WHERE id = $a`,
                { a: id },
                { a: VARCHAR },
            );
            return await getTableData(
                tableName,
                columnName,
                pageNum,
                pageSize,
                "ASC",
            );
        } else {
            throw new Error("DB connection or VaultDEK not found in deleteData");
        }
    } catch (error) {
        throw new Error("Something went wrong!");
    }
}

async function editData(
    _event: IpcMainInvokeEvent,
    updatedData: PasswordDetails | TextDetails,
    pageNum: number,
    pageSize: number,
) {
    try {
        if (dbConnection && vaultDEK) {
            let columnName: string = "id";
            let tableName = getDataTableName(updatedData.type);
            if (updatedData.type === "password") {
                const sensitivePasswordData = {
                    usernameOrEmail: updatedData.usernameOrEmail,
                    password: updatedData.password,
                    note: updatedData.note,
                };
                const encryptedPasswordMetadata = encryptData(
                    JSON.stringify(sensitivePasswordData),
                    vaultDEK,
                    "utf8",
                    "hex",
                );
                await dbConnection.run(
                    `UPDATE ${tableName} SET iv = $v, tag = $g, title = $t, category = $c, encrypted_data = $e, url = $u, icon_hint = $i, is_favorite = $f
                    WHERE id = $d`,
                    {
                        v: encryptedPasswordMetadata.IV, g: encryptedPasswordMetadata.TAG, t: updatedData.title, c: updatedData.category, e: encryptedPasswordMetadata.encryptedData, u: updatedData.url, i: updatedData.icon_hint, f: updatedData.is_favorite, d: updatedData.id
                    },
                    { v: VARCHAR, g: VARCHAR, t: VARCHAR, c: VARCHAR, e: VARCHAR, u: VARCHAR, i: VARCHAR, f: BOOLEAN, d: VARCHAR },
                );
            } else {
                const sensitiveTextData = {
                    content: updatedData.content,
                };
                const encryptedTextMetadata = encryptData(
                    JSON.stringify(sensitiveTextData),
                    vaultDEK,
                    "utf8",
                    "hex",
                );
                await dbConnection.run(
                    `
                    UPDATE ${tableName}
                    SET iv             = $v,
                        tag            = $g,
                        title          = $t,
                        category       = $c,
                        encrypted_data = $e,
                        is_favorite    = $f
                    WHERE id = $d`,
                    {
                        v: encryptedTextMetadata.IV,
                        g: encryptedTextMetadata.TAG,
                        t: updatedData.title,
                        c: updatedData.category,
                        e: encryptedTextMetadata.encryptedData,
                        f: updatedData.is_favorite,
                        d: updatedData.id,
                    },
                    {
                        v: VARCHAR,
                        g: VARCHAR,
                        t: VARCHAR,
                        c: VARCHAR,
                        e: VARCHAR,
                        f: BOOLEAN,
                        d: VARCHAR,
                    },
                );
            }
            return await getTableData(
                tableName,
                columnName,
                pageNum,
                pageSize,
                "ASC",
            );
        } else {
            throw new Error("Something went wrong @editData");
        }
    } catch (error) {
        throw new Error("Something went wrong!");
    }
}

async function fetchData(
    _event: IpcMainInvokeEvent,
    type: DataType,
    pageNum: number,
    pageSize: number,
) {
    try {
        let columnName: string = "id";
        let tableName = getDataTableName(type);
        return await getTableData(tableName, columnName, pageNum, pageSize, "ASC");
    } catch (error) {
        throw new Error("Something went wrong!");
    }
}

async function connectToCloud(
    _event: IpcMainInvokeEvent,
    cloudDrive: CloudDrive,
) {
    switch (cloudDrive) {
        case "googleDrive":
            return await syncWithGoogle();
        case "oneDrive":
            break;
        case "dropBox":
            break;
        default:
            break;
    }
}

async function connectToGoogleDrive(): Promise<OAuth2Client> {
    try {
        const oAuth2Client = new OAuth2Client({
            clientId: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirectUri: REDIRECT_URI,
        });
        // Load saved token if exists
        if (fs.existsSync(TOKEN_PATH)) {
            const rawTokenData = await fs.promises.readFile(TOKEN_PATH, { encoding: 'utf8' });
            const { IV: tokenIV, TAG: tokenTAG, encryptedData: encryptedToken } = JSON.parse(rawTokenData);
            if (!vaultDEK) throw new Error("Something went wrong!");
            const decryptedToken = JSON.parse(decryptData(tokenIV, tokenTAG, encryptedToken, vaultDEK, "hex", "utf8"));
            oAuth2Client.setCredentials(decryptedToken);
            try {
                // This will automatically use the refresh_token if access_token is expired
                await oAuth2Client.getAccessToken();
                console.log('Google Drive token loaded and refreshed successfully');
                return oAuth2Client;
            } catch (err) {
                console.warn('Saved token invalid or expired — will re-authenticate');
                fs.unlinkSync(TOKEN_PATH); // Remove bad token
            }
        }
        return new Promise((resolve, reject) => {
            const authWindow = new BrowserWindow({
                parent: mainWindow!,
                width: 800,
                height: 600,
                show: true,
                webPreferences: {
                    nodeIntegration: false,
                    contextIsolation: true,
                },
            });
            const authUrl = oAuth2Client.generateAuthUrl({
                access_type: "offline",
                scope: SCOPES,
                prompt: "consent"
            });
            authWindow.loadURL(authUrl);
            authWindow.webContents.on("will-redirect", async (event, url) => {
                if (url.startsWith(REDIRECT_URI)) {
                    event.preventDefault();
                    try {
                        const code = new URL(url).searchParams.get("code");
                        if (!code) throw new Error('No authorization code received');
                        const { tokens } = await oAuth2Client.getToken({
                            code,
                            redirect_uri: REDIRECT_URI
                        });
                        if (!tokens) throw new Error('No tokens received');
                        oAuth2Client.setCredentials(tokens);
                        if (!vaultDEK) throw new Error("Something went wrong!");
                        const encryptedToken = encryptData(JSON.stringify(tokens), vaultDEK, "utf8", "hex");
                        await fs.promises.writeFile(TOKEN_PATH, JSON.stringify(encryptedToken));
                        console.log("Google Drive authenticated successfully");
                        authWindow.close();
                        resolve(oAuth2Client);
                    } catch (error) {
                        authWindow.close();
                        console.error('Auth error:', error);
                        console.error('Response data:', (error as any).response?.data);
                        console.error('Request URL:', (error as any).config?.url);
                        console.error('Request body:', (error as any).config?.data);
                        reject(error);
                    }
                }
            });
            authWindow.on("closed", () => {
                reject(new Error("Authentication window closed by user"));
            });
        });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to connect to Google Drive");
    }
}

async function syncWithGoogle(): Promise<{ success: boolean; message: string }> {
    try {
        const auth = await connectToGoogleDrive();
        const drive = googleDrive({ version: "v3", auth });
        const folderId = await getOrCreateBackupFolder(drive);
        // List existing backups (newest first)
        const backups = await listBackups(drive, folderId);
        if (backups.length === 0) {
            await backupToDrive(drive);
            return {
                success: true,
                message: 'No cloud backup found. Local database uploaded as the first backup.',
            };
        }
        // In case there is at least one backup
        const latest = backups[0];
        console.log(`Found cloud backup: ${latest.name}`);
        await downloadBackupFile(drive, latest.id!, TEMP_VAULT_PATH);
        // Ask user what to do
        const choice = await dialog.showMessageBox(mainWindow!, {
            type: 'question',
            title: 'Cloud Backup Found',
            message: `A backup (${latest.name}) was found on Google Drive.`,
            detail: 'What would you like to do?',
            buttons: ['Merge cloud into local', 'Replace local with cloud', 'Cancel'],
            defaultId: 0, // default to Merge
            cancelId: 2,
        });
        console.log(choice.response);

        if (choice.response === 0) {
            // Merge the cloud backup with local file
            const mergeResponse = await handleMergeOrReplaceWithRetry(
                VAULT_PATH,
                TEMP_VAULT_PATH,
                BrowserWindow.getFocusedWindow()
            );
            await fs.promises.unlink(TEMP_VAULT_PATH);
            dialog.showMessageBoxSync(mainWindow!, { type: mergeResponse.success ? 'info' : 'error', message: mergeResponse.message });
            return mergeResponse;
        }
        if (choice.response === 1) {
            await replaceLocalFileWithCloud(VAULT_PATH, TEMP_VAULT_PATH, BrowserWindow.getFocusedWindow())
        }
        if (choice.response === 2) {
            await fs.promises.unlink(TEMP_VAULT_PATH);
            return {
                success: false,
                message: 'Sync cancelled by user.',
            };
        }
        return {
            success: false,
            message: 'Sync cancelled by user.',
        };
    } catch (error: any) {
        console.error('Sync failed:', error);
        if(error.message.includes("Invalid byte encountered in STRING")){
            
        }
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return { success: false, message: `Sync failed: ${errorMessage}` };
    }
}

async function getOrCreateBackupFolder(drive: drive_v3.Drive): Promise<string> {
    const res = await drive.files.list({
        q: `mimeType='application/vnd.google-apps.folder' and name='${BACKUP_FOLDER_NAME}' and trashed=false`,
        fields: 'files(id)',
        spaces: 'drive',
    });

    if (res.data.files && res.data.files.length > 0) {
        return res.data.files[0].id!;
    }

    const folder = await drive.files.create({
        requestBody: {
            name: BACKUP_FOLDER_NAME,
            mimeType: 'application/vnd.google-apps.folder',
        },
        fields: 'id',
    });

    return folder.data.id!;
}

async function listBackups(drive: drive_v3.Drive, folderId: string): Promise<any[]> {
    try {
        const response = await drive.files.list({
            q: `'${folderId}' in parents 
         and name contains 'zvault-backup-' 
         and mimeType != 'application/vnd.google-apps.folder' 
         and trashed = false`,
            fields: 'files(id, name, createdTime, mimeType, size)',
            orderBy: 'createdTime desc',     // newest first
            pageSize: 100,                    // adjust if you expect more than 100 backups
            spaces: 'drive',
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
        });

        const files = response.data.files || [];

        console.log(`Found ${files.length} backup files in folder ${folderId}`);

        return files;
    } catch (error: any) {
        console.error('@listBackups Error listing backups: ', error.message || error);
        throw new Error(`Failed to list backups: ${error.message || 'Unknown error'}`);
    }
}

async function downloadBackupFile(drive: drive_v3.Drive, fileId: string, destinationPath: string): Promise<void> {
    try {
        const dest = fs.createWriteStream(destinationPath);
        const response = await drive.files.get(
            {
                fileId: fileId,
                alt: 'media',           // this tells API to return file content
            },
            {
                responseType: 'stream',
            }
        );
        return new Promise((resolve, reject) => {
            response.data
                .on('end', () => {
                    console.log(`File downloaded successfully to: ${destinationPath}`);
                    resolve();
                })
                .on('error', (err: any) => {
                    console.error('Download stream error:', err);
                    reject(err);
                })
                .pipe(dest);
        });
    } catch (error: any) {
        console.error('Error downloading file:', error.message || error);
        if (error.response?.status === 404) {
            throw new Error('File not found on Google Drive');
        }
        throw new Error(`Download failed: ${error.message || 'Unknown error'}`);
    }
}

async function backupToDrive(drive: drive_v3.Drive): Promise<string> {
    try {
        const folderId = await getOrCreateBackupFolder(drive);

        const fileName = `zvault-backup-${new Date().toISOString().replace(/[:.]/g, '-')}-${path.basename(VAULT_PATH)}`;
        const fileStream = fs.createReadStream(VAULT_PATH);

        const media = {
            mimeType: 'application/octet-stream',
            body: fileStream,
        };

        // Upload or update (simple: create new each time with unique name)
        await drive.files.create({
            requestBody: {
                name: fileName,
                parents: [folderId],
            },
            media,
            fields: 'id',
        });

        console.log(`Backup successful: ${fileName}`);
        await cleanupOldBackups(drive, folderId, 3);
        return `Backup successful: ${fileName}`;
    } catch (err: any) {
        console.error('Google Drive backup failed:', err.message || err);
        // If token is invalid/expired, delete it to force re-auth
        if (err.message?.includes('invalid_grant') || err.response?.data?.error === 'invalid_grant') {
            if (fs.existsSync(TOKEN_PATH)) {
                fs.unlinkSync(TOKEN_PATH);
                console.log('Invalid token removed re-authenticate next time');
            }
        }
        throw new Error(`Backup failed: ${err.message || 'Unknown error'}`);
    }
}

async function cleanupOldBackups(drive: drive_v3.Drive, folderId: string, keepLatest: number = 3) {
    try {
        // List all backup files in the folder (non-trashed)
        const res = await drive.files.list({
            q: `'${folderId}' in parents and name contains 'zvault-backup-' and mimeType != 'application/vnd.google-apps.folder' and trashed = false`,
            fields: 'files(id, name, createdTime)',
            orderBy: 'createdTime', // Oldest first
            spaces: 'drive',
        });

        const files = res.data.files || [];

        console.log(`Found ${files.length} existing backups in Drive`);

        if (files.length <= keepLatest) {
            console.log(`No cleanup needed — keeping all ${files.length} backups`);
            return;
        }

        // Calculate how many to delete (oldest ones)
        const toDelete = files.slice(0, files.length - keepLatest);

        console.log(`Deleting ${toDelete.length} oldest backups...`);

        for (const file of toDelete) {
            await drive.files.delete({
                fileId: file.id!,
            });
            console.log(`Deleted: ${file.name} (created ${file.createdTime})`);
        }

        console.log('Cleanup complete — kept the latest ${keepLatest} backups');
    } catch (err: any) {
        console.error('Cleanup failed:', err.message || err);
    }
}

async function mergeBackupIntoCurrent(localPath: string, cloudPath: string, masterPassword: string) {
    let cloudConn: DuckDBConnection | null = null;
    let cloudInstance: DuckDBInstance | null = null;
    try {
        const appData = await getAppData();
        const dbEncryptionKey = await deriveMasterKey(
            masterPassword,
            Buffer.from(appData.dbEncryptionKeySalt, "hex"),
        );

        // Open local database
        if (!dbConnection) {
            const localInstance = await DuckDBInstance.create();
            dbConnection = await localInstance.connect();
            await dbConnection.run(`ATTACH '${localPath}' AS local_db (ENCRYPTION_KEY '${dbEncryptionKey.toString("hex")}', ENCRYPTION_CIPHER 'GCM')`);
        }

        // Open cloud backup
        cloudInstance = await DuckDBInstance.create();
        cloudConn = await cloudInstance.connect();
        await cloudConn.run(
            `ATTACH '${cloudPath}' AS cloud_db (ENCRYPTION_KEY '${dbEncryptionKey.toString("hex")}', ENCRYPTION_CIPHER 'GCM')`
        );

        // ───────────────────────────────────────────────
        // 3. Get list of tables from the cloud database
        // ───────────────────────────────────────────────
        const tablesReader = await cloudConn.runAndReadAll(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'main' 
            AND table_type = 'BASE TABLE'
        `);
        const allTableNames = tablesReader.getRowObjectsJson().map((row: any) => row.table_name);
        if (allTableNames.length === 0) {
            console.log('No tables found in cloud backup — nothing to merge.');
            return;
        };

        // ───────────────────────────────────────────────
        // 4. Merge each table (INSERT OR REPLACE strategy)
        // ───────────────────────────────────────────────
        for (const table of allTableNames) {
            console.log(`Merging table: ${table}`);
            await dbConnection.run(`
                INSERT OR REPLACE INTO main.${table}
                SELECT * FROM cloud_db.main.${table}
            `);
        };
        console.log('Merge completed successfully.');
    } catch (error: any) {
        console.error('Merge failed:', error.message || error);
        if (dbConnection) {
            dbConnection.closeSync();
            dbConnection = null;
        }
        throw new Error(`Failed to merge cloud backup: ${error.message || 'Unknown error'}`);
    } finally {
        if (cloudConn) cloudConn.closeSync();
        if (cloudInstance) cloudInstance.closeSync();
    }
}

async function handleMergeOrReplaceWithRetry(
    localPath: string,
    cloudPath: string,
    parentWindow: BrowserWindow | null
): Promise<{ success: boolean, message: string }> {
    const MAX_ATTEMPTS = 3;
    let attempts = 0;
    async function onPromptPasswordError(attempts: number) {
        if (attempts >= MAX_ATTEMPTS) {
            return { success: false, message: 'Too many incorrect attempts. Merge cancelled.' };
        };
        const masterPassword = await showPasswordPrompt(
            parentWindow,
            attempts > 0 ? `Incorrect master password. Attempts left: ${MAX_ATTEMPTS - attempts}` : '',
        );
        if (!masterPassword) {
            return { success: false, message: 'Merge cancelled by user' };
        }
        try {
            await mergeBackupIntoCurrent(localPath, cloudPath, masterPassword);
            return { success: true, message: 'Successfully merged cloud backup into local database' };
        } catch (error: any) {
            console.log({ error, where: "@onPromptPasswordError" });
            if (error.message.includes('Wrong encryption key') || error.message.includes('decryption')) {
                attempts++;
                return await onPromptPasswordError(attempts);
            } else if (error.message.includes('not a valid DuckDB database')) {
                return { success: false, message: `Merge failed: Not a valid backup file.` };
            }
            else {
                // Other errors (file not found, schema issue, etc.)
                return { success: false, message: `Merge failed: Something went wrong. Try again!` };
            }
        }
    }
    return await onPromptPasswordError(attempts);
    // while (attempts < MAX_ATTEMPTS) {
    //     console.log({ attempts, MAX_ATTEMPTS })
    //     const masterPassword = await showPasswordPrompt(
    //         parentWindow,
    //         attempts > 0 ? `Incorrect master password. Attempts left: ${MAX_ATTEMPTS - attempts}` : '',
    //     )
    //     if (!masterPassword) {
    //         return { success: false, message: 'Merge cancelled by user' };
    //     }
    //     try {
    //         await mergeBackupIntoCurrent(localPath, cloudPath, masterPassword);
    //         return { success: true, message: 'Successfully merged cloud backup into local database' };
    //     } catch (error: any) {
    //         if (error.message.includes('Invalid encryption key') || error.message.includes('decryption')) {
    //             attempts++;
    //             if (attempts >= MAX_ATTEMPTS) {
    //                 return { success: false, message: 'Too many incorrect attempts. Merge cancelled.' };
    //             }
    //             continue;
    //         }
    //         // Other errors (file not found, schema issue, etc.)
    //         return { success: false, message: `Merge failed: ${error.message}` };
    //     }
    // };
    // return { success: false, message: 'Max attempts reached' };
}

async function replaceLocalFileWithCloud(
    localPath: string,
    cloudPath: string,
    parentWindow: BrowserWindow | null
): Promise<void> {
    const MAX_ATTEMPTS = 3;
    let attempts = 0;
    let backupPath: string | null = null;

    while (attempts < MAX_ATTEMPTS) {
        const masterPassword = await showPasswordPrompt(
            parentWindow,
            attempts > 0 ? `Incorrect password (${attempts}/${MAX_ATTEMPTS})` : 'Enter master password to decrypt cloud database'
        );

        if (!masterPassword) {
            throw new Error('Operation cancelled by user');
        }

        const appData = await getAppData();
        const dbEncryptionKey = await deriveMasterKey(
            masterPassword,
            Buffer.from(appData.dbEncryptionKeySalt, "hex"),
        );

        try {
            // Close old connection
            if (dbConnection) {
                dbConnection.closeSync();
                dbConnection = null;
            }
            
            // Backup once (only on first attempt)
            if (!backupPath) {
                backupPath = `${localPath}.backup-${Date.now()}`;
                fs.copyFileSync(localPath, backupPath);
                console.log(`Backup created: ${backupPath}`);
            }

            // Replace file
            fs.copyFileSync(cloudPath, localPath);
            console.log('Local file replaced with cloud version');

            // Re-open and attach with encryption
            const localInstance = await DuckDBInstance.create();
            dbConnection = await localInstance.connect();

            await dbConnection.run(
                `ATTACH '${localPath}' AS vault (ENCRYPTION_KEY '${dbEncryptionKey}', ENCRYPTION_CIPHER 'GCM')`
            );

            // Quick validation
            await dbConnection.run("SELECT 1");

            dialog.showMessageBox({
                type: 'info',
                title: 'Success',
                message: 'Local database replaced with cloud version successfully.'
            });

            return; // Success → exit

        } catch (error: any) {
            const isWrongPassword = error.message?.includes('Invalid encryption key') ||
                error.message?.includes('decryption') ||
                error.message?.includes('cipher');

            if (isWrongPassword) {
                attempts++;
                if (attempts >= MAX_ATTEMPTS) {
                    throw new Error(`Too many incorrect attempts (${MAX_ATTEMPTS}). Operation cancelled.`);
                }
                continue; // Retry
            }

            // Non-password error → fail immediately
            throw error;
        }
    }

    // Restore backup if all attempts failed
    if (backupPath && fs.existsSync(backupPath)) {
        try {
            fs.copyFileSync(backupPath, localPath);
            console.log('Local file restored from backup after failed attempts');
        } catch (restoreErr) {
            console.error('Restore failed:', restoreErr);
        }
    }

    throw new Error('Max password attempts reached');
}

function showPasswordPrompt(parentWindow: BrowserWindow | null, errorMessage: string = ""): Promise<string | null> {
    return new Promise((resolve) => {
        if (passwordWindow) {
            passwordWindow?.focus();
            if (errorMessage) {
                passwordWindow?.webContents.send("cloudSyncPasswordError", errorMessage);
            }
            return;
        }
        passwordWindow = new BrowserWindow({
            parent: parentWindow!,
            modal: true,
            width: 550,
            height: errorMessage ? 380 : 540,
            resizable: false,
            minimizable: false,
            maximizable: false,
            title: 'Master Password Required',
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                nodeIntegration: false,
                contextIsolation: true,
                sandbox: true,
            },
            backgroundColor: '#1e1e1e',
            show: false,
        });
        if (app.isPackaged) {
            // In packaged app, files are next to the executable
            passwordWindow
                .loadFile(path.join(process.resourcesPath, "renderer", "password-prompt.html"))
                .catch((err) => {
                    console.log(err);
                });
        } else {
            // In development, load from src folder
            const rendererPath = path.join(
                __dirname,
                "..",
                "..",
                "src",
                "renderer",
                "password-prompt.html",
            );
            passwordWindow.loadFile(rendererPath).catch((err) => {
                console.log(err);
            });
        }
        passwordWindow.once('ready-to-show', () => {
            passwordWindow?.show();
            passwordWindow?.focus();
            if (errorMessage) {
                passwordWindow?.webContents.send('cloudSyncPasswordError', errorMessage);
            }
        });
        const cleanup = () => {
            if (passwordWindow) {
                passwordWindow.removeAllListeners();
                passwordWindow.destroy();
                passwordWindow = null;
            }
        };
        ipcMain.once('cloudSyncPasswordSubmit', (_event: IpcMainEvent, password: string) => {
            resolve(password.trim() || null);
            cleanup();
        });
        ipcMain.once('cloudSyncPasswordCancel', () => {
            resolve(null);
            cleanup();
        });
        passwordWindow.on('closed', () => {
            resolve(null);
            cleanup();
        });
    });
}