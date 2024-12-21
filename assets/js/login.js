
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('.login-form');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const messageContainer = document.createElement('p');
    messageContainer.classList.add('form-message');
    form.appendChild(messageContainer);

    form.addEventListener("submit", function (event) {
        clearErrorStyles([email, password]);
        messageContainer.textContent = "";

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email.value)) {
            showError(email, "Please enter a valid email.");
            event.preventDefault();
            return;
        }

        if (password.value.trim() === "") {
            showError(password, "Password cannot be empty.");
            event.preventDefault();
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(user => user.email === email.value && user.password === password.value);

        if (user) {
            messageContainer.textContent = "Login successful! Redirecting to the home page...";
            messageContainer.classList.add('success-message');
            setTimeout(() => {
                window.location.href = "../pages/home.html";
            }, 2000);
        } else {
            messageContainer.textContent = "Invalid email or password. Please try again.";
            messageContainer.classList.add('error-message');
            event.preventDefault();
        }
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
