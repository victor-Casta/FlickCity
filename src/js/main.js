const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        "content-type": "application/json;charset=utf-8",
    },
    params: {
        api_key: API_KEY,
    },
});

async function getTrendingMoviesPreview() {
    const response = await api.get("trending/movie/day");
    const movies = response.data.results;

    movies.forEach((movie) => {
        const trendingPreviewMoviesContainer =
            document.querySelector(".scroll-container");

        const movieContainer = document.createElement("article");
        movieContainer.classList.add("cards-container");

        const movieImg = document.createElement("img");
        movieImg.classList.add("trending-image");
        movieImg.setAttribute("alt", movie.title);
        movieImg.setAttribute(
            "src",
            "https://image.tmdb.org/t/p/w300" + movie.poster_path
        );

        const movieName = document.createElement("h3");
        movieName.textContent = movie.title;

        const starImage = document.createElement("img");
        starImage.setAttribute("src", "./src/images/logos/Star.svg");

        const calificationMovieContainer = document.createElement("div");
        calificationMovieContainer.classList.add("new-movie-star");

        const calificationTrendingMovie = document.createElement("p");
        calificationTrendingMovie.textContent = movie.vote_average;

        movieContainer.appendChild(movieImg);
        movieContainer.appendChild(movieName);
        calificationMovieContainer.appendChild(starImage);
        calificationMovieContainer.appendChild(calificationTrendingMovie);
        trendingPreviewMoviesContainer.appendChild(movieContainer);
        movieContainer.appendChild(calificationMovieContainer);
    });
}

getTrendingMoviesPreview();
