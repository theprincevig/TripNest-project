// Select the "Show more" button using its ID
const button = document.getElementById('show-more');

// This flag tracks whether the reviews section is currently open or closed
let isOpen = false;

// Add a click event listener to the button
button.addEventListener('click', () => {
    // Select the reviews container element
    const reviews = document.querySelector('.show-reviews');

    if (!isOpen) {
        // If reviews are not open, show them by adding the 'open' class
        reviews.classList.add('open');

        // Change button text to indicate the user can now "Show less"
        button.textContent = "...Show less";

        // Set the flag to true, indicating the section is open
        isOpen = true;
    } else {
        // If reviews are open, hide them by removing the 'open' class
        reviews.classList.remove('open');

        // Change button text to allow showing more again
        button.textContent = "...Show more";

        // Set the flag to false, indicating the section is closed
        isOpen = false;
    }
});
