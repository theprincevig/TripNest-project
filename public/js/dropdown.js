// Select the user icon element (the clickable avatar for dropdown)
const logo = document.querySelector('.user-dropdown-logo');

// Select the dropdown menu element that appears when user icon is clicked
const dropdown = document.querySelector('.user-dropdown-menu');

// Add a click event listener to the entire document
document.addEventListener('click', (e) => {
    // Check if the clicked element is inside the user icon
    if (logo.contains(e.target)) {
        // Toggle the dropdown visibility
        dropdown.classList.toggle('active');
    } else {
        // If clicked outside the user icon, close the dropdown
        dropdown.classList.remove('active');
    }
});
