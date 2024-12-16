// Fetch and display HandCricket versions dynamically from a JSON file
fetch('../json/version.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const container = document.getElementById('versions');

        // Iterate through each version and add it to the page
        data.forEach(version => {
            const versionDiv = document.createElement('div');
            versionDiv.classList.add('version');

            versionDiv.innerHTML = `
                <h2>${version.version}</h2>
                <p><strong>Release Date:</strong> ${version.date}</p>
                <p>${version.description}</p>
                <a href="${version.link}" target="_blank" class="download-btn">Download</a>
            `;
                            
            container.appendChild(versionDiv);
        });
    })
    .catch(error => {
        console.error('Error fetching JSON data:', error);
        const container = document.getElementById('versions');
        container.innerHTML = '<p>Failed to load versions. Please try again later.</p>';
    });
