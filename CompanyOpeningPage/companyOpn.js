// Function to fetch data based on selected letter
function fetchData(letter) {
    fetch(`https://calquan.com:85/api/Portal/GetCompanyOpeninigs/${letter}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const companyDataDiv = document.getElementById('company-data');
            companyDataDiv.innerHTML = ''; // Clear previous data

            data.Data.forEach(company => {
                const card = document.createElement('div');
                card.className = 'card mb-3';
                const cardBody = document.createElement('div');
                cardBody.className = 'card-body1';
                const heading = document.createElement('h5');
                heading.className = 'card-title';
                heading.textContent = company.xName; // Set heading text
                const subheading = document.createElement('h6');
                subheading.className = 'card-subtitle mb-2 text-muted';
                subheading.textContent = company.xShortName; // Set subheading text

                // Add click event to the card to open link
                card.addEventListener('click', function () {
                    openInObjectOrNewTab(company.xCompanyOpeningLink);
                });

                cardBody.appendChild(heading);
                cardBody.appendChild(subheading);
                card.appendChild(cardBody);
                companyDataDiv.appendChild(card);
            });

            // Load first company website using object or new tab
            if (data.Data.length > 0) {
                openInObjectOrNewTab(data.Data[0].xCompanyOpeningLink);
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Function to open link in object or new tab
function openInObjectOrNewTab(link) {
    const objectContainer = document.getElementById('object-container');
    const object = document.createElement('object');

    // Try to load the link using object element
    object.data = link;
    object.width = '100%';
    object.height = '650px';

    // Clear previous content
    objectContainer.innerHTML = '';

    // Append object element to container
    objectContainer.appendChild(object);

    // If object loading fails, open in new tab
    object.onerror = function () {
        console.log('Error loading object, redirecting to new page:', link);
        window.open(link, '_blank');
    };

   // Check if the screen width is less than a certain threshold (e.g., 768 pixels for small screens)
if (window.innerWidth < 768) {
    // Smooth scroll to the object container after loading
    object.onload = function () {
        objectContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
}
}
// Function to generate clickable letter boxes
function generateAlphabetBoxes() {
    const alphabetContainer = document.getElementById("alphabet-container");

    for (let i = 97; i <= 122; i++) {
        const letter = String.fromCharCode(i);
        const box = document.createElement("div");
        box.className = "letter-box";
        box.textContent = letter.toUpperCase(); // To display uppercase letters

        // Add click event to the box
        box.addEventListener('click', function () {
            fetchData(letter);
        });

        alphabetContainer.appendChild(box);
    }
}

// Initialize the alphabet boxes
generateAlphabetBoxes();

// Initial fetch with default letter 'n'
fetchData('a');
