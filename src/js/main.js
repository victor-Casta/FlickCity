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

    trendingPreviewMoviesContainer.innerHTML = '';

    movies.forEach((movie) => {

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

async function getCategoryMovies() {
    const response = await api.get("genre/movie/list");
    const data = response.data;
    console.log(data);

    const genres = data.genres;

    genresNamesContainer.innerHTML = '';
    listGenresContainer.innerHTML = '';

    genres.forEach((genre) => {
        const itemListGenres = document.createElement("li");
        const nameGenre = document.createElement("a");
        nameGenre.textContent = genre.name;
        nameGenre.addEventListener("click", () => {
            location.hash = `#category=${genre.id}-${genre.name}`;
        });

        itemListGenres.appendChild(nameGenre);
        listGenresContainer.appendChild(itemListGenres);
    });

    genresNamesContainer.appendChild(listGenresContainer);
}

async function getMoviesByCategory(id) {
    const response = await api.get('discover/movie', {
        params: {
            with_genres: id,
        },
    });
    const movies = response.data.results;

    moviesCategoryImages.innerHTML = '';

    movies.forEach((movie) => {
        const category = document.createElement('div');
        category.classList.add("movies-category");

        const movieImg = document.createElement("img");
        movieImg.setAttribute("alt", movie.title);
        movieImg.setAttribute(
            "src",
            "https://image.tmdb.org/t/p/w300" + movie.poster_path,
        );

        movieImg.appendChild(category);
        moviesCategoryImages.appendChild(movieImg);

    });
}


botonBurger.addEventListener("click", function () {
    slideMenu.classList.toggle("inactive");
});

document.addEventListener("click", function (event) {
    if (
        !slideMenu.contains(event.target) &&
        !botonBurger.contains(event.target)
    ) {
        slideMenu.classList.add("inactive");
    }
});
