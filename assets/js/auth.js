document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const registerButton = document.getElementById("register-btn");

    if (registerButton) {
        if (loggedInUser) {
            registerButton.textContent = loggedInUser.name;
            //logout functionality if clicked on button
            registerButton.addEventListener("click", () => {
                // Confirm logout
                const confirmLogout = confirm("Are you sure you want to log out?");
                if (confirmLogout) {
                    
                    localStorage.removeItem("loggedInUser"); // Remove logged-in user

                    registerButton.textContent = "+ Register"; // Reset button text

                    registerButton.setAttribute("href", "register.html"); // Redirect to registration page
                    alert("You have been logged out.");
                }
            });
        } else {
            // If not logged in, ensure the button redirects to the registration page
            registerButton.textContent = "+ Register";
            registerButton.setAttribute("href", "register.html");
        }
    }
});
