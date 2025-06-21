const logo = document.querySelector('.user-dropdown-logo');
const dropdown = document.querySelector('.user-dropdown-menu');

document.addEventListener('click', (e) => {
    if (logo.contains(e.target)) {
        dropdown.classList.toggle('active');
    } else {
        dropdown.classList.remove('active');
    }
});