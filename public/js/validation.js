// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict"; // Enforce stricter parsing and error handling in JavaScript

  // Select all forms that require custom Bootstrap validation
  const forms = document.querySelectorAll(".needs-validation");

  // Convert NodeList to an array and loop through each form
  Array.from(forms).forEach((form) => {
    // Add a 'submit' event listener to each form
    form.addEventListener("submit", (e) => {
      // If form fields are invalid (fails HTML5 validation)
      if (!form.checkValidity()) {
        e.preventDefault();       // Prevent form from submitting
        e.stopPropagation();      // Stop the event from bubbling further
      }

      // Add Bootstrap class to visually indicate validation status
      form.classList.add("was-validated");
    }, false);
  });
})();
