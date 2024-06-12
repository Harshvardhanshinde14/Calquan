function displayReviewInDiv(review) {
    const reviewDisplay = document.getElementById('displayreview');
    reviewDisplay.innerHTML = '';

    const imageUrl = `https://calquan.com:85/api/Image/DownLoadImage/ReviewerPhoto/${review.xPhotoName}`;
    reviewDisplay.innerHTML = `
        <div class="container">
            <h2>${review.xTitle}</h2>
            <img src="${imageUrl}" alt="Reviewer Photo" class="img-fluid mb-3">
            <h3>${review.xSubTitle}</h3>
            <p>${review.xDescription}</p>
            <p>Date: ${review.xDate}</p>
            <p>Company: ${review.xCompanyName}</p>
        </div>
    `;

    reviewDisplay.style.display = 'block';
}

function fetchReviewsAndDisplayFirst() {
    fetch('https://calquan.com:85/api/Portal/GetReviews1/10')
        .then(response => response.json())
        .then(data => {
            displayReviews(data.Data); // Refresh reviews
            if (data.Data.length > 0) {
                displayReviewInDiv(data.Data[0]); // Display the first review from the new data
            }
        })
        .catch(error => {
            console.error('Error fetching more reviews:', error);
        });
}

function fetchMoreReviewsAndDisplayFirst() {
    fetch('http://103.14.99.54:85/api/Portal/GetReviews1/10')
        .then(response => response.json())
        .then(data => {
            displayReviews(data.Data); // Refresh reviews
            if (data.Data.length > 0) {
                displayReviewInDiv(data.Data[0]); // Display the first review from the new data
            }
        })
        .catch(error => {
            console.error('Error fetching more reviews:', error);
        });
}

function displayReviews(reviews) {
    const reviewsContainer = document.getElementById('reviewsContainer');
    reviewsContainer.innerHTML = '';

    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('card1', 'mb-3');

        reviewElement.innerHTML = `
            <div class="card-body1">
                <a><h5 class="card-title reviewTitle" data-review='${JSON.stringify(review)}'>${review.xTitle}</h5></a>
                <p class="card-text">${review.xCompanyName}</p>
            </div>
        `;

        reviewElement.querySelector('.reviewTitle').addEventListener('click', () => {
            displayReviewInDiv(review);
        });

        reviewsContainer.appendChild(reviewElement);
    });
}

document.getElementById('moreLink').addEventListener('click', fetchMoreReviewsAndDisplayFirst);

window.onload = function() {
    if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD) {
        fetchReviewsAndDisplayFirst(); // Refresh reviews and display the first one if the page is reloaded
    } else {
        fetchReviewsAndDisplayFirst(); // Load reviews and display the first one if the page is loaded for the first time
    }
};