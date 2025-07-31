// Select the checkbox or switch element by its ID
const taxSwitch = document.getElementById('switchCheckDefault');

// Add a click event listener to toggle tax info visibility
taxSwitch.addEventListener('click', () => {
    // Get all elements with the class "tax-info"
    let taxInfo = document.getElementsByClassName('tax-info');

    // Loop through each of those elements
    for (let info of taxInfo) {
        // If the element is currently hidden or not inline, show it
        if (info.style.display !== "inline") {
            info.style.display = 'inline';
        } else {
            // Otherwise, hide it
            info.style.display = 'none';
        }
    }
});
