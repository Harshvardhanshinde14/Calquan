// Function to fetch data based on selected letter
function fetchData(letter) {
    fetch(`https://calquan.com:85/api/Portal/GetCompany/${letter}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const companiesDiv = document.getElementById('companies');

            companiesDiv.innerHTML = ''; // Clear previous data

            const companiesList = document.createElement('ul');
            companiesList.className = 'list-group';

            // Create list items for all companies
            data.Data.forEach(company => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.textContent = `${company.xName} (${company.xShortName})`;
                listItem.addEventListener('click', function () {
                    openInNewTab(company.xCompanyLink);
                });
                companiesList.appendChild(listItem);
            });

            companiesDiv.appendChild(companiesList);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Function to open link in a new tab
function openInNewTab(link) {
    const newTab = window.open(link, '_blank');

    if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') { 
        console.log('Error opening link in new tab:', link);
    }

    if (window.innerWidth <= 768) {
        const objectContainer = document.getElementById('object-container');
        if (objectContainer) {
            objectContainer.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest', duration: 50 });
        }
    }
}

// Function to generate clickable letter boxes
function generateAlphabetBoxes() {
    const alphabetContainer = document.getElementById("alphabet-container");

    fetch('https://calquan.com:85/api/Portal/GetCompanyInitials')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(letter => {
                const box = document.createElement("div");
                box.className = "letter-box";
                box.textContent = letter.toUpperCase();

                box.addEventListener('click', function () {
                    fetchData(letter);
                });

                alphabetContainer.appendChild(box);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Initialize the alphabet boxes
generateAlphabetBoxes();
// Initial fetch with default letter 'a'
fetchData('a');
