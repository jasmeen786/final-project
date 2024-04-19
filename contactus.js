// JavaScript Code
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting

        // Perform form validation (e.g., checking if all fields are filled in)
        if (form.checkValidity()) {
            alert('Form submitted successfully!');

            // Optionally, you can reset the form after submission
            form.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
});
