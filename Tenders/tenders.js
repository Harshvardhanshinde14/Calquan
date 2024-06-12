document.addEventListener('DOMContentLoaded', function () {
    const projectList = document.getElementById('projectList');
    const projectDetails = document.getElementById('projectDetails');

    // Function to fetch main headings
    function fetchMainHeadings() {
        fetch('https://calquan.com:85/api/Portal/GetTenderslevel0')
            .then(response => response.json())
            .then(data => {
                if (data.Data && data.Data.length > 0) {
                    displayMainHeadings(data.Data);
                } else {
                    console.error('No main headings data found');
                }
            })
            .catch(error => {
                console.error('Error fetching main headings:', error);
                projectList.innerHTML = '<li class="list-group-item">Error fetching data</li>';
            });
    }

    // Function to display main headings
    function displayMainHeadings(mainHeadings) {
        projectList.innerHTML = ''; // Clear existing list
        mainHeadings.forEach(mainHeading => {
            const mainHeadingItem = document.createElement('li');
            mainHeadingItem.className = 'list-group-item';
            mainHeadingItem.textContent = mainHeading.xPrjNameName;
            mainHeadingItem.style.cursor = 'pointer';
            mainHeadingItem.addEventListener('click', () => {
                toggleSubProjects(mainHeading.xID); // Toggle display of sublist using main heading ID
            });
            projectList.appendChild(mainHeadingItem);

            // Create container for sublist
            const subProjectContainer = document.createElement('div');
            subProjectContainer.id = `subProjects_${mainHeading.xID}`;
            projectList.appendChild(subProjectContainer);
        });
    }

    // Function to fetch and display sub-projects
    function toggleSubProjects(mainProjectID) {
        const subProjectContainer = document.getElementById(`subProjects_${mainProjectID}`);
        if (subProjectContainer.innerHTML === '') {
            fetchSubProjects(mainProjectID, subProjectContainer); // Fetch and display sublist if container is empty
        } else {
            subProjectContainer.innerHTML = ''; // Clear sublist if already displayed
        }
    }

    // Function to fetch sub-projects
    function fetchSubProjects(mainProjectID, container) {
        fetch(`https://calquan.com:85/api/Portal/GetTenderslevel1/${mainProjectID}`)
            .then(response => response.json())
            .then(data => {
                if (data.Data && data.Data.length > 0) {
                    displaySubProjects(data.Data, container);
                } else {
                    console.error('No sublist data found for project:', mainProjectID);
                }
            })
            .catch(error => {
                console.error('Error fetching sublist data:', error);
            });
    }

    // Function to display sub-projects
    function displaySubProjects(subProjects, container) {
        subProjects.forEach(subProject => {
            const subProjectListItem = document.createElement('li');
            subProjectListItem.className = 'sub-project-list-item'; // Change class name
            subProjectListItem.textContent = subProject.xPrjNameName;
            subProjectListItem.style.cursor = 'pointer';
            subProjectListItem.addEventListener('click', () => {
                toggleNestedSubProjects(subProject.xID, container); // Toggle display of nested sublist using sub-project ID
            });
            container.appendChild(subProjectListItem);

            // Create container for nested sublist
            const nestedSubProjectContainer = document.createElement('div');
            nestedSubProjectContainer.id = `nestedSubProjects_${subProject.xID}`;
            container.appendChild(nestedSubProjectContainer);
        });
    }

    // Function to fetch and display nested sub-projects
    function toggleNestedSubProjects(subProjectID, parentContainer) {
        // Close all nested sub-project lists in the parent container
        const allNestedSubProjects = parentContainer.querySelectorAll('div[id^="nestedSubProjects_"]');
        allNestedSubProjects.forEach(container => {
            if (container.id !== `nestedSubProjects_${subProjectID}`) {
                container.innerHTML = '';
            }
        });

        const nestedSubProjectContainer = document.getElementById(`nestedSubProjects_${subProjectID}`);
        if (nestedSubProjectContainer.innerHTML === '') {
            fetchNestedSubProjects(subProjectID, nestedSubProjectContainer); // Fetch and display nested sublist if container is empty
        } else {
            nestedSubProjectContainer.innerHTML = ''; // Clear nested sublist if already displayed
        }
    }

    // Function to fetch nested sub-projects
    function fetchNestedSubProjects(subProjectID, container) {
        fetch(`https://calquan.com:85/api/Portal/GetTenderslevel2/${subProjectID}`)
            .then(response => response.json())
            .then(data => {
                if (data.Data && data.Data.length > 0) {
                    displayNestedSubProjects(data.Data, container);
                } else {
                    console.error('No nested sublist data found for sub-project:', subProjectID);
                }
            })
            .catch(error => {
                console.error('Error fetching nested sublist data:', error);
            });
    }

    // Function to display nested sub-projects
    function displayNestedSubProjects(nestedSubProjects, container) {
        nestedSubProjects.forEach(nestedSubProject => {
            const nestedSubProjectListItem = document.createElement('li');
            nestedSubProjectListItem.className = 'nested-sub-project-list-item'; // Change class name
            nestedSubProjectListItem.textContent = nestedSubProject.xPrjNameName;
            nestedSubProjectListItem.style.cursor = 'pointer';
            nestedSubProjectListItem.addEventListener('click', () => {
                displayProjectDetails(nestedSubProject); // Display project details when a nested sub-project is clicked
            });
            container.appendChild(nestedSubProjectListItem);
        });
    }

    // Function to fetch project details
    function fetchProjectDetails(projectID) {
        fetch(`https://calquan.com:85/api/Portal/GetTenderslevel2/${projectID}`)
            .then(response => response.json())
            .then(data => {
                if (data.Data && data.Data.length > 0) {
                    displayProjectDetails(data.Data[0]);
                } else {
                    console.error('No detailed data found for project:', projectID);
                }
            })
            .catch(error => {
                console.error('Error fetching project details:', error);
            });
    }

    // Function to display project details
    function displayProjectDetails(project) {
        projectDetails.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${project.xPrjNameName}</h5>
                <table class="table">
                    <tbody>
                        <tr>
                            <th scope="row">Date</th>
                            <td>${project.xDate}</td>
                        </tr>
                        <tr>
                            <th scope="row">Department</th>
                            <td>${project.xDepName}</td>
                        </tr>
                        <tr>
                            <th scope="row">Cost</th>
                            <td>${project.xPrjCoast}</td>
                        </tr>
                        <tr>
                            <th scope="row">Description</th>
                            <td>${project.xDesc}</td>
                        </tr>
                        <tr>
                            <th scope="row">Images</th>
                            <td>
                                <img src="https://calquan.com:85/api/Image/DownLoadImage/Tender/${project.xImage1}" alt="Image 1">
                                <img src="https://calquan.com:85/api/Image/DownLoadImage/Tender/${project.xImage2}" alt="Image 2">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
        // Scroll to the top of the projectDetails container only for mobile view
        if (window.innerWidth <= 768) {
            projectDetails.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest', duration: 500 });
        }
    }
    // Initial fetch of main headings
    fetchMainHeadings();
});
