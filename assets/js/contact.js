document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.querySelector('input[name="name"]').value.trim();
  const email = document.querySelector('input[name="mail"]').value.trim();
  const phone = document.querySelector('input[name="phone_num"]').value.trim();
  const subject = document.querySelector('input[name="sub"]').value.trim();
  const message = document
    .querySelector('textarea[name="messge"]')
    .value.trim();

  // Validation Patterns
  const namePattern = /^[a-zA-Z\s]{3,}$/; // Only letters, at least 3 characters
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Standard email format
  const phonePattern = /^\d{10,15}$/; // Only numbers, 10 to 15 digits
  const subjectPattern = /^.{3,}$/; // At least 3 characters
  const messagePattern = /^.{5,}$/; // At least 5 characters

  // Validation Messages
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const subjectError = document.getElementById("subjectError");
  const messageError = document.getElementById("messageError");

  // Reset messages
  nameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";
  subjectError.textContent = "";
  messageError.textContent = "";

  let isValid = true;

  // Validate Name
  if (!namePattern.test(name)) {
    nameError.textContent = "Name must be at least 3 letters.";
    isValid = false;
  }

  // Validate Email
  if (!emailPattern.test(email)) {
    emailError.textContent = "Enter a valid email address.";
    isValid = false;
  }

  // Validate Phone
  if (!phonePattern.test(phone)) {
    phoneError.textContent = "Phone must be 10 to 15 digits.";
    isValid = false;
  }

  // Validate Subject
  if (!subjectPattern.test(subject)) {
    subjectError.textContent = "Subject must be at least 3 characters.";
    isValid = false;
  }

  // Validate Message
  if (!messagePattern.test(message)) {
    messageError.textContent = "Message must be at least 5 characters.";
    isValid = false;
  }

  // If all fields are valid, submit the form
  if (isValid) {
    const successMessage = document.createElement("div");
    successMessage.textContent = "Form submitted successfully!";
    successMessage.className = "success";
    document.querySelector(".contact-form").appendChild(successMessage);

    // this.submit();
  }
});
