function loadProjectData(jsonPath) {
    fetch(jsonPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load JSON file: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data || !data.length) {
                document.getElementById("project-content").innerHTML = "<p>No versions available for this project.</p>";
                return;
            }

            const projectTitle = data[0].name || "Project Details"; // Set title from the first object
            document.title = projectTitle;
            document.getElementById("project-title").textContent = projectTitle;

            // Build content for all versions
            const content = data.map(version => `
                <div class="version-card">
                    <h2>Version: ${version.version}</h2>
                    <p><strong>Release Date:</strong> ${version.date}</p>
                    <p><strong>Description:</strong> ${version.description || "No description available."}</p>
                    <a href="${version.link}" class="download-btn" target="_blank">Download</a>
                </div>
            `).join("");

            // Render all content in the main container
            document.getElementById("project-content").innerHTML = content;
        })
        .catch(error => {
            console.error("Error loading project JSON:", error);
            document.getElementById("project-content").innerHTML = "<p>Failed to load project details.</p>";
        });
}
