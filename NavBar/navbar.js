document.addEventListener('DOMContentLoaded', function() {
    // Load navbar
    fetch('/NavBar/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('body').insertAdjacentHTML('afterbegin', data);
        });
    // Load footer
    fetch('/NavBar/footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('body').insertAdjacentHTML('beforeend', data);
        });
});

