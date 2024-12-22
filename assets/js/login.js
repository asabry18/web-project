document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".login-form");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let valid = true;


        if (email.value === "") {
            showError(email, "Please enter your email.");
            valid = false;
        }

        if (password.value === "") {
            showError(password, "Please enter your password.");
            valid = false;
        }

        if (!valid) return;

        // Check user in localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const foundUser = users.find(user => user.email === email.value);

        if (foundUser) {
            if (foundUser.password === password.value) {
                const loggedInUser = {
                    name: foundUser.name,
                    email: foundUser.email,
                };
                localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

                window.location.href = "home.html";
            } else {
                showError(password, "Incorrect password.");
            }
        } else {
            showError(email, "No account found with this email.");
        }
    });

    function showError(inputElement, message) {
        const errorMessage = document.createElement("p");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = message;

        inputElement.parentNode.appendChild(errorMessage);
    }

});
