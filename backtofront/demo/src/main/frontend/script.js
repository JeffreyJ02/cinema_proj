document.getElementById('fetchMessage').addEventListener('click', () => {
    fetch('http://localhost:8080/api/message', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Parse JSON
    })
    .then(data => {
        console.log('Success:', data);
        document.getElementById('message').innerText = data.message; // Update the UI with the fetched data
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
