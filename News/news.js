document.addEventListener("DOMContentLoaded", function () {
    var datePicker = document.getElementById('datepicker');
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');

    // Set default date to today
    var today = new Date();
    datePicker.valueAsDate = today;

    // Function to add or subtract days from the current date
    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    // Function to fetch news by date
    function fetchNewsByDate(selectedDate) {
        const apiUrl = `https://calquan.com:85/api/Portal/GetNews/${selectedDate}/3`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displayNews(data.Data);
                if (data.Data.length > 0) {
                    loadNews(data.Data[0].xLinkAdd);
                }
            })
            .catch(error => {
                console.error('There was a problem with fetching news:', error);
            });
    }

    function displayNews(newsData) {
        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = '';

        newsData.forEach(newsItem => {
            const newsItemElement = document.createElement('div');
            newsItemElement.innerHTML = `
        <div class="card mb-2 " id="card-box">
            <div class="card-body1">
                <h5 class="card-title" data-url="${newsItem.xLinkAdd}">${newsItem.xTitle}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${newsItem.xSubTitle}</h6>
            </div>
        </div>
    `;
            newsContainer.appendChild(newsItemElement);
        });
        // Add event listener to the news container for click events
        newsContainer.addEventListener('click', function (event) {
            // Check if the clicked element has the class 'card-title'
            if (event.target.classList.contains('card-title')) {
                // Get the URL from the data attribute or any other attribute if available
                const newsUrl = event.target.getAttribute('data-url');
                if (newsUrl) {
                    // Call the loadNews function with the URL
                    loadNews(newsUrl);
                }
            }
        });
    }
    // Function to load news in the object tag or open in a new browser window
    function loadNews(newsUrl) {
        const selectedNewsContainer = document.getElementById('selected-news');
        selectedNewsContainer.innerHTML = ''; // Clear previous content
    
        if (isWebsiteRestricted(newsUrl)) {
            window.open(newsUrl, '_blank'); // Open restricted website in a new window
        } else {
            const newsObject = document.createElement('object');
            newsObject.setAttribute('data', newsUrl);
            newsObject.setAttribute('type', 'text/html');
    
            // Set onload event handler
            newsObject.onload = function() {
                console.log("Content loaded successfully.");
// Check if the screen width is less than a certain threshold (e.g., 768 pixels for small screens)
if (window.innerWidth < 768) {
    document.getElementById('selected-news').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
            };
    
            // Set onerror event handler
            newsObject.onerror = function() {
                console.log("Error loading content. Opening in a new browser window.");
                window.open(newsUrl, '_blank');
            };
    
            selectedNewsContainer.appendChild(newsObject);
        }
    }
    
    

    // Function to check if a website is restricted
    function isWebsiteRestricted(url) {
        return false; // Placeholder logic, replace with your own
    }

    // Function to handle date picker change event
    datePicker.addEventListener('change', function () {
        var selectedDate = datePicker.valueAsDate;
        fetchNewsByDate(formatDate(selectedDate));
    });

    // Event listener for previous button
    prevBtn.addEventListener('click', function () {
        var currentDate = datePicker.valueAsDate;
        var newDate = addDays(currentDate, -1);
        datePicker.valueAsDate = newDate;
        fetchNewsByDate(formatDate(newDate));
    });

    // Event listener for next button
    nextBtn.addEventListener('click', function () {
        var currentDate = datePicker.valueAsDate;
        var newDate = addDays(currentDate, 1);
        datePicker.valueAsDate = newDate;
        fetchNewsByDate(formatDate(newDate));
    });

    // Format date as yyyymmdd
    function formatDate(date) {
        var yyyy = date.getFullYear();
        var mm = String(date.getMonth() + 1).padStart(2, '0');
        var dd = String(date.getDate()).padStart(2, '0');
        return yyyy + mm + dd;
    }

    // Initially fetch and display news for today
    fetchNewsByDate(formatDate(today));

    // Function to adjust date picker size based on screen width
    function adjustDatePickerSize() {
        if (window.innerWidth <= 576) { // Adjust the screen width threshold as needed
            datePicker.classList.add('small-datepicker');
        } else {
            datePicker.classList.remove('small-datepicker');
        }
    }

    // Initial adjustment on page load
    adjustDatePickerSize();

    // Listen for window resize events and adjust date picker size accordingly
    window.addEventListener('resize', adjustDatePickerSize);
});

