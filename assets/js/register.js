document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('signup-form');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');

    form.addEventListener("submit", function (event) {
        let valid = true;

        clearErrorStyles([name, email, password, confirmPassword]);

        if (name.value.trim() === "") {
            showError(name, "Please enter your name.");
            valid = false;
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email.value)) {
            showError(email, "Please enter a valid email.");
            valid = false;
        }

        if (password.value.length < 6) {
            showError(password, "Password must be at least 6 characters.");
            valid = false;
        }

        if (password.value !== confirmPassword.value) {
            showError(confirmPassword, "Passwords do not match.");
            valid = false;
        }

        if (!valid) {
            event.preventDefault();
        }
    });

    // Function to show error styles and message
    function showError(inputElement, message) {
        inputElement.classList.add('error');
        
        const errorMessage = document.createElement('span');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = message;

        inputElement.parentNode.appendChild(errorMessage);
    }

    function clearErrorStyles(inputElements) {
        inputElements.forEach(input => {
            input.classList.remove('error');
        });
    }
});
