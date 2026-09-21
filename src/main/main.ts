import {
    app,
    BrowserWindow,
    ipcMain,
    IpcMainInvokeEvent,
    shell,
    dialog,
    safeStorage
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
    VARCHAR,
} from "@duckdb/node-api";
import argon2 from "@node-rs/argon2";
import { drive_v3, google } from "googleapis";
import AdmZip from "adm-zip";
import { Categories, CloudDrive, DataTables, DataType, NewPassword, NewText, PasswordDetails, SortingOrder, TextDetails } from "../shared/api.types";

const rawCredentials: any = fs.readFileSync(path.join(__dirname, "../../credential.env"), "utf8");
const credential: { APP_TOKEN: string; } = JSON.parse(rawCredentials);
const SERVER_URL = "https://zvaultoauthserver-production.up.railway.app";
const USER_DATA_PATH = app.getPath("userData");
const TOKEN_PATH = path.join(USER_DATA_PATH, 'drive-token.enc');
const VAULT_PATH = path.join(USER_DATA_PATH, 'vault.db');
const TEMP_VAULT_PATH = path.join(app.getPath("temp"), 'zvault-cloud-latest.db');
const VAULT_DATA_PATH = path.join(USER_DATA_PATH, "vault.data");
const BACKUP_FOLDER_NAME = 'ZVault Backups';
const prefixes = [
    "Aero", "Alpha", "Amber", "Aqua", "Arch", "Astral", "Auto", "Azure", "Bio", "Black",
    "Blaze", "Blue", "Bold", "Brave", "Bright", "Bronze", "Cinder", "Cloud", "Cold", "Cosmo",
    "Crimson", "Crypt", "Crystal", "Cyber", "Dark", "Dawn", "Deep", "Delta", "Dream", "Dusk",
    "Echo", "Elder", "Ember", "Emerald", "Epic", "Eternal", "Ever", "Fable", "Falcon", "Feral",
    "Fire", "Flame", "Flash", "Flux", "Frost", "Gale", "Ghost", "Glass", "Glimmer", "Glow",
    "Gold", "Grand", "Gray", "Green", "Grim", "Halo", "Hollow", "Hyper", "Ice", "Iron",
    "Jade", "Jet", "Kindle", "Light", "Litho", "Logic", "Lost", "Lunar", "Macro", "Magma",
    "Mega", "Micro", "Mist", "Moon", "Mystic", "Neon", "Night", "Noble", "Nova", "Obsidian",
    "Ocean", "Omni", "Onyx", "Pale", "Phantom", "Prime", "Pure", "Quartz", "Quick", "Radiant",
    "Rare", "Red", "Rift", "Rogue", "Royal", "Ruby", "Sable", "Sage", "Savage", "Scarlet"
];
const middles = [
    "active", "bound", "bridge", "burst", "call", "cast", "cell", "chain", "chord", "circuit",
    "clash", "coast", "coil", "craft", "crest", "cross", "crush", "dance", "dash", "door",
    "drift", "drive", "drop", "edge", "eye", "fall", "field", "fire", "flare", "flight",
    "flow", "fold", "force", "forge", "form", "frame", "fuse", "gate", "gear", "glide",
    "grain", "graph", "grid", "grip", "ground", "guard", "guide", "heart", "hold", "key",
    "kind", "knot", "land", "lead", "leaf", "lens", "line", "link", "lock", "loop",
    "mark", "mask", "match", "meld", "melt", "mesh", "mind", "mode", "move", "node",
    "path", "phase", "pick", "pilot", "plot", "point", "port", "power", "press", "prime",
    "proof", "pulse", "quake", "reach", "read", "reef", "rise", "road", "roll", "root",
    "run", "scale", "scope", "script", "scroll", "seal", "seed", "set", "shape", "shift"
];
const suffixes = [
    "base", "beam", "beat", "bell", "belt", "bit", "blade", "blast", "bloom", "bolt",
    "born", "bound", "break", "breath", "bright", "brook", "burn", "byte", "case", "cave",
    "chip", "claw", "clay", "clear", "cliff", "cloud", "code", "core", "crag", "crest",
    "crown", "crypt", "cube", "dash", "dawn", "day", "deck", "dell", "disk", "dome",
    "down", "dream", "drift", "dust", "earth", "edge", "end", "fall", "fast", "feat",
    "field", "file", "fin", "fire", "flame", "flare", "flash", "flight", "flow", "flux",
    "foam", "font", "force", "ford", "forest", "forge", "form", "fort", "frame", "frost",
    "fuse", "gate", "gear", "gem", "ghost", "glass", "glide", "glow", "gold", "grain",
    "graph", "grid", "grin", "grip", "ground", "grove", "guard", "guide", "gulf", "hand",
    "hard", "haunt", "head", "heart", "helm", "high", "hill", "hold", "hollow", "home"
];

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
        const rendererURL = "http://localhost:4200/";
        mainWindow.loadURL(rendererURL).catch((err) => {
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
    ipcMain.handle("searchData", searchData);
    ipcMain.handle("connectToCloud", connectToCloud);
    ipcMain.handle("mergeGoogleCloudBackupFile", mergeGoogleCloudBackupFile);
    // ipcMain.handle("importCloudBackup", importGDriveData);
    // ipcMain.handle("checkExistingBackup", connectToGoogleDrive);
    // ipcMain.handle("checkTokenValidity", checkTokenValidity);
    ipcMain.handle("openLocalBackup", openLocalBackup);
    ipcMain.handle("exportVaultLocally", exportVaultLocally);
    // ipcMain.handle("backupToDrive", backupToDrive);
    // ipcMain.handle("openCloudBackup", openCloudBackup);
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
    return fs.existsSync(VAULT_PATH) && fs.existsSync(VAULT_DATA_PATH);
}


async function initializeDbConnection(dbEncryptionKey: string) {
    try {
        const dbInstance = await DuckDBInstance.create();
        dbConnection = await dbInstance.connect();
        // await dbConnection.run(`INSTALL 'C:/Users/SG0927/Downloads/httpfs.duckdb_extension'`);
        // await dbConnection.run(`LOAD httpfs`);
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
    } catch (error: any) {
        if (dbConnection) {
            dbConnection.closeSync();
        }
        dbConnection = null;
        console.log({ error, where: "initializeDbConnection" });
        throw new Error(error.message);
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

async function getTotalDataCount(tableName: DataTables) {
    if (dbConnection) {
        const fetchRowsCountQuery =
            await dbConnection.run(`SELECT COUNT(*) as total_rows FROM vault.${tableName}`);
        const tableRowsCountInJson =
            await fetchRowsCountQuery.getRowObjectsJson();
        const tableRowsCount = Number(tableRowsCountInJson[0]["total_rows"]);
        return tableRowsCount;
    } else {
        throw new Error("Connection not found @getTotalDataCount");
    }
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
            const totalTableRowsCount = await getTotalDataCount(tableName);
            if (totalTableRowsCount !== 0 && totalTableRowsCount > pageSize && offset === totalTableRowsCount) offset = (pageNum - 2) * pageSize;
            let fetchTableRowsQuery: DuckDBMaterializedResult | null = null;
            if (tableName === "accounts") {
                fetchTableRowsQuery = await dbConnection.run(
                    `SELECT id, title, category, icon_hint, is_favorite, url, last_modified
                     FROM vault.${tableName}
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
    return JSON.parse(storedAppData);
}

async function createNewVault(_event: IpcMainInvokeEvent, password: string) {
    try {
        vaultDEK = crypto.randomBytes(32);
        const dekEncryptionKeySalt = crypto.randomBytes(32);
        await initializeDbConnection(vaultDEK.toString("hex"));
        const dekEncryptionKey = await deriveMasterKey(
            password,
            dekEncryptionKeySalt
        );
        // encrypt DEK
        const encryptedDEKMetaData = encryptData(
            vaultDEK.toString("hex"),
            dekEncryptionKey,
            "hex",
            "hex",
        );
        const appDataToStore = {
            dekEncryptionKeySalt: dekEncryptionKeySalt.toString("hex"),
            ...encryptedDEKMetaData
        };
        await fs.promises.writeFile(VAULT_DATA_PATH, JSON.stringify(appDataToStore));
        return { success: true, message: 'Vault created successfully' };
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
        if (!dbConnection) {
            await initializeDbConnection(vaultDEK.toString("hex"));
        }
        return { success: true, message: 'Authentication successful' };
    } catch (error) {
        if (dbConnection) {
            dbConnection.closeSync();
            dbConnection = null;
        }
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
            const decryptedData = decryptData(
                String(result.iv),
                String(result.tag),
                String(result.encrypted_data),
                vaultDEK,
                "hex",
                "utf8",
            );
            return decryptedData;
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
) {
    try {
        if (vaultDEK && dbConnection) {
            let tableName = getDataTableName(data.type);
            let dataSaveResponse!: DuckDBMaterializedResult;
            if (data.type === "password") {
                const sensitivePasswordData = {
                    usernameOrEmail: data.usernameOrEmail,
                    password: data.password,
                    note: data.note ?? "",
                };
                // need to add validation before storing into database
                const encryptedPasswordMetadata = encryptData(
                    JSON.stringify(sensitivePasswordData),
                    vaultDEK,
                    "utf8",
                    "hex",
                );
                dataSaveResponse = await dbConnection.run(
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
                dataSaveResponse = await dbConnection.run(
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
            if (dataSaveResponse) {
                return { success: true, message: "Data added successfully" };
            } else {
                return { success: false, message: "Something went wrong" };
            }
        } else {
            await handelError("VaultDek or DbConnection is missing", "Data", "@addNewData", "Something went wrong. Restart the app!");
            // need to send error that vaultDEK is missing
        }
    } catch (error) {
        await handelError(error, "Data", "@addNewData", "Something went wrong. Restart the app!");
    }
}

async function deleteData(
    _event: IpcMainInvokeEvent,
    id: string,
    type: DataType
): Promise<{ success: boolean, message: string; }> {
    try {
        if (dbConnection) {
            let tableName = getDataTableName(type);
            let deleteResult = await dbConnection.run(
                `DELETE FROM ${tableName} WHERE id = $a`,
                { a: id },
                { a: VARCHAR },
            );
            if (deleteResult) {
                return { success: true, message: "Data deleted successfully" };
            } else {
                return { success: false, message: "Something went wrong" };
            }
        } else {
            throw new Error("DB connection or VaultDEK not found in deleteData");
        }
    } catch (error) {
        throw new Error("Something went wrong!");
    }
}

async function editData(
    _event: IpcMainInvokeEvent,
    updatedData: PasswordDetails | TextDetails
) {
    try {
        if (dbConnection && vaultDEK) {
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
                    `UPDATE ${tableName} SET iv = $v, tag = $g, title = $t, category = $c, encrypted_data = $e, url = $u, icon_hint = $i, is_favorite = $f, last_modified = NOW()
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
                        is_favorite    = $f,
                        last_modified  = NOW()
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
            return { success: true, message: 'Data updated successfully' };
        } else {
            return { success: false, message: 'Something went wrong @editData' };
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
        let columnName: string = "last_modified";
        let tableName = getDataTableName(type);
        return await getTableData(tableName, columnName, pageNum, pageSize, "ASC");
    } catch (error) {
        throw new Error("Something went wrong!");
    }
}

function getSortingColumnAndOrder(sortingValue: SortingOrder) {
    const values = sortingValue.split('_');
    let columnName = values[0];
    let order = values[1];
    switch (columnName) {
        case 'name':
            columnName = 'title';
            break;
        case 'date':
            columnName = 'last_modified';
            break;
        default:
            columnName = 'title';
            break;
    }
    console.log({ columnName, order });

    return {
        columnName,
        order: order.toUpperCase()
    };
}

async function searchData(
    _event: IpcMainInvokeEvent,
    category: Categories,
    searchInput: string,
    type: DataType,
    pageNum: number,
    pageSize: number,
    sortingOrder: SortingOrder
) {
    try {
        if (dbConnection) {
            const tableName = getDataTableName(type);
            const { columnName, order } = getSortingColumnAndOrder(sortingOrder);
            let offset = (pageNum - 1) * pageSize;
            let passwordSearchQueryResult: DuckDBMaterializedResult;
            let searchPasswordCountQueryResult: DuckDBMaterializedResult;
            let dataToBeReturned = ``;
            let columnToBeSearched = ``;
            if (type === "password") {
                dataToBeReturned = `id, title, category, icon_hint, is_favorite, url, last_modified`;
                columnToBeSearched = `(title LIKE $searchTitle OR url LIKE $searchUrl)`;
            }
            if (type === 'text') {
                dataToBeReturned = `id, title, category, is_favorite, last_modified`;
                columnToBeSearched = `title LIKE $searchTitle`;
            }
            let passwordSearchQuery = `SELECT ${dataToBeReturned} FROM ${tableName} WHERE ` + columnToBeSearched + `${category ? ' AND category = $searchCategory' : ' '} ` + `ORDER BY ${columnName} ${order} LIMIT $limit OFFSET $offset`;
            let searchPasswordCountQuery = `SELECT COUNT(*) AS total_count FROM ${tableName} WHERE ` + columnToBeSearched + `${category ? ' AND category = $searchCategory' : ''}`;
            if (type === 'password') {
                if (category) {
                    passwordSearchQueryResult = await dbConnection.run(passwordSearchQuery, { searchCategory: category, searchTitle: `%${searchInput}%`, searchUrl: `%${searchInput}%`, limit: pageSize, offset }, { searchCategory: VARCHAR, searchTitle: VARCHAR, searchUrl: VARCHAR, limit: INTEGER, offset: INTEGER });
                    searchPasswordCountQueryResult = await dbConnection.run(searchPasswordCountQuery, { searchCategory: category, searchTitle: `%${searchInput}%`, searchUrl: `%${searchInput}%` }, { searchCategory: VARCHAR, searchTitle: VARCHAR, searchUrl: VARCHAR });
                } else {
                    passwordSearchQueryResult = await dbConnection.run(passwordSearchQuery, { searchTitle: `%${searchInput}%`, searchUrl: `%${searchInput}%`, limit: pageSize, offset }, { searchTitle: VARCHAR, searchUrl: VARCHAR, limit: INTEGER, offset: INTEGER });
                    searchPasswordCountQueryResult = await dbConnection.run(searchPasswordCountQuery, { searchTitle: `%${searchInput}%`, searchUrl: `%${searchInput}%` }, { searchTitle: VARCHAR, searchUrl: VARCHAR });
                }
                const queryResultInJson = await passwordSearchQueryResult.getRowObjectsJson();
                const totalMatchingPasswords = await searchPasswordCountQueryResult.getRowObjectsJson();
                return {
                    rows: queryResultInJson,
                    totalEntries: totalMatchingPasswords[0]['total_count'],
                    type: tableName,
                };
            }
            if (type === 'text') {
                if (category) {
                    passwordSearchQueryResult = await dbConnection.run(passwordSearchQuery, { searchCategory: category, searchTitle: `%${searchInput}%`, limit: pageSize, offset }, { searchCategory: VARCHAR, searchTitle: VARCHAR, limit: INTEGER, offset: INTEGER });
                    searchPasswordCountQueryResult = await dbConnection.run(searchPasswordCountQuery, { searchCategory: category, searchTitle: `%${searchInput}%` }, { searchCategory: VARCHAR, searchTitle: VARCHAR });
                } else {
                    passwordSearchQueryResult = await dbConnection.run(passwordSearchQuery, { searchTitle: `%${searchInput}%`, limit: pageSize, offset }, { searchTitle: VARCHAR, limit: INTEGER, offset: INTEGER });
                    searchPasswordCountQueryResult = await dbConnection.run(searchPasswordCountQuery, { searchTitle: `%${searchInput}%` }, { searchTitle: VARCHAR });
                }
                const queryResultInJson = await passwordSearchQueryResult.getRowObjectsJson();
                const totalMatchingPasswords = await searchPasswordCountQueryResult.getRowObjectsJson();
                return {
                    rows: queryResultInJson,
                    totalEntries: totalMatchingPasswords[0]['total_count'],
                    type: tableName,
                };
            }
        } else {
            console.log("Db connection not found");
        }
    } catch (error) {
        console.log(error, 'where @searchData');
    }

}

async function connectToCloud(
    _event: IpcMainInvokeEvent,
    cloudDrive: CloudDrive,
) {
    switch (cloudDrive) {
        case "googleDrive":
            return await connectToGoogleDrive();
        case "oneDrive":
            break;
        case "dropBox":
            break;
        default:
            break;
    }
}

async function connectToGoogleDrive() {
    try {
        const localStoredToken = await getLocalTokenOrRefreshedToken();
        if (localStoredToken.exist && localStoredToken.accessToken) {
            return checkExistingBackup(localStoredToken.accessToken);
        } else {
            const newTokenResponse = await getNewToken();
            if (newTokenResponse && newTokenResponse.accessToken) {
                return checkExistingBackup(newTokenResponse.accessToken);
            } else {
                const error = new Error('Connect to Google failed!');
                await handelError(error, 'Google Connection', connectToGoogleDrive.name, "Failed to connect with Google account")
            }
        }
    } catch (error: any) {
        console.log(error);

        await handelError(error, 'Google Connection', connectToGoogleDrive.name, "Failed to connect with Google account");
    }
}

async function getNewToken(): Promise<{ success: boolean, accessToken: string | null; }> {
    const verifier = crypto.randomBytes(32).toString('base64url');
    const challenge = crypto.createHash('sha256').update(verifier).digest('base64url');

    const res = await fetch(`${SERVER_URL}/auth/google/url?code_challenge=${challenge}`, {
        headers: { 'x-zvault-app-token': credential.APP_TOKEN }
    });

    // Ensure the initial fetch didn't fail
    if (!res.ok) throw new Error(`Init failed: ${res.status} ${await res.text()}`);

    const { url, sessionId } = await res.json();

    await shell.openExternal(url);
    const pollStartTime = Date.now();

    return new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
            if (Date.now() - pollStartTime > 300000) {
                clearInterval(interval);
                return reject(new Error('Login timed out.'));
            }
            try {
                const exchangeRes = await fetch(`${SERVER_URL}/auth/google/exchange`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-zvault-app-token': credential.APP_TOKEN },
                    body: JSON.stringify({ sessionId, codeVerifier: verifier })
                });

                // Catch non-200 HTTP responses before attempting to parse JSON
                if (!exchangeRes.ok) {
                    const errorText = await exchangeRes.text();
                    await logToFile(`Poll HTTP Error ${exchangeRes.status}:`, errorText, 'Token polling');
                    return; // Exit this tick and try again in 2 seconds
                }

                const data = await exchangeRes.json();

                if (data.tokens) {
                    clearInterval(interval);
                    storeAuthToken(JSON.stringify(data.tokens));
                    resolve({ success: true, accessToken: data.tokens.access_token });
                }
            } catch (error) {
                // Temporarily log network or parsing errors to the console
                console.error('Fetch or parsing error during polling:', error);
            }
        }, 2000);
    });
}

async function getLocalTokenOrRefreshedToken(): Promise<{ exist: boolean, accessToken: string | null; }> {
    const rawTokenData = await getAuthToken();
    if (!rawTokenData) return { exist: false, accessToken: null };
    const tokens = JSON.parse(rawTokenData);
    if (!tokens?.refresh_token) return { exist: false, accessToken: null };

    // Return existing token if valid for >5 more minutes
    if (Date.now() < (tokens.expiry_date - 300000)) return { exist: true, accessToken: tokens.access_token };

    const res = await fetch(`${SERVER_URL}/auth/google/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-zvault-app-token': credential.APP_TOKEN },
        body: JSON.stringify({ refreshToken: tokens.refresh_token })
    });

    if (res.status === 401) {
        fs.unlinkSync(TOKEN_PATH);
        throw new Error('REFRESH_TOKEN_EXPIRED');
    }
    if (!res.ok) throw new Error('Server error');

    const newTokens = await res.json();
    storeAuthToken(JSON.stringify(newTokens));
    return { exist: true, accessToken: newTokens.access_token };
}

async function checkExistingBackup(accessToken: string): Promise<{ isBackupPresent: boolean, data: drive_v3.Schema$File[] | null, message: string; }> {
    const authClient = new google.auth.OAuth2();
    authClient.setCredentials({ access_token: accessToken });
    const drive = google.drive({ version: "v3", auth: authClient });
    // List existing backups (newest first)
    const folderId = await getOrCreateBackupFolder(drive);
    const backups = await listBackups(drive, folderId);
    if (backups.length === 0) {
        return {
            isBackupPresent: false,
            data: null,
            message: "No backup found!"
        };
    } else {
        return {
            isBackupPresent: true,
            data: backups,
            message: "Backup found"
        };
    }
}


async function storeAuthToken(token: string) {
    try {
        if (safeStorage.isEncryptionAvailable()) {
            const encryptedTokenBuffer = safeStorage.encryptString(token);
            await fs.promises.writeFile(TOKEN_PATH, encryptedTokenBuffer.toString('hex'), { encoding: 'utf8' });
        } else {
            if (vaultDEK) {
                const encryptedToken = encryptData(token, vaultDEK, "utf8", "hex");
                await fs.promises.writeFile(TOKEN_PATH, JSON.stringify(encryptedToken), { encoding: 'utf8' });
            } else {
                const error = new Error('Token encryption error occurred');
                await handelError(error, 'Token Encryption', storeAuthToken.name);
            }
        }
    } catch (error) {
        await handelError(error, 'Token Encryption', storeAuthToken.name, 'Something went wrong');
    }
}


async function getAuthToken() {
    if (!fs.existsSync(TOKEN_PATH)) return null;
    try {
        const rawTokenData = await fs.promises.readFile(TOKEN_PATH, { encoding: 'utf8' });
        if (safeStorage.isEncryptionAvailable()) {
            return safeStorage.decryptString(Buffer.from(rawTokenData, 'hex'));
        } else {
            if (vaultDEK) {
                const { IV, TAG, encryptedData } = JSON.parse(rawTokenData);
                return decryptData(IV, TAG, encryptedData, vaultDEK, "hex", "utf8");
            } else {
                const error = new Error('Token encryption error occurred');
                await handelError(error, 'Token Encryption', storeAuthToken.name);
            }
        }
    } catch (error) {
        await handelError(error, 'Token Encryption', storeAuthToken.name, 'Something went wrong');
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

async function listBackups(drive: drive_v3.Drive, folderId: string): Promise<drive_v3.Schema$File[]> {
    // where name contains 'zvault-backup-' 
    const response = await drive.files.list({
        q: `'${folderId}' in parents and mimeType != 'application/vnd.google-apps.folder' and trashed = false`,
        fields: 'files(id, name, createdTime, mimeType, size)',
        orderBy: 'createdTime desc',     // newest first
        pageSize: 100,                    // adjust if you expect more than 100 backups
        spaces: 'drive',
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
    });
    const files = response.data.files || [];
    return files;
}

async function mergeGoogleCloudBackupFile(_event: IpcMainInvokeEvent, backFileId: string, backFilename: string, masterPassword: string) {
    try {
        const token = await getLocalTokenOrRefreshedToken();
        if(token.exist && token.accessToken !== null){
            const authClient = new google.auth.OAuth2();
            authClient.setCredentials({ access_token: token.accessToken });
            const drive = google.drive({ version: "v3", auth: authClient });
            const downloadedPath = await downloadBackupFile(drive, backFileId, backFilename);
            console.log({downloadedPath, masterPassword});
            return downloadedPath;
        } else {
            const error = new Error("Token not found");
            await handelError(error, 'TOKEN_NOT_FOUND', mergeGoogleCloudBackupFile.name, 'Auth token missing, Re-authenticate again');
        }
    } catch (error) {
        console.log(error, mergeGoogleCloudBackupFile.name);
        
    }
}


async function downloadBackupFile(drive: drive_v3.Drive, fileId: string, fileName: string): Promise<string> {
    try {
        const destinationPath = path.join(USER_DATA_PATH, fileName);
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
                    resolve(destinationPath);
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

function getRandomFileName() {
    // crypto.randomInt()
    let prefixWord = prefixes[Math.floor(Math.random() * 100)];
    let middleWord = middles[Math.floor(Math.random() * 100)];
    let suffixWord = suffixes[Math.floor(Math.random() * 100)];
    const firstPart = prefixWord[0].toUpperCase() + prefixWord.slice(1);
    const middlePart = middleWord[0].toUpperCase() + middleWord.slice(1);
    const lastPart = suffixWord[0].toUpperCase() + suffixWord.slice(1);
    return firstPart + middlePart + lastPart;
}

// async function backupToDrive(): Promise<{ success: boolean, message: string; }> {
//     try {
//         const auth = await getGoogleAuthClient();
//         const drive = googleDrive({ version: "v3", auth: auth as unknown as any });
//         const folderId = await getOrCreateBackupFolder(drive);
//         if (dbConnection) {
//             dbConnection.closeSync();
//             dbConnection = null;
//         }
//         // const fileName = `${randomFileName}-${new Date().toISOString().replace(/[:.]/g, '-')}-${path.basename(VAULT_PATH)}`;
//         // getAppData()
//         const fileName = getRandomFileName();
//         const tempBackupZipPath = path.join(USER_DATA_PATH, "cloud_backup.zip");
//         const zip = new AdmZip();
//         zip.addLocalFile(VAULT_PATH);
//         zip.addLocalFile(VAULT_DATA_PATH);
//         const exportZipResponse = await zip.writeZipPromise(tempBackupZipPath, {
//             overwrite: true
//         });
//         if (!exportZipResponse) {
//             return await handelError("Backup compression failed. Try again!", "Compression", "@backupToDrive");
//         }
//         if (!vaultDEK) {
//             return await handelError("VaultDek not found", "VaultDek", "@backupToDrive", "Something went wrong. Restart the app!");
//         }
//         await initializeDbConnection(vaultDEK.toString("hex"));
//         const fileStream = fs.createReadStream(tempBackupZipPath);
//         const media = {
//             mimeType: 'application/octet-stream',
//             body: fileStream,
//         };
//         // Upload or update (simple: create new each time with unique name)
//         const createResponse = await drive.files.create({
//             requestBody: {
//                 name: fileName,
//                 parents: [folderId],
//             },
//             media,
//             fields: 'id,createdTime',
//         });
//         if (createResponse.ok) {
//             await fs.promises.unlink(tempBackupZipPath);
//             console.log(`Backup successful: ${fileName}, id: ${createResponse.data.id}`);
//             await cleanupOldBackups(drive, folderId, 3);
//             return { success: true, message: `Backup successful! - ${createResponse.data.createdTime}` };
//         } else {
//             await fs.promises.unlink(tempBackupZipPath);
//             return { success: false, message: 'Backup failed!' };
//         }
//     } catch (err: any) {
//         return await handelError(err, "Backup", "@backupToDrive", "Google Drive backup failed");
//     }
// }

// async function openCloudBackup(
//     _event: Electron.IpcMainInvokeEvent,
//     backupFileId: string,
//     backupFileName: string
// ): Promise<{ success: boolean, message: string; }> {
//     try {
//         const auth = await getGoogleAuthClient();
//         const drive = googleDrive({ version: "v3", auth: auth as unknown as any });
//         const downloadLocation = await downloadBackupFile(drive, backupFileId, backupFileName);
//         const zip = new AdmZip(downloadLocation);
//         return new Promise((resolve, reject) => {
//             zip.extractAllToAsync(USER_DATA_PATH, true, false, async (error) => {
//                 await fs.promises.unlink(downloadLocation);
//                 resolve({ success: true, message: "Backup import successful!" });
//                 if (error) {
//                     reject(error);
//                 }
//             });
//         });
//     } catch (error) {
//         return await handelError(error, "Import", "@openCloudBackup", "Backup import failed!");
//     }
// }

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

async function mergeBackupIntoCurrent(localPath: string, cloudPath: string, dbEncryptionKeyLocal: string, dbEncryptionKeyCloud: string) {
    try {
        // Attach local database if not present
        if (!dbConnection) {
            const localInstance = await DuckDBInstance.create();
            dbConnection = await localInstance.connect();
            await dbConnection.run(`ATTACH '${localPath}' AS local_db (ENCRYPTION_KEY '${dbEncryptionKeyLocal}', ENCRYPTION_CIPHER 'GCM')`);
        }

        // Attach cloud backup
        await dbConnection.run(
            `ATTACH '${cloudPath}' AS cloud_db (ENCRYPTION_KEY '${dbEncryptionKeyCloud}', ENCRYPTION_CIPHER 'GCM')`
        );

        // ───────────────────────────────────────────────
        // 3. Get list of tables from the cloud database
        // ───────────────────────────────────────────────
        const tablesReader = await dbConnection.runAndReadAll(`
            SELECT table_name 
            FROM duckdb_tables() 
            WHERE database_name = 'cloud_db'
            AND schema_name = 'main'
        `);
        const allTableNames = tablesReader.getRowObjectsJson().map((row: any) => row.table_name);
        if (allTableNames.length === 0) {
            console.log('No tables found in cloud backup — nothing to merge.');
            return;
        };

        // ───────────────────────────────────────────────
        // 4. Merge each table (INSERT OR REPLACE strategy)
        // ───────────────────────────────────────────────
        console.log(allTableNames);

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
        try {
            if (dbConnection) await dbConnection.run("DETACH cloud_db");
        } catch (error) {
            console.warn('Failed to detach cloud_db:', error);
        }
    }
}

// async function handleMergeOrReplaceWithRetry(
//     localPath: string,
//     cloudPath: string,
//     dbEncryptionKey: string
// ): Promise<{ success: boolean, message: string; }> {
//     const MAX_ATTEMPTS = 3;
//     let attempts = 0;
//     try {
//         await mergeBackupIntoCurrent(localPath, cloudPath, dbEncryptionKey);
//         return { success: true, message: 'Successfully merged cloud backup into local database' };
//     } catch (error: any) {
//         if (error.message.includes('Invalid encryption key') || error.message.includes('decryption')) {
//             attempts++;
//             if (attempts >= MAX_ATTEMPTS) {
//                 return { success: false, message: 'Too many incorrect attempts. Merge cancelled.' };
//             }
//         }
//         // Other errors (file not found, schema issue, etc.)
//         return { success: false, message: `Merge failed: ${error.message}` };
//     }

//     // return { success: false, message: 'Max attempts reached' };
// }

async function replaceLocalFileWithCloud(
    localPath: string,
    cloudPath: string,
    dbEncryptionKey: string,
): Promise<{ success: boolean, message: string; }> {
    const MAX_ATTEMPTS = 3;
    let attempts = 0;
    let backupPath: string | null = null;

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

        return {
            success: true,
            message: 'Local database replaced with cloud version successfully.'
        }; // Success → exit

    } catch (error: any) {
        const isWrongPassword = error.message?.includes('Invalid encryption key') ||
            error.message?.includes('decryption') ||
            error.message?.includes('cipher');

        if (isWrongPassword) {
            attempts++;
            if (attempts >= MAX_ATTEMPTS) {
                // Restore backup if all attempts failed
                if (backupPath && fs.existsSync(backupPath)) {
                    try {
                        fs.copyFileSync(backupPath, localPath);
                        console.log('Local file restored from backup after failed attempts');
                    } catch (restoreErr) {
                        console.error('Restore failed:', restoreErr);
                    }
                }
                throw new Error(`Too many incorrect attempts (${MAX_ATTEMPTS}). Operation cancelled.`);
            }
        }
        // Non-password error → fail immediately
        throw error;
    }
}

async function openLocalBackup(): Promise<{ success: boolean, message: string; }> {
    try {
        const chosenFileArray = dialog.showOpenDialogSync(mainWindow!, {
            title: "Choose your backup vault file",
            // defaultPath: app.getPath("desktop"),
            properties: ["openFile"],
            filters: [{ name: 'Vault Zip', extensions: ['zip'] }]
        });
        if (Array.isArray(chosenFileArray) && chosenFileArray.length) {
            const chosenFile = chosenFileArray[0];
            const VAULT_COPY_PATH = path.join(USER_DATA_PATH, 'vault.zip');
            await fs.promises.copyFile(chosenFile, VAULT_COPY_PATH);
            const zip = new AdmZip(VAULT_COPY_PATH);
            return new Promise((resolve, reject) => {
                zip.extractAllToAsync(USER_DATA_PATH, true, true, async (error) => {
                    await fs.promises.unlink(VAULT_COPY_PATH);
                    resolve({ success: true, message: "Backup Imported Successfully" });
                    if (error) {
                        await handelError(error, 'Import Error', openLocalBackup.name, 'Import Failed. Try again!');
                        reject(error);
                    }
                });
            });
        } else {
            return {
                success: false,
                message: "File selection cancelled!"
            };
        }
    } catch (error: any) {
        console.log({ error, where: "@openLocalBackup" });
        throw new Error(error.message);
    }
}

async function exportVaultLocally(): Promise<{ success: boolean, message: string; }> {
    try {
        if (dbConnection) {
            dbConnection.closeSync();
            dbConnection = null;
        }
        const folderToExport = dialog.showSaveDialogSync(mainWindow!, {
            title: "Select the folder to export",
            defaultPath: "z-vault.zip",
            filters: [
                { name: "Vault Zip", extensions: ["zip"] }
            ]
        });
        if (!folderToExport) {
            return {
                success: false,
                message: "Folder selection cancelled!"
            };
        }
        const zip = new AdmZip();
        zip.addLocalFile(VAULT_PATH);
        zip.addLocalFile(VAULT_DATA_PATH);
        const exportZipResponse = await zip.writeZipPromise(folderToExport, {
            overwrite: true
        });
        if (!exportZipResponse) {
            return {
                success: false,
                message: "Export failed!"
            };
        }
        if (!vaultDEK) throw new Error("Something went wrong!");
        await initializeDbConnection(vaultDEK.toString("hex"));
        return {
            success: true,
            message: "Export successful!"
        };
    } catch (error: any) {
        console.log({ error, where: "@exportVaultLocally" });
        throw new Error(error?.message);
    }
}

async function handelError(error: any, type: string, where: string, rendererMessage?: string): Promise<{ success: boolean, message: string; }> {
    const errorMessage = error instanceof Error ? error.message : String(error.message ?? error);
    const errorStack = error instanceof Error ? error.stack : 'No stack trace available';
    await logToFile(rendererMessage ?? errorMessage, where, errorStack);
    dialog.showErrorBox(`${type} Error Occurred`, rendererMessage ?? errorMessage);
    return {
        success: false,
        message: rendererMessage ?? errorMessage,
    };
}

async function logToFile(message: string, where: string, errorStack?: string) {
    const logPath = path.join(app.getPath('userData'), 'error.log');
    const timestamp = new Date().toISOString();
    await fs.promises.appendFile(logPath, `[${timestamp}] - [${where}] - ${message}\n${errorStack}\n`);
}

process.on('uncaughtException', (err) => {
    const message = `[${new Date().toISOString()}] CRASH: ${err.stack}\n`;
    const logPath = path.join(app.getPath('userData'), 'error.log');
    try {
        fs.appendFileSync(logPath, message);
        fs.writeSync(2, message);
    } catch (loggingError: any) {
        fs.writeSync(2, "Could not write to log file: " + loggingError.message);
    }
    process.exit(1);
});
