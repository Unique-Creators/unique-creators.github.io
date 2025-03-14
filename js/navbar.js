document.addEventListener('DOMContentLoaded', () => {
    fetch('/html/navbar.html')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        document.getElementById('navbar-placeholder').innerHTML = data;
      })
      .catch(error => console.error('Error loading navbar:', error));
  });