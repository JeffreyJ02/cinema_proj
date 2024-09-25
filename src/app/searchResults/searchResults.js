const SearchResults = ({ movies, searchQuery }) => {
    return (
        <div>
            <h2>Search Results for "{searchQuery}"</h2>
            {movies.length ? (
                movies.map((movie) => (
                    <div key={movie.id}>
                        <h3>{movie.title}</h3>
                        <p><strong>Description:</strong> {movie.description}</p>
                        <p><strong>Release Date:</strong> {movie.releaseDate}</p>
                        <p><strong>Genre:</strong> {movie.genre}</p>
                        <p><strong>Category:</strong> {movie.category}</p>
                        {movie.trailerUrl && (
                            <iframe
                                width="560"
                                height="315"
                                src={movie.trailerUrl}
                                title={`${movie.title} Trailer`}
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        )}
                    </div>
                ))
            ) : (
                <p>No movies found</p>
            )}
        </div>
    );
};

export default SearchResults;


