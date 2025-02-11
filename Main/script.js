async function fetchMovie() {
    const movieName = document.getElementById('movie-input').value;
    const movieContainer = document.getElementById('movie-container');
    document.getElementById('movie-input').value = "";
    if (movieName === "") {
        alert("Please enter a movie name.");
        return;
    }

    const url = `https://www.omdbapi.com/?t=${(movieName)}&apikey=a4e05bef`;
    
    movieContainer.innerHTML = "<p>Loading...</p>"; 

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "True") {
            movieContainer.innerHTML = `
                <h2>${data.Title} (${data.Year})</h2>
                <p>${data.Plot}</p>
                <img src="${data.Poster}" alt="Movie Poster">`
            document.getElementById("bg").style.backgroundImage = `url(${data.Poster})`;
        } else {
            movieContainer.innerHTML = `<p style="color: red;">Movie not found!</p>`;
        }
    } catch (error) {
        console.error("Error fetching movie data:", error);
        movieContainer.innerHTML = `<p style="color: red;">Failed to fetch movie data. Try again later.</p>`;
    }
}
