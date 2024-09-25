document.getElementById('searchButton').addEventListener('click', function() {
    const searchInput = document.getElementById('searchInput').value;
    fetchMovies(searchInput);
});

const fetchMovies = async (title) => {
    try {
        const response = await fetch(`http://localhost:8080/api/search?title=${title}`);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        console.log('Fetched movies:', data);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
};

var search = document.getElementsByClassName("me-2")[0];
search.addEventListener("keypress", function(event) {
    if (event.key === "Enter"){
        event.preventDefault();
        fetchMovies(search.innerHTML);
        

    }
})



function displayMovies(movies) {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = ''; // Clear previous results
    if (movies.length === 0) {
        movieList.innerText = 'No movies found';
        return;
    }
    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.innerHTML = `
            <h3>${movie.title}</h3>
            <p><strong>Description:</strong> ${movie.description}</p>
            <p><strong>Release Date:</strong> ${movie.releaseDate}</p>
            <p><strong>Genre:</strong> ${movie.genre}</p>
            <p><strong>Category:</strong> ${movie.category}</p>
            <iframe width="560" height="315" src="${movie.trailerUrl}" frameborder="0" allowfullscreen></iframe>
            <hr>
        `;
        movieList.appendChild(movieItem);
    });

    async function login(event) {
        event.preventDefault(); 
    
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
    
        try {
            const response = await fetch('http://localhost:8080/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ username, password })
            });
    
            const message = await response.text(); 
    
            if (response.ok) {
                
                alert(message);
                window.location.href = 'AdminDashBoard.html'; 
            } else {
                
                alert("Invalid credentials. Please try again.");
                document.getElementById('username').value = ''; 
                document.getElementById('password').value = '';
                window.location.href = '/admin/login'; 
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again.');
        }
    }
    

    async function deleteMovie(id) {
        const response = await fetch(`http://localhost:8080/api/admin/movies/delete/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
    
        const message = await response.text();
        alert(message); 
    }
    
    
}

