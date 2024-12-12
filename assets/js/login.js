document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('.login-form');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const emailError = document.getElementById('emailError');

    form.addEventListener("submit", function (event) {
        let valid = true;

        clearErrorStyles([email, password]);

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email.value)) {
            showError(email, emailError, "Please enter a valid email.");
            valid = false;
        }

        if (password.value.trim() === "") {
            showError(password, null, "Password cannot be empty.");
            valid = false;
        }

        if (!valid) {
            event.preventDefault();
        }
    });

    function showError(inputElement, errorElement = null, message = "") {
        inputElement.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
        } else {

            const errorMessage = document.createElement('p');
            errorMessage.textContent = message;
            errorMessage.classList.add('error-message');
            inputElement.parentNode.appendChild(errorMessage);
        }
    }

    function clearErrorStyles(inputElements) {
        inputElements.forEach(input => {
            input.classList.remove('error');
        });
    }
});
