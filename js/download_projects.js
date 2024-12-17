// Fetch and display all projects dynamically
fetch('../json/projects.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load project data.');
        }
        return response.json();
    })
    .then(data => {
        const container = document.getElementById('projects-container');
        container.innerHTML = ""; // Clear any previous content

        // Iterate through each project
        data.forEach(project => {
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('project-card');

            projectDiv.innerHTML = `
                <h2>${project.name}</h2>
                <p>${project.summary}</p>
                <a href="${project.detailsPage}" class="learn-btn">Learn more and Download</a>
            `;

            container.appendChild(projectDiv);
        });
    })
    .catch(error => {
        console.error("Error loading project data:", error);
        document.getElementById('projects-container').innerHTML = "<p>Failed to load projects. Please try again later.</p>";
    });
