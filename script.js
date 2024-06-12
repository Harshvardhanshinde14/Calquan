// List of image URLs
const images = [
    '/Home/images/image1.jpg',
    '/Home/images/image2.jpg',
    '/Home/images/image3.jpg',
    '/Home/images/image4.jpg',
    '/Home/images/image5.jpg',
    '/Home/images/image6.jpg',
    '/Home/images/image7.jpg',
    '/Home/images/image8.jpg',
    '/Home/images/image9.jpg',
    '/Home/images/image10.jpg',
    '/Home/images/image11.jpg',
    '/Home/images/image12.jpg',
    '/Home/images/image16.jpg',
    '/Home/images/image17.jpg',
    '/Home/images/image18.jpg',
    '/Home/images/image19.jpg',
    '/Home/images/image20.jpg',
    '/Home/images/image21.jpg',
    '/Home/images/image22.jpg',
    '/Home/images/image23.jpg',
    '/Home/images/image24.jpg',
    // Add more image URLs as needed
];

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to set a random image to the slider
function setRandomImage() {
    const randomIndex = getRandomInt(0, images.length - 1);
    const imageUrl = images[randomIndex];
    document.getElementById('image-container').style.backgroundImage = `url(${imageUrl})`;
}

// Call setRandomImage() when the page loads
window.onload = setRandomImage;














/****************************contact form*******************/
function postData(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get form data
    var name = document.getElementById("name").value;
    var companyName = document.getElementById("companyName").value;
    var email = document.getElementById("email").value;
    var project = document.getElementById("project").value;
    var phone = document.getElementById("phone").value;
    var message = document.getElementById("message").value;
    

    // Clear previous error messages
    document.getElementById("errorMessages").innerHTML = '';
 // Check if any required field is empty
 if (!name || !email || !phone || !message || !project) {
    displayErrorMessage("Please fill out all required fields.");
    return;
}
    // Check if name contains only letters
    var lettersRegex = /^[a-zA-Z\s]*$/;
    if (!lettersRegex.test(name)) {
        displayErrorMessage("Name should contain only letters and spaces");
        return;
    }

    // Check if email format is valid
    var emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
        displayErrorMessage("Invalid email format");
        return;
    }

    // Check if phone number contains only numbers and is exactly 10 digits
    var numbersRegex = /^[0-9]+$/;
    if (!numbersRegex.test(phone) || phone.length !== 10) {
        displayErrorMessage("Phone number should contain exactly 10 numbers");
        return;
    }

    // Construct JSON object
    var data = {
        xName: name,
        xCompanyName: companyName,
        xEmail: email,
        xPhoneNo: phone,
        xMessage: message,
        xSubject:project,
        xGetquot: "0" // Hardcoded value for xGetquot parameter
        
    };

    // Convert data to JSON string
    var jsonData = JSON.stringify(data);

    // Make POST request to REST API
    fetch('https://calquan.com:85/api/Portal/submitContactUs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle response
        console.log("Response:", data);
        alert("Data posted successfully");

        // Clear form fields
        document.getElementById("name").value = "";
        document.getElementById("companyName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("message").value = "";
        document.getElementById("project").value="";
    })
    .catch(error => {
        // Handle errors
        console.error("Error:", error);
        alert("Error: " + error.message);
    });
}

function displayErrorMessage(message) {
    var errorDiv = document.createElement("div");
    errorDiv.textContent = message;
    errorDiv.classList.add("error-message");
    document.getElementById("errorMessages").appendChild(errorDiv);
}



/*******************For Display Map   */
function showMap(mapNumber) {
    if (mapNumber === 1) {
      document.getElementById('map1').style.display = 'block';
      document.getElementById('map2').style.display = 'none';
    } else if (mapNumber === 2) {
      document.getElementById('map1').style.display = 'none';
      document.getElementById('map2').style.display = 'block';
    }
  }








//animation for title product 
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with the class 'title-product'
    const animatedElements = document.querySelectorAll('.title-product, .feature-item h4, .feature-item h5, .feature-item p');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});
