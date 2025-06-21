const button = document.getElementById('show-more');

let isOpen = false;

button.addEventListener('click', () => {
    const reviews = document.querySelector('.show-reviews');
    if (!isOpen) {
        reviews.classList.add('open');
        button.textContent = "...Show less";
        isOpen = true;

    } else {
        reviews.classList.remove('open');
        button.textContent = "...Show more";
        isOpen = false;
    }
});