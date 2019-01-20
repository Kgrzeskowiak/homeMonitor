class ErrorHandler {
    constructor(root) {
        this.root = root
        this.errorActive = false
        this.navBar = document.querySelector("[data-name='navbarMain")
    }

    showError(errorMessage, errorDetails) {
        if (!this.errorActive) {
            this.clearPage()
            var template = document.querySelector("#ErrorPlaceholder")
            var templateClone = document.importNode(template.content, true);
            this.root.appendChild(templateClone);
            this.navBar.classList.add("invisible")
            var errorElement = document.querySelector("[data-name='errorMessage']")
            var detailsElement = document.querySelector("[data-name='errorDetails']")
            errorElement.innerHTML = errorMessage
            detailsElement.innerHTML = errorDetails
            this.errorActive = true;
        }
    }

    clearPage() {
        {
            while (this.root.firstElementChild) {
                this.root.firstElementChild.remove();
            }
            this.navBar.classList.remove("invisible")
            this.errorActive = false;
        }
    }
}