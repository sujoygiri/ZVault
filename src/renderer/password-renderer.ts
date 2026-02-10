document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const errorDiv = document.getElementById('error') as HTMLDivElement;
    const submitBtn = document.getElementById('submit') as HTMLButtonElement;
    const cancelBtn = document.getElementById('cancel') as HTMLButtonElement;

    window.electronAPI.cloudSyncPasswordError((errorMessage) => {
        errorDiv.textContent = errorMessage;
        passwordInput.focus();
        passwordInput.select();
    });

    submitBtn.addEventListener('click', () => {
        const password = passwordInput.value.trim();
        if (password) {
            window.electronAPI.cloudSyncPasswordSubmit(password);
        } else {
            errorDiv.textContent = 'Password cannot be empty';
        }
    });

    cancelBtn.addEventListener('click', () => {
        window.electronAPI.cloudSyncPasswordCancel();
    });

    passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitBtn.click();
            }
        });
});