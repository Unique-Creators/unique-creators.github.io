// Function to get query parameter
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Load project data dynamically
document.addEventListener("DOMContentLoaded", () => {
    const projectId = getQueryParam("project");
    if (!projectId) {
        document.getElementById("project-content").innerHTML = "<p>No project specified.</p>";
        return;
    }

    // Fetch projects.json to find the correct file
    fetch('../json/projects.json')
        .then(response => response.json())
        .then(projects => {
            const project = projects.find(p => p.id === projectId);
            if (project) {
                loadProjectData(project.json);
            } else {
                document.getElementById("project-content").innerHTML = "<p>Project not found.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching project list:", error);
            document.getElementById("project-content").innerHTML = "<p>Error loading project list.</p>";
        });
});

// Fetch and display the project details
function loadProjectData(jsonPath) {
    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            const project = data[0]; // Assuming single object in JSON array
            document.title = project.name; // Set the page title
            document.getElementById("project-title").textContent = project.name;

            const content = `
                <p><strong>Version:</strong> ${project.version}</p>
                <p><strong>Release Date:</strong> ${project.date}</p>
                <p><strong>Description:</strong> ${project.description || "No description available."}</p>
                <a href="${project.link}" class="download-btn" target="_blank">Download</a>
            `;
            document.getElementById("project-content").innerHTML = content;
        })
        .catch(error => {
            console.error("Error fetching project data:", error);
            document.getElementById("project-content").innerHTML = "<p>Failed to load project details.</p>";
        });
}
