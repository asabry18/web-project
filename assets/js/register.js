document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('signup-form');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const messageContainer = document.createElement('p');
    messageContainer.classList.add('form-message');
    form.appendChild(messageContainer);

    form.addEventListener("submit", function (event) {
        let valid = true;

        clearErrorStyles([name, email, password, confirmPassword]);
        messageContainer.textContent = ""; // Clear previous messages

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

        if (valid) {
            const users = JSON.parse(localStorage.getItem("users")) || [];

            // Check if the user is already registered
            const isRegistered = users.some(user => user.email === email.value);

            if (isRegistered) {
                messageContainer.textContent = "You are already registered. Please log in.";
                messageContainer.classList.add('error-message');
            } else {
                users.push({ name: name.value, email: email.value, password: password.value });
                localStorage.setItem("users", JSON.stringify(users));

                messageContainer.textContent = "Registration successful! Redirecting to login page...";
                messageContainer.classList.add('success-message');

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2000);
            }
        }

        event.preventDefault(); 
    });

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
            const errorMessages = input.parentNode.querySelectorAll('.error-message');
            errorMessages.forEach(msg => msg.remove());
        });
    }
});
