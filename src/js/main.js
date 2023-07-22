const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        "content-type": "application/json;charset=utf-8",
    },
    params: {
        api_key: API_KEY,
    },
});

//utils

const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const url = entry.target.getAttribute("data-img");
            entry.target.setAttribute("src", url);
        }
    });
});

async function getTrendingMoviesPreview() {
    const response = await api.get("trending/movie/day");
    const movies = response.data.results;

    trendingPreviewMoviesContainer.innerHTML = "";

    movies.forEach((movie) => {
        const movieContainer = document.createElement("article");
        movieContainer.classList.add("cards-container", "blur-out");
        movieContainer.addEventListener("click", () => {
            location.hash = "#movie=" + movie.id;
        });

        const movieImg = document.createElement("img");
        movieImg.classList.add("trending-image", "blur-in-expand");
        movieImg.setAttribute("alt", movie.title);
        movieImg.setAttribute(
            "data-img",
            "https://image.tmdb.org/t/p/w500" + movie.poster_path
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

        lazyLoader.observe(movieImg);
    });
}

async function getTvSeriesPreview() {
    const response = await api.get("discover/movie", {
        params: {
            with_genres: 10770,
        },
    });
    const movies = response.data.results;

    console.log(movies);
    tvSeriesPreviewContainer.innerHTML = "";

    movies.forEach((movie) => {
        const movieContainer = document.createElement("article");
        movieContainer.classList.add("new-movie-cards-container");
        movieContainer.addEventListener("click", () => {
            location.hash = "#movie=" + movie.id;
        });

        const movieImg = document.createElement("img");
        movieImg.classList.add("new-movie-image", "blur-in-expand");
        movieImg.setAttribute("alt", movie.title);
        movieImg.setAttribute(
            "data-img",
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
        tvSeriesPreviewContainer.appendChild(movieContainer);
        movieContainer.appendChild(calificationMovieContainer);

        lazyLoader.observe(movieImg);
    });
}

async function getAnimatedMoviesPreview() {
    const response = await api.get("discover/movie", {
        params: {
            with_genres: 16,
        },
    });
    const movies = response.data.results;

    console.log(movies);
    aminatedPreviewContainer.innerHTML = "";

    movies.forEach((movie) => {
        const movieContainer = document.createElement("article");
        movieContainer.classList.add("animated-movie-cards-container");
        movieContainer.addEventListener("click", () => {
            location.hash = "#movie=" + movie.id;
        });

        const movieImg = document.createElement("img");
        movieImg.classList.add("animated-movie-image", "blur-in-expand");
        movieImg.setAttribute("alt", movie.title);
        movieImg.setAttribute(
            "data-img",
            "https://image.tmdb.org/t/p/w500" + movie.poster_path
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
        aminatedPreviewContainer.appendChild(movieContainer);
        movieContainer.appendChild(calificationMovieContainer);

        lazyLoader.observe(movieImg);
    });
}

async function getCategoryMovies() {
    const response = await api.get("genre/movie/list");
    const data = response.data;
    console.log(data);

    const genres = data.genres;

    genresNamesContainer.innerHTML = "";
    listGenresContainer.innerHTML = "";

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
    const response = await api.get("discover/movie", {
        params: {
            with_genres: id,
        },
    });
    maxPage = response.data.total_pages;
    const movies = response.data.results;

    moviesCategoryImages.innerHTML = "";

    movies.forEach((movie) => {
        const category = document.createElement("div");
        category.classList.add("movies-category");

        const movieImg = document.createElement("img");
        movieImg.setAttribute("alt", movie.title);
        movieImg.setAttribute(
            "src",
            "https://image.tmdb.org/t/p/w500" + movie.poster_path
        );
        movieImg.addEventListener("click", () => {
            location.hash = "#movie=" + movie.id;
        });

        movieImg.appendChild(category);
        moviesCategoryImages.appendChild(movieImg);
    });

    console.log(movies);
}

function getPaginatedCategoryMovies(id) {
    return async function () {
        const { 
            scrollTop, 
            clientHeight, 
            scrollHeight 
        } = document.documentElement;

        const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;
    
        const pageIsNotMax = page < maxPage;
    
        if (scrollIsBottom && pageIsNotMax) {
            page++;
            const response = await api.get("discover/movie", {
                params: {
                    with_genres: id,
                    page,
                },
            });
            maxPage = response.data.total_pages;
            const movies = response.data.results;
        
            movies.forEach((movie) => {
                const category = document.createElement("div");
                category.classList.add("movies-category");
        
                const movieImg = document.createElement("img");
                movieImg.setAttribute("alt", movie.title);
                movieImg.setAttribute(
                    "src",
                    "https://image.tmdb.org/t/p/w500" + movie.poster_path
                );
                movieImg.addEventListener("click", () => {
                    location.hash = "#movie=" + movie.id;
                });
        
                movieImg.appendChild(category);
                moviesCategoryImages.appendChild(movieImg);
            });
        }
    }
}

function getPaginatedMoviesBySearch(query) {
    return async function () {
        const { 
            scrollTop, 
            clientHeight, 
            scrollHeight 
        } = document.documentElement;

        const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;
    
        const pageIsNotMax = page < maxPage;
    
        if (scrollIsBottom && pageIsNotMax) {
            page++;
            const response = await api.get("search/movie", {
                params: {
                    query,
                    page,
                },
            });
            const movies = response.data.results;
        
            movies.forEach((movie) => {
                const category = document.createElement("div");
                category.classList.add("movies-category");
        
                const movieImg = document.createElement("img");
                movieImg.setAttribute("alt", movie.title);
                movieImg.setAttribute(
                    "src",
                    "https://image.tmdb.org/t/p/w300" + movie.poster_path
                );
                movieImg.addEventListener("click", () => {
                    location.hash = "#movie=" + movie.id;
                });
        
                movieImg.addEventListener("error", () => {
                    movieImg.setAttribute(
                        "src",
                        "https://i.pinimg.com/564x/d3/d1/8a/d3d18af46e0eb08049ecdbfebb7dc263.jpg"
                    );
                });
        
                movieImg.appendChild(category);
                filterMoviesContainer.appendChild(movieImg);
            });
        }
    }
}

async function getMoviesBySearch(query) {
    const response = await api.get("search/movie", {
        params: {
            query,
        },
    });
    const movies = response.data.results;
    maxPage = response.data.total_pages;
    console.log(maxPage);

    filterMoviesContainer.innerHTML = "";

    movies.forEach((movie) => {
        const category = document.createElement("div");
        category.classList.add("movies-category");

        const movieImg = document.createElement("img");
        movieImg.setAttribute("alt", movie.title);
        movieImg.setAttribute(
            "src",
            "https://image.tmdb.org/t/p/w300" + movie.poster_path
        );
        movieImg.addEventListener("click", () => {
            location.hash = "#movie=" + movie.id;
        });

        movieImg.addEventListener("error", () => {
            movieImg.setAttribute(
                "src",
                "https://i.pinimg.com/564x/d3/d1/8a/d3d18af46e0eb08049ecdbfebb7dc263.jpg"
            );
        });

        movieImg.appendChild(category);
        filterMoviesContainer.appendChild(movieImg);
    });
}

async function getMovieById(id) {
    const dataMovie = await api.get("movie/" + id);

    console.log(dataMovie);
    movieDetailScore.textContent = dataMovie.data.vote_average;
    movieDetailTitle.textContent = dataMovie.data.title;
    movieDetailDescription.textContent = dataMovie.data.overview;
    movieDetailYear.textContent = dataMovie.data.release_date;

    movieDetailImage.setAttribute("alt", dataMovie.data.title);
    movieDetailImage.setAttribute(
        "src",
        "https://image.tmdb.org/t/p/w500" + dataMovie.data.poster_path
    );

    getRelatedMoviesId(id);
}

async function getRelatedMoviesId(id) {
    const response = await api.get(`movie/${id}/similar`);
    const movies = response.data.results;

    similarMoviesContainer.innerHTML = "";

    movies.forEach((movie) => {
        const movieImg = document.createElement("img");
        movieImg.classList.add("similar-movie-image");
        movieImg.setAttribute("alt", movie.title);
        movieImg.setAttribute(
            "src",
            "https://image.tmdb.org/t/p/w300" + movie.poster_path
        );
        movieImg.addEventListener("click", () => {
            location.hash = "#movie=" + movie.id;
        });

        similarMoviesContainer.appendChild(movieImg);
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
