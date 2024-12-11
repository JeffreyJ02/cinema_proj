export async function addMovies(movieData) {
    try {
        const response = await fetch('http://localhost:8080/api/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(movieData),
        });
        const message = await response.text();
        if (!response.ok) {
          throw new Error(message);
        }
        return message;
      } catch (error) {
        alert('Error adding movie: ' + error.message);
      }
};

export async function deleteMovie(movie) {
    try {
        const response = await fetch(
          `http://localhost:8080/api/movies/delete/${movie}`,
          {
            method: "DELETE",
          }
        );
        const message = await response.text();
        if (!response.ok) {
          throw new Error(message);
        }
        console.log("Delete api: ", message); 
        return message;
      } catch (error) {
        alert("Error deleting movie api: " + error.message);
      }
}

export async function fetchMovies() {
    try {
        const response = await fetch('http://localhost:8080/api/movies');
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        const movies = await response.json();
        return movies;

    } catch (error) {
        alert('Error fetching movies facade: ' + error.message);
    }
};