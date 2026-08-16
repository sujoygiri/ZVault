const startupActionCardElement = document.getElementById("z_vault__startup_content_container") as HTMLDivElement;
const startupGoogleSignInBtn = document.getElementById("z_vault__startup_button-google") as HTMLButtonElement;
const localBackupSelectBtn = document.getElementById("z_vault__startup_button-local") as HTMLButtonElement;
const startNewVaultBtn = document.getElementById("z_vault__startup_button-new") as HTMLButtonElement;
const newMasterPasswordFormElement = document.getElementById("z_vault__new_master_password_form_section") as HTMLDivElement;
const existingPasswordFormElement = document.getElementById("z_vault__existing_password_from_section") as HTMLDivElement;
const existingMasterPasswordInput = document.getElementById("z_vault__user_master_password_input") as HTMLInputElement;
const existingMasterPasswordStateChangeBtn = document.getElementById("z_vault__user_master_password_state_change_btn") as HTMLButtonElement;
const existingFormInputEyeCloseSvg = document.getElementById("z_vault__existing_form_input_eye_close_svg") as HTMLOrSVGImageElement;
const existingFormInputEyeOpenSvg = document.getElementById("z_vault__existing_form_input_eye_open_svg") as HTMLOrSVGImageElement;
const createMasterPasswordInput = document.getElementById("z_vault__create_master_password_input") as HTMLInputElement;
const createMasterPasswordStateChangeBtn = document.getElementById("z_vault__create_master_password_state_change_btn") as HTMLButtonElement;
const newFormInputEyeCloseSvg = document.getElementById("z_vault__new_form_input_eye_close_svg") as HTMLOrSVGImageElement;
const newFormInputEyeOpenSvg = document.getElementById("z_vault__new_form_input_eye_open_svg") as HTMLOrSVGImageElement;
const confirmMasterPasswordInput = document.getElementById("z_vault__confirm_master_password_input") as HTMLInputElement;
const confirmMasterPasswordStateChangeBtn = document.getElementById("z_vault__create_confirm_master_password_state_change_btn") as HTMLButtonElement;
const newFormConfirmInputEyeCloseSvg = document.getElementById("z_vault__new_form_confirm_input_eye_close_svg") as HTMLOrSVGImageElement;
const newFormConfirmInputEyeOpenSvg = document.getElementById("z_vault__new_form_confirm_input_eye_open_svg") as HTMLOrSVGImageElement;
const existingVaultUnlockBtn = document.getElementById("z_vault__existing_vault_unlock_btn") as HTMLButtonElement;
const newVaultCreationBtn = document.getElementById("z_vault__create_new_vault_btn") as HTMLButtonElement;
const masterPasswordRuleTextElement = document.getElementsByClassName("z_vault__master_password_rule_text") as HTMLCollectionOf<HTMLLIElement>;
const masterPasswordNotMatchElement = document.getElementById("z_vault__password_not_match_error") as HTMLParagraphElement;
const authFormElement = document.getElementById("z_vault__auth_form") as HTMLDivElement;
const vaultContentElement = document.getElementById("z_vault__vault_content") as HTMLDivElement;
const addDataBtn = document.getElementById("z_vault__add_data_btn") as HTMLButtonElement;
const addModalBackdrop = document.getElementById("modalBackdrop") as HTMLDivElement;
const addModal = document.getElementById("addModal") as HTMLDivElement;
const modalCloseBtn = document.getElementById("z_vault__modal_close_btn") as HTMLButtonElement;
const popUpFromSaveBtn = document.getElementById("z_vault__password_form_action_save_btn") as HTMLButtonElement;
const popUpFormCancelBtn = document.getElementById("z_vault__password_form_action_cancel_btn") as HTMLButtonElement;
const passwordListElement = document.getElementById("z_vault__main_password_list") as HTMLDivElement;
const noDataFoundElement = document.getElementById("z_vault__no_data_found_section") as HTMLDivElement;
const passwordFormServiceInput = document.getElementById("z_vault__password_form_service_input") as HTMLInputElement;
const passwordFormNameOrEmailInput = document.getElementById("z_vault__password_form_name_or_email_input") as HTMLInputElement;
const passwordFormPasswordInput = document.getElementById("z_vault__password_form_password_input") as HTMLInputElement;
const passwordFormCategorySelect = document.getElementById("z_vault__password_form_category_select") as HTMLSelectElement;
const passwordFormUrlInput = document.getElementById("z_vault__password_form_website_input") as HTMLInputElement;
const passwordFormNoteInput = document.getElementById("z_vault__password_form_note_text") as HTMLTextAreaElement;
const textFormTitleInput = document.getElementById("z_vault__text_form_title_input") as HTMLInputElement;
const textFormNoteTextarea = document.getElementById("z_vault__text_form_note_text") as HTMLTextAreaElement;
const textFormCategorySelect = document.getElementById("z_vault__text_form_category_select") as HTMLSelectElement;
const passwordFormTabGroupBtn = document.querySelectorAll(".z_vault__password_form_tab_group_btn") as NodeListOf<HTMLButtonElement>;
const addModalAllFormElement = document.querySelectorAll(".z_vault__popup_form") as NodeListOf<HTMLElement>;
const addDataModalPasswordForm = document.querySelector(".z_vault__add_data_modal_password_form") as HTMLDivElement;
const addDataModalTextForm = document.querySelector(".z_vault__add_data_modal_text_form") as HTMLDivElement;
const addDataModalPasswordGeneratorForm = document.querySelector(".z_vault__password_generator_form") as HTMLDivElement;
const popupFormBottomBtnGroupElement = document.querySelector(".z_vault__add_data_modal_action_buttons") as HTMLDivElement;
const passwordGeneratorSliderInputLabel = document.querySelector(".z_vault__password_generator_slider label") as HTMLLabelElement;
const passwordGeneratorSliderInput = document.getElementById("z_vault__password_generator_slider_input") as HTMLInputElement;
const generatedPasswordContainerEle = document.getElementById("z_vault__generated_password") as HTMLElement;
const passwordGeneratorBtn = document.getElementById("z_vault__password_generator_btn") as HTMLButtonElement;
const paginationDiv = document.getElementById('pagination') as HTMLDivElement;
const sidebarMenuItems = document.querySelectorAll(".z_vault__sidebar_menu_item") as NodeListOf<HTMLSpanElement>;
const settingsPanelModalBackdropElement = document.getElementById("z_vault__settings_panel_modalBackdrop") as HTMLDivElement;
const settingsPanelModal = document.getElementById("z_vault__settings_panelModal") as HTMLDivElement;
const startupCloudBackupOverlayElement = document.getElementById("z_vault__startup_cloud_backup_overlay") as HTMLDivElement;
const sidebarMenuBottomItemSettings = document.getElementById("z_vault__sidebar_menu_bottom_item_settings") as HTMLDivElement;
const settingsPanelModalCloseBtn = document.getElementById("z_vault__settings_panelModalCloseBtn") as HTMLDivElement;
const settingsPanelSidebarItemElement = document.querySelectorAll('.z_vault__settings_panel_sidebar-item') as NodeListOf<HTMLDivElement>;
const settingsPanelGoogleDriveBackupBtn = document.getElementById("z_vault__settings_google_drive_btn") as HTMLButtonElement;
const dataSyncModalElement = document.getElementById("z_vault__data_sync__modalOverlay") as HTMLDivElement;
const vaultExistWarningOverlay = document.getElementById("z_vault__warning_overlay") as HTMLDivElement;
const dataSyncModalError = document.getElementById("z_vault__data_sync__error") as HTMLDivElement;
const dataSyncModalPasswordInput = document.getElementById("z_vault__data_sync__password") as HTMLInputElement;
const dataSyncPasswordCancelBtn = document.getElementById("z_vault__data_sync__cancel") as HTMLButtonElement;
const dataSyncPasswordSubmitBtn = document.getElementById("z_vault__data_sync__submit") as HTMLButtonElement;
const settingsPanelDataImportBtn = document.getElementById("z_vault__settings_panel_import_btn") as HTMLButtonElement;
const settingsPanelDataExportBtn = document.getElementById("z_vault__settings_panel_export_btn") as HTMLButtonElement;
const cloudBackupInitialViewElement = document.getElementById("z_vault__startup_cloud_backup_initial_view") as HTMLDivElement;
const cloudBackupImportBtn = document.getElementById("z_vault__startup_cloud_backup_button_import") as HTMLButtonElement;
const cloudBackupSkipBtn = document.getElementById("z_vault__startup_cloud_backup_button_skip") as HTMLButtonElement;
const cloudBackupListViewElement = document.getElementById("z_vault__startup_cloudbackup__backups_view") as HTMLDivElement;
const cloudBackupBackBtn = document.getElementById("z_vault__startup_cloudbackup__backups-back_btn") as HTMLButtonElement;
const cloudBackupListElement = document.getElementById("z_vault__startup_cloudbackup__backups_list") as HTMLDivElement;
const cloudBackupRestoreSkipBtn = document.getElementById("z_vault__startup_cloudbackup__button_skip") as HTMLButtonElement;
const cloudBackupRestoreBtn = document.getElementById("z_vault__startup_cloudbackup__button_import") as HTMLButtonElement;

let pageSize = 10;
let currentPageNum = 1;
let modifyingStatus: "creating" | "updating" = "creating";
let currentUpdatingData: PasswordDetails | TextDetails | null = null;
let currentActiveDataType: DataType = "password";
let cloudBackVaultList: GoogleDriveFileList = [];
let selectedBackupId: string = "";
let selectedBackupName: string = "";

const validateMasterPassword = (password: string): boolean => {
    let isPasswordValid = true;
    const checkCapitalRegex = /[A-Z]/;
    const checkLowerRegex = /[a-z]/;
    const checkDigitRegex = /[0-9]/;
    const checkSpecialRegex = /[!@#$%^&*]/;
    const lengthRuleTextElement = masterPasswordRuleTextElement.item(0) as HTMLLIElement;
    const capitalRuleTextElement = masterPasswordRuleTextElement.item(1) as HTMLLIElement;
    const smallRuleTextElement = masterPasswordRuleTextElement.item(2) as HTMLLIElement;
    const digitRuleTextElement = masterPasswordRuleTextElement.item(3) as HTMLLIElement;
    const specialRuleTextElement = masterPasswordRuleTextElement.item(4) as HTMLLIElement;
    const rules = [
        { cond: password.length >= 8, el: lengthRuleTextElement },
        { cond: checkCapitalRegex.test(password), el: capitalRuleTextElement },
        { cond: checkLowerRegex.test(password), el: smallRuleTextElement },
        { cond: checkDigitRegex.test(password), el: digitRuleTextElement },
        { cond: checkSpecialRegex.test(password), el: specialRuleTextElement }
    ];
    rules.forEach(({ cond, el }) => {
        if (cond) {
            el.style.color = "rgb(28, 212, 83)";
        } else {
            el.style.color = "rgb(248, 113, 113)";
            isPasswordValid = false;
        }
    });
    return isPasswordValid;
}

const startUpFormAnimation = (event: AnimationEvent, currentElement: HTMLElement, incomingElement: HTMLElement) => {
    const targetElement = event.target as HTMLDivElement;
    const targetElementAnimation = targetElement.getAnimations()[0] as CSSAnimation;
    const targetElementAnimationName = targetElementAnimation.animationName;
    if (targetElementAnimationName === "fadeOutLeft" && targetElementAnimation.playState === "finished") {
        if (targetElement === currentElement) {
            targetElement.style.display = "none";
            incomingElement.style.display = "block"
        } else {
            targetElement.style.display = "none";
            currentElement.style.display = "block"
        }
    }
};

const validatePasswordDetailsOnBlur = () => {
    const elements = [
        { el: passwordFormServiceInput },
        { el: passwordFormNameOrEmailInput },
        { el: passwordFormPasswordInput },
        { el: passwordFormCategorySelect },
        { el: passwordFormUrlInput },
        { el: passwordFormNoteInput },
    ];
    elements.forEach(({ el }) => {
        el.addEventListener("blur", (event) => {
            let target = event.target as (HTMLInputElement | HTMLSelectElement);
            if (!target.value.length) {
                el.style.borderColor = "rgb(248, 113, 113)";
            } else {
                el.style.borderColor = "rgb(28, 212, 83)";
            }
        });
    });
}

const validatePasswordDetails = (fromData: NewPassword) => {
    let isFormValid = true;
    const service = fromData.title.trim();
    const nameOrEmail = fromData.usernameOrEmail.trim();
    const password = fromData.password.trim();
    const category = fromData.category.trim();
    const url = fromData.url.trim();
    const note = fromData.note.trim();
    const rules = [
        { cond: service.length > 0, el: passwordFormServiceInput },
        { cond: nameOrEmail.length > 0, el: passwordFormNameOrEmailInput },
        { cond: password.length > 0, el: passwordFormPasswordInput },
        { cond: category.length > 0, el: passwordFormCategorySelect },
        { cond: url.length > 0, el: passwordFormUrlInput },
        { cond: note.length > 0, el: passwordFormNoteInput },
    ];
    for (let index = 0; index < rules.length; index++) {
        let cond = rules[index].cond;
        let el = rules[index].el;
        if (!cond) {
            el.style.borderColor = "rgb(248, 113, 113)";
            el.focus();
            el.scrollIntoView({ behavior: "smooth" });
            isFormValid = false;
            break;
        } else {
            el.style.borderColor = "rgb(28, 212, 83)";
        }
    }
    // rules.forEach(({ cond, el }) => {
    //     if (!cond) {
    //         el.style.borderColor = "rgb(248, 113, 113)";
    //         el.focus();
    //         el.scrollIntoView({ behavior: "smooth" });
    //         isFormValid = false;
    //     } else {
    //         el.style.borderColor = "rgb(28, 212, 83)";
    //     }
    // });
    return isFormValid;
}

function generatePassword(length: number): string {
    let capitalAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let smallAlphabet = "abcdefghijklmnopqrstuvwxyz";
    let digits = "0123456789";
    let specialCharacter = "!@#$%^&*:|()[]{}?";
    let password = "";
    for (let i = 0; i < length; ++i) {
        let randomChoice = Math.floor(Math.random() * 4);
        let randomCharIndex = 0;
        switch (randomChoice) {
            case 0:
                randomCharIndex = Math.floor(Math.random() * capitalAlphabet.length);
                password += capitalAlphabet[randomCharIndex];
                break;
            case 1:
                randomCharIndex = Math.floor(Math.random() * smallAlphabet.length);
                password += smallAlphabet[randomCharIndex];
                break;
            case 2:
                randomCharIndex = Math.floor(Math.random() * digits.length);
                password += digits[randomCharIndex];
                break;
            case 3:
                randomCharIndex = Math.floor(Math.random() * specialCharacter.length);
                password += specialCharacter[randomCharIndex];
                break;
            default:
                break;
        }
    }
    return password;
}

const renderPagination = async (totalEntries: number) => {
    paginationDiv.innerHTML = '';
    const totalPages = Math.ceil(totalEntries / pageSize);

    const loadPage = async (page: number) => {
        currentPageNum = page;
        const data = await window.electronAPI.fetchData(currentActiveDataType, page, pageSize);
        if (data && data.rows) {
            renderDataItems(data);
            await renderPagination(data.totalEntries); // Use updated total if needed
        }
    };

    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.classList.add('arrow');
    prevBtn.textContent = '←';
    prevBtn.disabled = currentPageNum === 1;
    prevBtn.addEventListener('click', async () => {
        if (currentPageNum > 1) {
            await loadPage(currentPageNum - 1);
        }
    });
    paginationDiv.appendChild(prevBtn);

    // Page numbers logic
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > 7) {
        if (currentPageNum <= 4) {
            endPage = 5;
        } else if (currentPageNum >= totalPages - 3) {
            startPage = totalPages - 4;
        } else {
            startPage = currentPageNum - 2;
            endPage = currentPageNum + 2;
        }
    }

    // First page
    if (startPage > 1) {
        const firstBtn = document.createElement('button');
        firstBtn.textContent = '1';
        if (currentPageNum === 1) firstBtn.classList.add('active');
        firstBtn.addEventListener('click', () => loadPage(1));
        paginationDiv.appendChild(firstBtn);

        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.style.padding = '0 8px';
            ellipsis.style.color = '#666';
            paginationDiv.appendChild(ellipsis);
        }
    }

    // Middle pages
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = String(i);
        if (i === currentPageNum) pageBtn.classList.add('active');
        pageBtn.addEventListener('click', () => loadPage(i));
        paginationDiv.appendChild(pageBtn);
    }

    // Last page
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.style.padding = '0 8px';
            ellipsis.style.color = '#666';
            paginationDiv.appendChild(ellipsis);
        }

        const lastBtn = document.createElement('button');
        lastBtn.textContent = String(totalPages);
        if (currentPageNum === totalPages) lastBtn.classList.add('active');
        lastBtn.addEventListener('click', () => loadPage(totalPages));
        paginationDiv.appendChild(lastBtn);
    }

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.classList.add('arrow');
    nextBtn.textContent = '→';
    nextBtn.disabled = currentPageNum === totalPages;
    nextBtn.addEventListener('click', async () => {
        if (currentPageNum < totalPages) {
            await loadPage(currentPageNum + 1);
        }
    });
    paginationDiv.appendChild(nextBtn);
};

const addFavorite = (passwordId: string) => {
    console.log(passwordId);
}

const editPassword = (password: PasswordDetails) => {
    resetInputElements([passwordFormServiceInput,
        passwordFormNameOrEmailInput,
        passwordFormPasswordInput,
        passwordFormCategorySelect,
        passwordFormUrlInput,
        passwordFormNoteInput
    ]);
    passwordFormServiceInput.value = password.title;
    passwordFormNameOrEmailInput.value = password.usernameOrEmail ?? "";
    passwordFormPasswordInput.value = password.password ?? "";
    passwordFormCategorySelect.value = password.category;
    passwordFormUrlInput.value = password.url;
    passwordFormNoteInput.value = password.note ?? "";
    currentUpdatingData = password;
    modifyingStatus = "updating";
}

const deleteData = async (passwordId: string) => {
    const afterDeleteResult = await window.electronAPI.deleteData(passwordId, currentActiveDataType, currentPageNum, pageSize);
    renderDataItems(afterDeleteResult)
    await renderPagination(afterDeleteResult.totalEntries);
}

async function getSensitivePasswordData(id: string) {
    const decryptedData = await window.electronAPI.decryptSensitivePasswordData(id, currentActiveDataType);
    return JSON.parse(decryptedData);
}

function resetInputElements(inputElements: (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)[]) {
    inputElements.forEach(element => {
        element.value = "";
    });
}

function changeShowHideBtnState(
    showHideElement: HTMLElement,
    showHideIconContainer: HTMLElement,
    SensitivePasswordData: SensitivePasswordData,
    eleType: 'username' | 'password'
) {
    const showHideElementType = showHideElement.dataset.type;
    showHideIconContainer.innerHTML = ""
    if (showHideElementType === "dot") {
        showHideElement.innerText = (eleType === 'username' ? SensitivePasswordData.usernameOrEmail : SensitivePasswordData.password);
        showHideIconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="width: 1rem; height: 1rem"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M6.873 17.129c-1.845-1.31-3.305-3.014-4.13-4.09a1.693 1.693 0 0 1 0-2.077C4.236 9.013 7.818 5 12 5c1.876 0 3.63.807 5.13 1.874"/><path d="M14.13 9.887a3 3 0 1 0-4.243 4.242M4 20L20 4M10 18.704A7.124 7.124 0 0 0 12 19c4.182 0 7.764-4.013 9.257-5.962a1.694 1.694 0 0 0-.001-2.078A22.939 22.939 0 0 0 19.57 9"/></g></svg>`;
        showHideElement.dataset.type = "text";
    } else {
        showHideElement.innerText = "••••••••••••";
        showHideIconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024" style="width: 1rem; height: 1rem"><path fill="currentColor" d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3c7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176s176-78.8 176-176s-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112s112 50.1 112 112s-50.1 112-112 112z" /></svg>`;
        showHideElement.dataset.type = "dot";
    }
}

async function changeCopyBtnState(copyIconContainer: HTMLElement, SensitivePasswordData: SensitivePasswordData, eleType: 'username' | 'password') {
    let timeoutId: any;
    await navigator.clipboard.writeText(eleType === 'username' ? SensitivePasswordData.usernameOrEmail : SensitivePasswordData.password);
    copyIconContainer.innerHTML = "";
    copyIconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" style="width: 1rem; height: 1rem"><path fill="none" stroke="#209400" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></svg>`;
    timeoutId = setTimeout(() => {
        clearTimeout(timeoutId)
        copyIconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="width: 1rem; height: 1rem"><path fill="currentColor" d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z" /></svg>`;
    }, 2000);
}

const renderDataItems = (data: ResponsePayload) => {
    if (data.type === "accounts") {
        renderPasswords(data.rows as PasswordDetails[]);
    } else {
        renderTexts(data.rows as TextDetails[]);
    }
}

const renderPasswords = (passwords: PasswordDetails[]) => {
    authFormElement.style.display = "none";
    vaultContentElement.style.display = "flex"
    passwordListElement.innerHTML = "";
    noDataFoundElement.innerHTML = "";
    if (passwords.length) {
        passwords.forEach(password => {
            let SensitivePasswordData: SensitivePasswordData | null = null;
            const passwordListItem = document.createElement("div");
            passwordListItem.classList.add("z_vault__main_password_list_item");
            passwordListItem.innerHTML = `
      <div class="z_vault__main_password_list_card" id="mainPasswordCard-${password.id}">
        <div class="z_vault__main_password_list_card_content">
          <div class="z_vault__main_password_list_card_row">
            <div class="z_vault__main_password_list_card_row_left">
              <div class="z_vault__main_password_list_card_icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" style="
                      color: rgb(96 165 250);
                      width: 1.25rem;
                      height: 1.25rem;
                    ">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                  <path d="M2 12h20"></path>
                </svg>
              </div>
              <div>
                <div class="z_vault__main_password_list_card_info">
                  <h3 class="z_vault__main_password_list_card_title">
                    ${password.title}
                  </h3>
                  <p class="z_vault__main_password_list_card_email">
                    ${password.usernameOrEmail}
                  </p>
                </div>
              </div>
            </div>
            <div class="z_vault__main_password_list_card_actions">
              <button class="z_vault__main_password_list_card_action_btn" id="seeNotes-${password.id}">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M340-460h280v-64H340v64Zm0 120h280v-64H340v64Zm0 120h174v-64H340v64ZM263.72-96Q234-96 213-117.15T192-168v-624q0-29.7 21.15-50.85Q234.3-864 264-864h312l192 192v504q0 29.7-21.16 50.85Q725.68-96 695.96-96H263.72ZM528-624v-168H264v624h432v-456H528ZM264-792v168-168 624-624Z"/></svg>
              </button>
              <button class="z_vault__main_password_list_card_action_btn" id="addFavorite-${password.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024"
                  style="width: 1.2rem; height: 1.2rem">
                  <path fill="currentColor"
                    d="m908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5c-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1l-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2c17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9l183.7-179.1c5-4.9 8.3-11.3 9.3-18.3c2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7L323.1 772l36.1-210.3l-152.8-149L417.6 382L512 190.7L606.4 382l211.2 30.7l-152.8 148.9z" />
                </svg>
              </button>
              <div style="position:relative;">
                <button class="z_vault__main_password_list_card_action_btn" id="editPassword-${password.id}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    style="width: 1.2rem; height: 1.2rem">
                    <path fill="currentColor"
                      d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2z" />
                  </svg>
                </button>
                <div class="z_vault__list_item_action_container">
                  <div class="z_vault__list_item_action" id="passwordEditBtn-${password.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#009fa1ff" d="m7 17.013l4.413-.015l9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583l-1.597 1.582l-1.586-1.585l1.594-1.58zM9 13.417l6.03-5.973l1.586 1.586l-6.029 5.971L9 15.006v-1.589z"/><path fill="#009fa1ff" d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"/></svg>
                    <p>Edit</p>
                  </div>
                  <div class="z_vault__list_item_action" id="passwordDeleteBtn-${password.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20"><path fill="#c52020" d="M8.5 4h3a1.5 1.5 0 0 0-3 0Zm-1 0a2.5 2.5 0 0 1 5 0h5a.5.5 0 0 1 0 1h-1.054l-1.194 10.344A3 3 0 0 1 12.272 18H7.728a3 3 0 0 1-2.98-2.656L3.554 5H2.5a.5.5 0 0 1 0-1h5ZM5.741 15.23A2 2 0 0 0 7.728 17h4.544a2 2 0 0 0 1.987-1.77L15.439 5H4.561l1.18 10.23ZM8.5 7.5A.5.5 0 0 1 9 8v6a.5.5 0 0 1-1 0V8a.5.5 0 0 1 .5-.5ZM12 8a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V8Z"/></svg>
                    <p>Delete</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="z_vault__main_password_list_card_password">
            <div class="z_vault__main_password_list_card_password_row">
              <div class="z_vault__main_password_list_card_password_row_header">
                <span>Username/Email</span>
                <div class="z_vault__main_password_list_card_password_actions">
                  <button class="z_vault__main_password_list_card_password_action_btn" id="showUsername-${password.id}">
                    <div id="usernameShowHideIconContainer-${password.id}">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024"
                        style="width: 1rem; height: 1rem">
                        <path fill="currentColor"
                          d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3c7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176s176-78.8 176-176s-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112s112 50.1 112 112s-50.1 112-112 112z" />
                      </svg>
                    </div>
                  </button>
                  <button class="z_vault__main_password_list_card_password_action_btn" id="copyUsername-${password.id}">
                    <div id="usernameCopyIconContainer-${password.id}">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        style="width: 1rem; height: 1rem">
                        <path fill="currentColor"
                          d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
              <code class="z_vault__main_password" id="mainUsername-${password.id}" data-type="dot">••••••••••••</code>
            </div>
          </div>
          <div class="z_vault__main_password_list_card_password">
            <div class="z_vault__main_password_list_card_password_row">
              <div class="z_vault__main_password_list_card_password_row_header">
                <span>Password</span>
                <div class="z_vault__main_password_list_card_password_actions">
                  <button class="z_vault__main_password_list_card_password_action_btn" id="showPassword-${password.id}">
                    <div id="passwordShowHideIconContainer-${password.id}">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024"
                        style="width: 1rem; height: 1rem">
                        <path fill="currentColor"
                          d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3c7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176s176-78.8 176-176s-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112s112 50.1 112 112s-50.1 112-112 112z" />
                      </svg>
                    </div>
                  </button>
                  <button class="z_vault__main_password_list_card_password_action_btn" id="copyPassword-${password.id}">
                    <div id="passwordCopyIconContainer-${password.id}">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        style="width: 1rem; height: 1rem">
                        <path fill="currentColor"
                          d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
              <code class="z_vault__main_password" id="mainPassword-${password.id}" data-type="dot">••••••••••••</code>
            </div>
          </div>
          <div class="z_vault__main_password_list_card_footer">
            <div class="z_vault__main_password_list_card_footer_label">
              ${password.category}
            </div>
            <div class="z_vault__main_password_list_card_footer_strength">
              <!--need to implement password strength-->
            </div>
          </div>
          <a href="${password.url}" class="z_vault__main_password_list_card_footer_link"
            target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              style="width: 1rem; height: 1rem">
              <path fill="currentColor" d="m13 3l3.293 3.293l-7 7l1.414 1.414l7-7L21 11V3z" />
              <path fill="#ffffff"
                d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z" />
            </svg>
            <span class="z_vault__main_password_list_card_footer_link_label">Visit Site</span>
          </a>
        </div>
        <div class="z_vault__main_password_list_card_content z_vault__main_password_list_card_back">
          <div class="z_vault__main_password_list_card_actions">
            <button class="z_vault__main_password_list_card_action_btn" id="seePassword-${password.id}">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M444-53q-55-6-106.5-29.5T244-148l51-51q32 31 70 49t79 24v73Zm72 0v-73q100-14 164-87t64-174q0-110-76.5-186.5T481-650h-27l77 76-51 51-170-169 170-170 51 51-90 89h39q70 0 131 26t106.5 71.5Q763-579 789.5-518T816-387q0 131-85.5 225.5T516-53ZM198-204q-29-45-41.5-94.5T144-399h73q0 37 8 73t27 69l-54 53Zm-43-267q11-42 32.5-81t54.5-72l51 50q-23 23-38 49t-24 54h-76Z"/></svg>
            </button>
          </div>
          <div class="z_vault__main_password_list_card_note">
            <p id="passwordNote-${password.id}"></p>
          </div>
        </div>
      </div>
      `;
            passwordListElement.appendChild(passwordListItem);
            const cardElement = document.getElementById(`mainPasswordCard-${password.id}`);
            const seeNotesBtn = document.getElementById(`seeNotes-${password.id}`);
            const seePasswordBtn = document.getElementById(`seePassword-${password.id}`)
            const addFavoriteBtn = document.getElementById(`addFavorite-${password.id}`);
            const editPasswordBtn = document.getElementById(`editPassword-${password.id}`);
            const showUsernameBtn = document.getElementById(`showUsername-${password.id}`);
            const copyUsernameBtn = document.getElementById(`copyUsername-${password.id}`);
            const showPasswordBtn = document.getElementById(`showPassword-${password.id}`);
            const copyPasswordBtn = document.getElementById(`copyPassword-${password.id}`);
            const mainUsernameElement = document.getElementById(`mainUsername-${password.id}`) as HTMLElement;
            const mainPasswordElement = document.getElementById(`mainPassword-${password.id}`) as HTMLElement;
            const usernameShowHideIconContainer = document.getElementById(`usernameShowHideIconContainer-${password.id}`) as HTMLDivElement;
            const usernameCopyIconContainer = document.getElementById(`usernameCopyIconContainer-${password.id}`) as HTMLDivElement;
            const passwordShowHideIconContainer = document.getElementById(`passwordShowHideIconContainer-${password.id}`) as HTMLDivElement;
            const passwordCopyIconContainer = document.getElementById(`passwordCopyIconContainer-${password.id}`) as HTMLDivElement;
            const passwordNoteContentElement = document.getElementById(`passwordNote-${password.id}`);
            const passwordEditBtn = document.getElementById(`passwordEditBtn-${password.id}`);
            const passwordDeleteBtn = document.getElementById(`passwordDeleteBtn-${password.id}`);

            document.addEventListener("click", (event) => {
                const clickedElement = event.target as HTMLElement;
                document.querySelectorAll(".z_vault__list_item_action_container.active_menu").forEach(element => {
                    const parentContainer = element.parentElement as HTMLDivElement;
                    if (!parentContainer.contains(clickedElement)) {
                        element.classList.remove('active_menu');
                        element.previousElementSibling?.classList.remove('active');
                    }
                });
            });
            seeNotesBtn?.addEventListener("click", async () => {
                currentActiveDataType = "password";
                SensitivePasswordData = SensitivePasswordData ?? await getSensitivePasswordData(password.id);
                if (passwordNoteContentElement && SensitivePasswordData?.note) {
                    passwordNoteContentElement.innerText = SensitivePasswordData.note;
                }
                cardElement?.classList.toggle("is-flipped");
            });
            seePasswordBtn?.addEventListener("click", () => {
                cardElement?.classList.toggle("is-flipped");
            })
            addFavoriteBtn?.addEventListener("click", () => {
                currentActiveDataType = "password";
                addFavorite(password.id);
            });
            editPasswordBtn?.addEventListener("click", () => {
                editPasswordBtn.classList.toggle('active');
                editPasswordBtn?.nextElementSibling?.classList.toggle('active_menu');
            });
            showUsernameBtn?.addEventListener("click", async () => {
                SensitivePasswordData = SensitivePasswordData ?? await getSensitivePasswordData(password.id);
                if (SensitivePasswordData) {
                    changeShowHideBtnState(mainUsernameElement, usernameShowHideIconContainer, SensitivePasswordData, 'username');
                }
            });
            showPasswordBtn?.addEventListener("click", async () => {
                SensitivePasswordData = SensitivePasswordData ?? await getSensitivePasswordData(password.id);
                if (SensitivePasswordData) {
                    changeShowHideBtnState(mainPasswordElement, passwordShowHideIconContainer, SensitivePasswordData, 'password');
                }
            });
            copyUsernameBtn?.addEventListener("click", async () => {
                SensitivePasswordData = SensitivePasswordData ?? await getSensitivePasswordData(password.id);
                if (SensitivePasswordData) {
                    await changeCopyBtnState(usernameCopyIconContainer, SensitivePasswordData, 'username');
                }
            });
            copyPasswordBtn?.addEventListener("click", async () => {
                SensitivePasswordData = SensitivePasswordData ?? await getSensitivePasswordData(password.id);
                if (SensitivePasswordData) {
                    await changeCopyBtnState(passwordCopyIconContainer, SensitivePasswordData, 'password');
                }
            });
            passwordEditBtn?.addEventListener("click", async () => {
                addModalBackdrop.classList.add("z_vault__open");
                addModal.classList.add("z_vault__open");
                SensitivePasswordData = SensitivePasswordData ?? await getSensitivePasswordData(password.id);
                currentActiveDataType = "password";
                password.usernameOrEmail = SensitivePasswordData?.usernameOrEmail ?? "";
                password.password = SensitivePasswordData?.password ?? "";
                password.note = SensitivePasswordData?.note ?? "";
                editPassword(password);
            });
            passwordDeleteBtn?.addEventListener("click", async () => {
                currentActiveDataType = "password";
                await deleteData(password.id);
            })
        })
    } else {
        const noPasswordsMessage = document.createElement("div");
        noPasswordsMessage.classList.add("z_vault__no_passwords_message");
        noPasswordsMessage.innerHTML = `
      <div class="z_vault__no_passwords_container">
        <svg xmlns="http://www.w3.org/2000/svg" class="z_vault__no_passwords_icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p class="z_vault__no_passwords_title">No Passwords Found</p>
        <p class="z_vault__no_passwords_text">It looks like you haven't added any passwords yet. Click the "<strong>&plus; Add</strong>" button to get started!</p>
      </div>
    `;
        noDataFoundElement.appendChild(noPasswordsMessage);
    }
}

const renderTexts = (texts: TextDetails[]) => {
    authFormElement.style.display = "none";
    vaultContentElement.style.display = "flex";
    passwordListElement.innerHTML = "";
    noDataFoundElement.innerHTML = "";

    if (texts.length) {
        texts.forEach(text => {
            const textListItem = document.createElement("div");
            textListItem.classList.add("z_vault__main_password_list_item");

            // Safely escape HTML in title and content
            const escapedTitle = text.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            // const escapedContent = text.content
            //     .replace(/&/g, '&amp;')
            //     .replace(/</g, '&lt;')
            //     .replace(/>/g, '&gt;');

            // Create a short preview for masked state (e.g., first 50 chars or 2 lines)
            const previewDots = "••••••••••••••••••••••••••••••••••••••••••••••••••••••";

            textListItem.innerHTML = `
      <div class="z_vault__main_password_list_card" id="mainTextCard-${text.id}">
        <div class="z_vault__main_password_list_card_content">
          <div class="z_vault__main_password_list_card_row">
            <div class="z_vault__main_password_list_card_row_left">
              <div class="z_vault__main_password_list_card_icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" style="color: rgb(96 165 250); width: 1.25rem; height: 1.25rem;">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <line x1="10" y1="9" x2="8" y2="9"></line>
                </svg>
              </div>
              <div>
                <div class="z_vault__main_password_list_card_info">
                  <h3 class="z_vault__main_password_list_card_title">
                    ${escapedTitle}
                  </h3>
                  <p class="z_vault__main_password_list_card_email">
                    Secure Text Note
                  </p>
                </div>
              </div>
            </div>
            <div class="z_vault__main_password_list_card_actions">
              <button class="z_vault__main_password_list_card_action_btn" id="seeText-${text.id}" title="View full content">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                  <path d="M340-460h280v-64H340v64Zm0 120h280v-64H340v64Zm0 120h174v-64H340v64ZM263.72-96Q234-96 213-117.15T192-168v-624q0-29.7 21.15-50.85Q234.3-864 264-864h312l192 192v504q0 29.7-21.16 50.85Q725.68-96 695.96-96H263.72ZM528-624v-168H264v624h432v-456H528ZM264-792v168-168 624-624Z"/>
                </svg>
              </button>
              <div style="position:relative;">
                <button class="z_vault__main_password_list_card_action_btn" id="editText-${text.id}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    style="width: 1.2rem; height: 1.2rem">
                    <path fill="currentColor"
                      d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2z" />
                  </svg>
                </button>
                <div class="z_vault__list_item_action_container">
                  <div class="z_vault__list_item_action" id="textEditBtn-${text.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#009fa1ff" d="m7 17.013l4.413-.015l9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583l-1.597 1.582l-1.586-1.585l1.594-1.58zM9 13.417l6.03-5.973l1.586 1.586l-6.029 5.971L9 15.006v-1.589z"/><path fill="#009fa1ff" d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"/></svg>
                    <p>Edit</p>
                  </div>
                  <div class="z_vault__list_item_action" id="textDeleteBtn-${text.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20"><path fill="#c52020" d="M8.5 4h3a1.5 1.5 0 0 0-3 0Zm-1 0a2.5 2.5 0 0 1 5 0h5a.5.5 0 0 1 0 1h-1.054l-1.194 10.344A3 3 0 0 1 12.272 18H7.728a3 3 0 0 1-2.98-2.656L3.554 5H2.5a.5.5 0 0 1 0-1h5ZM5.741 15.23A2 2 0 0 0 7.728 17h4.544a2 2 0 0 0 1.987-1.77L15.439 5H4.561l1.18 10.23ZM8.5 7.5A.5.5 0 0 1 9 8v6a.5.5 0 0 1-1 0V8a.5.5 0 0 1 .5-.5ZM12 8a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V8Z"/></svg>
                    <p>Delete</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Multi-line Sensitive Content (masked by default) -->
          <div class="z_vault__main_password_list_card_password" style="margin-top: 12px;">
            <div class="z_vault__main_password_list_card_password_row">
              <div class="z_vault__main_password_list_card_password_row_header">
                <span>Content</span>
                <div class="z_vault__main_password_list_card_password_actions">
                  <button class="z_vault__main_password_list_card_password_action_btn" id="showTextContent-${text.id}" title="Reveal / Hide">
                    <div id="textShowHideIconContainer-${text.id}">
                      <!-- Eye icon (hidden) -->
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024" style="width: 1rem; height: 1rem">
                        <path fill="currentColor" d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3c7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176s176-78.8 176-176s-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112s112 50.1 112 112s-50.1-112-112-112z" />
                      </svg>
                    </div>
                  </button>
                  <button class="z_vault__main_password_list_card_password_action_btn" id="copyTextContent-${text.id}" title="Copy to clipboard">
                    <div id="textCopyIconContainer-${text.id}">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="width: 1rem; height: 1rem">
                        <path fill="currentColor" d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
              <!-- Multi-line display with proper wrapping and line breaks -->
              <pre class="z_vault__main_password z_vault__multi_line_text" 
                   id="mainTextContent-${text.id}" 
                   data-type="dot"
                   style="white-space: pre-wrap; word-wrap: break-word; margin: 8px 0 0 0; font-family: inherit;">
${previewDots}</pre>
            </div>
          </div>

          <div class="z_vault__main_password_list_card_footer">
            <div class="z_vault__main_password_list_card_footer_label">
              ${text.category || 'Text Note'}
            </div>
          </div>
        </div>

        <!-- Back side: Full multi-line content view -->
        <div class="z_vault__main_password_list_card_content z_vault__main_password_list_card_back">
          <div class="z_vault__main_password_list_card_actions">
            <button class="z_vault__main_password_list_card_action_btn" id="backFromText-${text.id}">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                <path d="M444-53q-55-6-106.5-29.5T244-148l51-51q32 31 70 49t79 24v73Zm72 0v-73q100-14 164-87t64-174q0-110-76.5-186.5T481-650h-27l77 76-51 51-170-169 170-170 51 51-90 89h39q70 0 131 26t106.5 71.5Q763-579 789.5-518T816-387q0 131-85.5 225.5T516-53ZM198-204q-29-45-41.5-94.5T144-399h73q0 37 8 73t27 69l-54 53Zm-43-267q11-42 32.5-81t54.5-72l51 50q-23 23-38 49t-24 54h-76Z"/>
              </svg>
            </button>
          </div>
          <div class="z_vault__main_password_list_card_note" style="padding: 1.2rem; max-height: 400px; overflow-y: auto;">
            <pre id="textFullContent-${text.id}" 
                 style="margin: 0; 
                        font-family: inherit; 
                        white-space: pre-wrap; 
                        word-wrap: break-word; 
                        line-height: 1.5; 
                        font-size: 0.95rem;">
            </pre>
          </div>
        </div>
      </div>
      `;

            passwordListElement.appendChild(textListItem);

            // Element references
            const cardElement = document.getElementById(`mainTextCard-${text.id}`);
            const seeTextBtn = document.getElementById(`seeText-${text.id}`);
            const backFromTextBtn = document.getElementById(`backFromText-${text.id}`);
            const showTextBtn = document.getElementById(`showTextContent-${text.id}`);
            const copyTextBtn = document.getElementById(`copyTextContent-${text.id}`);
            const textContentElement = document.getElementById(`mainTextContent-${text.id}`) as HTMLElement;
            const textFullContentElement = document.getElementById(`textFullContent-${text.id}`) as HTMLElement;
            const showHideIconContainer = document.getElementById(`textShowHideIconContainer-${text.id}`) as HTMLDivElement;
            const copyIconContainer = document.getElementById(`textCopyIconContainer-${text.id}`) as HTMLDivElement;
            const menuBtn = document.getElementById(`editText-${text.id}`);

            // Close dropdown menus when clicking outside
            document.addEventListener("click", (event) => {
                const clickedElement = event.target as HTMLElement;
                document.querySelectorAll(".z_vault__list_item_action_container.active_menu").forEach(element => {
                    const parentContainer = element.parentElement as HTMLDivElement;
                    if (!parentContainer.contains(clickedElement)) {
                        element.classList.remove('active_menu');
                        element.previousElementSibling?.classList.remove('active');
                    }
                });
            });

            menuBtn?.addEventListener("click", (e) => {
                e.stopPropagation();
                menuBtn.classList.toggle('active');
                menuBtn?.nextElementSibling?.classList.toggle('active_menu');
            });

            // Reveal / Hide content
            showTextBtn?.addEventListener("click", () => {
                if (textContentElement.dataset.type === "dot") {
                    // textContentElement.textContent = escapedContent;
                    textContentElement.dataset.type = "text";
                    // Change to "eye closed" icon
                    showHideIconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024" style="width: 1rem; height: 1rem"><path fill="currentColor" d="M942.2 486.2Q889.4 367 810.8 285.5T648.8 186q-18.3 0-36.1 3.5T579 200q-43.5 12-82.5 37.5T431 294q-28.5 25-53.5 58T332 426q-12 20-21 40.5t-14 42.5q-5 22-5 44.5t5 44.5q5 22 14 42.5t21 40.5q14 22 32 42t40 37q22 17 48 31t57 22q31 8 64 8t64-8q31-8 57-22t48-31q22-17 40-37t32-42q12-20 21-40.5t14-42.5q5-22 5-44.5t-5-44.5q-5-22-14-42.5t-21-40.5q-14-22-32-42t-40-37q-22-17-48-31t-57-22q-31-8-64-8t-64 8q-31 8-57 22t-48 31q-22 17-40 37t-32 42q-12 20-21 40.5T365 426q-14 22-32 42t-40 37q-22 17-48 31t-57 22q-31 8-64 8t-64-8q-31-8-57-22t-48-31q-22-17-40-37t-32-42q-12-20-21-40.5T13 426q-5-22-5-44.5t5-44.5q5-22 14-42.5t21-40.5q14-22 32-42t40-37q22-17 48-31t57-22q31-8 64-8t64 8q31 8 57 22t48 31q22 17 40 37t32 42q12 20 21 40.5t14 42.5q5 22 5 44.5t-5 44.5q-5 22-14 42.5T621.8 486q-12 20-21 40.5t-14 42.5q-5 22-5 44.5t5 44.5q5 22 14 42.5t21 40.5q14 22 32 42t40 37q22 17 48 31t57 22q31 8 64 8t64-8q31-8 57-22t48-31q22-17 40-37t32-42q12-20 21-40.5t14-42.5q5-22 5-44.5t-5-44.5q-5-22-14-42.5T942.2 486Z"/></svg>`;
                } else {
                    textContentElement.textContent = previewDots;
                    textContentElement.dataset.type = "dot";
                    showHideIconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024" style="width: 1rem; height: 1rem"><path fill="currentColor" d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3c7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176s176-78.8 176-176s-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112s112 50.1 112 112s-50.1-112-112-112z" /></svg>`;
                }
            });

            // Copy full content
            copyTextBtn?.addEventListener("click", async () => {
                try {
                    await navigator.clipboard.writeText(text.content);
                    copyIconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="width: 1rem; height: 1rem"><path fill="#00c853" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`;
                    setTimeout(() => {
                        copyIconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="width: 1rem; height: 1rem"><path fill="currentColor" d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z" /></svg>`;
                    }, 1500);
                } catch (err) {
                    console.error("Copy failed:", err);
                }
            });

            // View full content (flip card)
            seeTextBtn?.addEventListener("click", () => {
                // textFullContentElement.textContent = escapedContent;
                cardElement?.classList.add("is-flipped");
            });

            backFromTextBtn?.addEventListener("click", () => {
                cardElement?.classList.remove("is-flipped");
            });
        });
    } else {
        // Same no data message as before...
        const noTextsMessage = document.createElement("div");
        noTextsMessage.classList.add("z_vault__no_passwords_message");
        noTextsMessage.innerHTML = `
      <div class="z_vault__no_passwords_container">
        <svg xmlns="http://www.w3.org/2000/svg" class="z_vault__no_passwords_icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="z_vault__no_passwords_title">No Text Notes Found</p>
        <p class="z_vault__no_passwords_text">You haven't saved any secure text notes yet. Click "<strong>+ Add</strong>" to store your first one!</p>
      </div>
    `;
        noDataFoundElement.appendChild(noTextsMessage);
    }
};

(async () => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const delayTime = 500;
    let syncAndBackupClickedBtn: "sync" | "import" | "export" = "sync";

    const isVaultFileExist = await window.electronAPI.vaultExistStatus();
    if (isVaultFileExist) {
        startupActionCardElement.style.display = "none";
        newMasterPasswordFormElement.style.display = "none";
        existingPasswordFormElement.style.display = "block";
    } else {
        startupActionCardElement.style.display = "block";
        newMasterPasswordFormElement.style.display = "none";
        existingPasswordFormElement.style.display = "none";
    }

    startupGoogleSignInBtn.addEventListener("click", async () => {
        const existingBackupResponse = await window.electronAPI.checkExistingBackup();
        if (existingBackupResponse.isBackupPresent) {
            cloudBackVaultList = existingBackupResponse.data;
            startupActionCardElement.style.display = "none";
            newMasterPasswordFormElement.style.display = "none";
            existingPasswordFormElement.style.display = "none";
            startupCloudBackupOverlayElement.style.display = "flex";
        } else {
            startupActionCardElement.style.display = "none";
            newMasterPasswordFormElement.style.display = "block";
            existingPasswordFormElement.style.display = "none";
        }
    });

    function getDaysAgo(date: string) {
        const now = new Date();
        const past = new Date(date)
        const diffTime = Math.abs(now.getTime() - past.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    function getStatusBadge(daysAgo: number) {
        if (daysAgo <= 7) {
            return { label: `${daysAgo} days ago`, class: 'recent' };
        } else if (daysAgo <= 30) {
            return { label: `${daysAgo} days ago`, class: 'moderate' };
        } else {
            return { label: `${daysAgo} days ago`, class: 'old' };
        }
    }

    function getFileSize(size: string) {
        const sizeInNumber = parseInt(size);
        if (sizeInNumber <= 0) {
            return "0 KB"
        }
        let sizeInKB = Number((sizeInNumber / 1024).toFixed(1));
        let sizeInMB = Number((sizeInKB / 1024).toFixed(1));
        let sizeInGB = Number((sizeInMB / 1024).toFixed(1));
        return sizeInGB ? sizeInGB + " GB" : sizeInMB ? sizeInMB + " MB" : sizeInKB ? sizeInKB + " KB" : "0 KB";
    }

    function selectBackup(backupId: string, backupName: string, element: HTMLDivElement) {
        console.log('selectBackup called with ID:', backupId);
        document.querySelectorAll('.z_vault__startup_cloudbackup__backup-item').forEach(item => {
            item.classList.remove('selected');
        });

        element.classList.add('selected');
        selectedBackupId = backupId;
        selectedBackupName = backupName;
        cloudBackupRestoreBtn.disabled = false;
    }

    function renderBackups(backupData: GoogleDriveFileList) {
        cloudBackupListElement.innerHTML = '';

        backupData.forEach(backup => {
            const daysAgo = getDaysAgo(backup.createdTime!);
            const status = getStatusBadge(daysAgo);
            const fileSize = getFileSize(backup.size!);

            const backupItem = document.createElement('div');
            backupItem.className = 'z_vault__startup_cloudbackup__backup-item';
            backupItem.dataset.backupId = backup.id!;

            backupItem.innerHTML = `
                    <div class="z_vault__startup_cloudbackup__backup-icon">💾</div>
                    <div class="z_vault__startup_cloudbackup__backup-info">
                        <div class="z_vault__startup_cloudbackup__backup-name">${backup.name}</div>
                        <div class="z_vault__startup_cloudbackup__backup-date">${fileSize}</div>
                    </div>
                    <div class="z_vault__startup_cloudbackup__backup-status">
                        <span class="z_vault__startup_cloudbackup__backup-status-badge ${status.class}">${status.label}</span>
                    </div>
                    <div class="z_vault__startup_cloudbackup__backup-checkbox"></div>
                `;
            backupItem.addEventListener("click", () => {
                selectBackup(backup.id!, backup.name!, backupItem);
            });
            cloudBackupListElement.appendChild(backupItem);
        });
    }

    cloudBackupSkipBtn.addEventListener("click", () => {
        
    })

    cloudBackupImportBtn.addEventListener("click", () => {
        cloudBackupInitialViewElement.classList.add("hidden");
        cloudBackupListViewElement.classList.add("active");
        renderBackups(cloudBackVaultList);
    });

    cloudBackupBackBtn.addEventListener("click", () => {
        cloudBackupInitialViewElement.classList.remove("hidden");
        cloudBackupListViewElement.classList.remove("active");
    });

    cloudBackupRestoreSkipBtn.addEventListener("click", () => {
        cloudBackupInitialViewElement.classList.remove("hidden");
        cloudBackupListViewElement.classList.remove("active");
    });

    cloudBackupRestoreBtn.addEventListener("click", async () => {
        const openCloudBackupResponse = await window.electronAPI.openCloudBackup(selectedBackupId, selectedBackupName);
        console.log(openCloudBackupResponse);
        if (openCloudBackupResponse.success) {
            startupCloudBackupOverlayElement.style.display = "none";
            cloudBackupInitialViewElement.classList.add("hidden");
            cloudBackupListViewElement.classList.add("hidden");
            startupActionCardElement.style.display = "none";
            newMasterPasswordFormElement.style.display = "none";
            existingPasswordFormElement.style.display = "block";
        } else {
            startupCloudBackupOverlayElement.style.display = "none";
            cloudBackupInitialViewElement.classList.add("hidden");
            cloudBackupListViewElement.classList.add("hidden");
            startupActionCardElement.style.display = "block";
            newMasterPasswordFormElement.style.display = "none";
            existingPasswordFormElement.style.display = "none";
        }
    })

    localBackupSelectBtn.addEventListener("click", async () => {
        const localBackupResponse = await window.electronAPI.openLocalBackup();
        if (localBackupResponse.success) {
            startupActionCardElement.style.display = "none";
            newMasterPasswordFormElement.style.display = "none";
            existingPasswordFormElement.style.display = "block";
        } else {
            startupActionCardElement.style.display = "block";
            newMasterPasswordFormElement.style.display = "none";
            existingPasswordFormElement.style.display = "none";
        }
    });

    startNewVaultBtn.addEventListener("click", async () => {
        startupActionCardElement.style.display = "none";
        newMasterPasswordFormElement.style.display = "block";
        existingPasswordFormElement.style.display = "none";
    });
    // const isVaultFileExist = await window.electronAPI.vaultExistStatus();
    // console.log({ isVaultFileExist });
    // if (isVaultFileExist) {
    //     existingPasswordFormElement.style.display = "block"
    //     existingPasswordFormElement.classList.add("animate__bounceInRight");
    // } else {
    //     newMasterPasswordFormElement.style.display = "block";
    //     newMasterPasswordFormElement.classList.add("animate__bounceInRight");
    // }
    // ===================
    // newVaultCreationBtn.addEventListener("click", () => {
    //   existingPasswordFormElement.classList.remove("animate__bounceInRight")
    //   existingPasswordFormElement.classList.add("animate__fadeOutLeft");
    //   newMasterPasswordFormElement.classList.remove("animate__fadeOutLeft");
    //   newMasterPasswordFormElement.classList.add("animate__bounceInRight");
    // })
    // existingVaultUnlockBtn.addEventListener("click", () => {
    //   newMasterPasswordFormElement.classList.remove("animate__bounceInRight");
    //   newMasterPasswordFormElement.classList.add("animate__fadeOutLeft");
    //   existingPasswordFormElement.classList.remove("animate__fadeOutLeft");
    //   existingPasswordFormElement.classList.add("animate__bounceInRight");
    // });

    // existingPasswordFormElement.addEventListener("animationend", startUpFormAnimation);
    // newMasterPasswordFormElement.addEventListener("animationend", startUpFormAnimation);

    existingMasterPasswordStateChangeBtn.addEventListener("click", (event) => {
        event.preventDefault();
        if (existingMasterPasswordInput.type === "password") {
            existingMasterPasswordInput.type = "text";
            existingFormInputEyeOpenSvg.style.display = "block"
            existingFormInputEyeCloseSvg.style.display = "none"
        } else {
            existingMasterPasswordInput.type = "password";
            existingFormInputEyeOpenSvg.style.display = "none"
            existingFormInputEyeCloseSvg.style.display = "block"
        }
    });

    createMasterPasswordStateChangeBtn.addEventListener("click", (event) => {
        event.preventDefault();
        if (createMasterPasswordInput.type === "password") {
            createMasterPasswordInput.type = "text";
            newFormInputEyeOpenSvg.style.display = "block";
            newFormInputEyeCloseSvg.style.display = "none"
        } else {
            createMasterPasswordInput.type = "password";
            newFormInputEyeOpenSvg.style.display = "none";
            newFormInputEyeCloseSvg.style.display = "block"
        }
    });

    confirmMasterPasswordStateChangeBtn.addEventListener("click", (event) => {
        event.preventDefault();
        if (confirmMasterPasswordInput.type === "password") {
            confirmMasterPasswordInput.type = "text";
            newFormConfirmInputEyeOpenSvg.style.display = "block";
            newFormConfirmInputEyeCloseSvg.style.display = "none";
        } else {
            confirmMasterPasswordInput.type = "password";
            newFormConfirmInputEyeOpenSvg.style.display = "none";
            newFormConfirmInputEyeCloseSvg.style.display = "block";
        }
    });

    createMasterPasswordInput.addEventListener("input", (event) => {
        const targetInput = event.target as HTMLInputElement;
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            const isValidPassword = validateMasterPassword(targetInput.value);
            if (isValidPassword && (confirmMasterPasswordInput.value === targetInput.value)) {
                newVaultCreationBtn.removeAttribute("disabled");
                masterPasswordNotMatchElement.style.display = "none";
            } else if (confirmMasterPasswordInput.value.length && (confirmMasterPasswordInput.value !== targetInput.value)) {
                newVaultCreationBtn.setAttribute("disabled", "true");
                masterPasswordNotMatchElement.style.display = "block";
            } else {
                newVaultCreationBtn.setAttribute("disabled", "true");
            }
        }, delayTime);
    });

    confirmMasterPasswordInput.addEventListener("input", (event) => {
        const targetInput = event.target as HTMLInputElement;
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            if (createMasterPasswordInput.value.length) {
                if (createMasterPasswordInput.value === targetInput.value) {
                    newVaultCreationBtn.removeAttribute("disabled");
                    masterPasswordNotMatchElement.style.display = "none";
                } else {
                    newVaultCreationBtn.setAttribute("disabled", "true");
                    masterPasswordNotMatchElement.style.display = "block";
                }
            }
        }, delayTime);
    })

    newVaultCreationBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        const masterPassword = createMasterPasswordInput.value;
        const vaultData: ResponsePayload = await window.electronAPI.createNewVault(masterPassword);
        renderDataItems(vaultData);
        await renderPagination(vaultData.totalEntries);
    });

    existingVaultUnlockBtn.addEventListener("click", async (event) => {
        try {
            event.preventDefault();
            const masterPassword = existingMasterPasswordInput.value;
            const vaultData: ResponsePayload = await window.electronAPI.unlockVault(masterPassword);
            console.log(vaultData);
            renderDataItems(vaultData)
            await renderPagination(vaultData.totalEntries);
        } catch (error) {
            console.log(error);
            throw new Error("Need to show error message");
        }
    });

    addDataBtn.addEventListener("click", () => {
        resetInputElements([passwordFormServiceInput,
            passwordFormNameOrEmailInput,
            passwordFormPasswordInput,
            passwordFormCategorySelect,
            passwordFormUrlInput,
            passwordFormNoteInput,
            textFormTitleInput,
            textFormCategorySelect,
            textFormNoteTextarea,
        ]);
        addModalBackdrop.classList.add('z_vault__open');
        addModal.classList.add('z_vault__open');
        modifyingStatus = "creating";
        validatePasswordDetailsOnBlur();
    });

    modalCloseBtn.addEventListener("click", () => {
        addModalBackdrop.classList.remove('z_vault__open');
        addModal.classList.remove('z_vault__open');
    });

    popUpFromSaveBtn.addEventListener("click", async () => {
        let result: ResponsePayload;
        if (currentActiveDataType === "password") {
            const title = passwordFormServiceInput.value;
            const usernameOrEmail = passwordFormNameOrEmailInput.value;
            const password = passwordFormPasswordInput.value;
            const category = passwordFormCategorySelect.value;
            const url = passwordFormUrlInput.value;
            const note = passwordFormNoteInput.value;
            let passwordDetails: NewPassword = {
                title,
                usernameOrEmail,
                password,
                category,
                url,
                note,
                type: "password"
            }
            console.log(passwordDetails);

            const isValidDetails = validatePasswordDetails(passwordDetails);
            if (!isValidDetails) {
                throw new Error("Need to show error at- popUpFromSaveBtn");
            }
            if (modifyingStatus === "creating") {
                result = await window.electronAPI.addNewData(passwordDetails, currentPageNum, pageSize);
            } else if (modifyingStatus === "updating" && currentUpdatingData?.type === "password") {
                let updatedPasswordDetails: PasswordDetails = {
                    id: currentUpdatingData.id,
                    icon_hint: currentUpdatingData.icon_hint,
                    is_favorite: currentUpdatingData.is_favorite,
                    last_modified: currentUpdatingData.last_modified,
                    ...passwordDetails
                }
                result = await window.electronAPI.editData(updatedPasswordDetails, currentPageNum, pageSize);
            } else {
                throw new Error("Need to show error at popUpFromSaveBtn");
            }
        } else {
            const title = textFormTitleInput.value;
            const category = textFormCategorySelect.value;
            const content = textFormNoteTextarea.value;
            const textDetails: NewText = {
                title,
                category,
                content,
                type: "text"
            }
            // need to add validation of the data
            if (modifyingStatus === "creating") {
                result = await window.electronAPI.addNewData(textDetails, currentPageNum, pageSize);
                console.log(result);
            } else if (modifyingStatus === "updating" && currentUpdatingData?.type === "text") {
                let updatedTextDetails: TextDetails = {
                    id: currentUpdatingData.id,
                    is_favorite: currentUpdatingData.is_favorite,
                    last_modified: currentUpdatingData.last_modified,
                    ...textDetails
                }
                result = await window.electronAPI.editData(updatedTextDetails, currentPageNum, pageSize);
            } else {
                throw new Error("Need to show error at popUpFromSaveBtn");
            }
        }
        renderDataItems(result);
        await renderPagination(result.totalEntries);
    });

    popUpFormCancelBtn.addEventListener("click", () => {
        addModalBackdrop.style.display = "none";
    });

    passwordGeneratorSliderInput.addEventListener("input", (event) => {
        passwordGeneratorSliderInputLabel.innerText = `Password Length: ${passwordGeneratorSliderInput.value}`
    });

    passwordGeneratorBtn.addEventListener("click", () => {
        const passwordLength = Number(passwordGeneratorSliderInput.value);
        generatedPasswordContainerEle.innerText = generatePassword(passwordLength);
    });

    sidebarMenuItems.forEach(span => {
        span.addEventListener("click", async (_event) => {
            let result: ResponsePayload;
            let dataItem = (_event.target as HTMLSpanElement).dataset.item;
            currentPageNum = 1;
            if (dataItem === "menuPassword") {
                currentActiveDataType = "password";
                result = await window.electronAPI.fetchData(currentActiveDataType, currentPageNum, pageSize);
            } else {
                currentActiveDataType = "text";
                result = await window.electronAPI.fetchData(currentActiveDataType, currentPageNum, pageSize);
            }
            renderDataItems(result);
            await renderPagination(result.totalEntries);
        });
    });

    sidebarMenuBottomItemSettings.addEventListener("click", () => {
        settingsPanelModalBackdropElement.classList.add("z_vault__open");
        settingsPanelModal.classList.add("z_vault__open");
    });

    settingsPanelModalCloseBtn.addEventListener("click", () => {
        settingsPanelModalBackdropElement.classList.remove("z_vault__open");
        settingsPanelModal.classList.remove("z_vault__open");
    });

    settingsPanelModalBackdropElement.addEventListener("click", (_event) => {
        if (_event.target === settingsPanelModalBackdropElement) {
            settingsPanelModalBackdropElement.classList.remove("z_vault__open");
            settingsPanelModal.classList.remove("z_vault__open");
        }
    });

    settingsPanelSidebarItemElement.forEach(item => {
        item.addEventListener("click", () => {
            document.querySelectorAll('.z_vault__settings_panel_sidebar-item').forEach(i => i.classList.remove('z_vault__active'));
            document.querySelectorAll('.z_vault__settings_panel_section').forEach(s => s.classList.remove('z_vault__active'));
            item.classList.add('z_vault__active');
            const sectionId = item.dataset.section ?? "";
            document.getElementById(sectionId)?.classList.add('z_vault__active');
        });
    });

    settingsPanelGoogleDriveBackupBtn.addEventListener("click", async () => {
        // dataSyncPasswordSubmitBtn.innerText = "Sync";
        // syncAndBackupClickedBtn = "sync";
        settingsPanelGoogleDriveBackupBtn.disabled = true;
        const backupResponse = await window.electronAPI.backupToDrive();
        settingsPanelGoogleDriveBackupBtn.disabled = false;
        console.log(backupResponse);
        if (backupResponse.success) {
        } else {

        }
        // dataSyncModalElement.classList.add("active");
        // dataSyncModalPasswordInput.focus();
    });

    settingsPanelDataExportBtn.addEventListener("click", async () => {
        const exportResponse = await window.electronAPI.exportVault();
        console.log(exportResponse);
    })

    const handelDataSyncError = (message: string) => {
        dataSyncModalError.textContent = message;
        dataSyncModalError.classList.add("visible");
        dataSyncModalPasswordInput.classList.add("z_vault__data_sync__shake");
        dataSyncModalPasswordInput.focus();
        dataSyncModalPasswordInput.select();
        setTimeout(() => {
            dataSyncModalPasswordInput.classList.remove("z_vault__data_sync__shake");
        }, 500);
    }

    // const onSyncData = async (passwordValue: string) => {
    //     const connectionResponse = await window.electronAPI.connectToCloud("googleDrive", passwordValue);
    //     console.log(connectionResponse);

    //     if (connectionResponse.success) {
    //         dataSyncModalElement.classList.remove("active");
    //         // settingsPanelGoogleDriveBackupBtn.setAttribute("disabled", "");
    //         settingsPanelGoogleDriveBackupBtn.disabled = true;
    //         settingsPanelGoogleDriveBackupBtn.classList.remove("z_vault__settings_panel_btn-primary");
    //         settingsPanelGoogleDriveBackupBtn.textContent = "Sync Successful"
    //     }
    // }

    const onImportBackup = async (passwordValue: string) => {
        const importBackupResponse = await window.electronAPI.importBackup(passwordValue);
        console.log(importBackupResponse);

    }


    // dataSyncPasswordSubmitBtn.addEventListener("click", async () => {
    //     const passwordValue = dataSyncModalPasswordInput.value.trim();
    //     if (!passwordValue) {
    //         handelDataSyncError("Master password is required");
    //     }
    //     switch (syncAndBackupClickedBtn) {
    //         case "sync":
    //             await onSyncData(passwordValue);
    //             break;
    //         case "import":
    //             await onImportBackup(passwordValue);
    //             break;
    //         case "export":
    //             break;
    //         default:
    //             break;
    //     }
    // });

    dataSyncPasswordCancelBtn.addEventListener("click", () => {
        dataSyncModalElement.classList.remove("active");
    });

    // settingsPanelDataImportBtn.addEventListener("click", () => {
    //     dataSyncPasswordSubmitBtn.innerText = "Import";
    //     syncAndBackupClickedBtn = "import";
    //     dataSyncModalElement.classList.add("active");
    //     dataSyncModalPasswordInput.focus();
    // });

    passwordFormTabGroupBtn.forEach(tabBtn => {
        tabBtn.addEventListener("click", () => {
            popupFormBottomBtnGroupElement.style.display = "flex";
            passwordFormTabGroupBtn.forEach(btn => btn.removeAttribute('data-state'));
            tabBtn.setAttribute('data-state', 'active');
            const type = tabBtn.getAttribute('data-type');
            addModalAllFormElement.forEach(form => form.style.display = 'none');
            if (type === 'password') addDataModalPasswordForm.style.display = 'block';
            if (type === 'text') addDataModalTextForm.style.display = 'block';
            if (type === 'generate') {
                popupFormBottomBtnGroupElement.style.display = "none";
                addDataModalPasswordGeneratorForm.style.display = 'block'
            };
        })
    });

})();