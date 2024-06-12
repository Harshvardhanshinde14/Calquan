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
if (!name ||!companyName || !email || !phone || !message || !project) {
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
        xGetquot: "1" // Hardcoded value for xGetquot parameter
        
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












