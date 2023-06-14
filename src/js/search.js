const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        "content-type": "application/json;charset=utf-8",
    },
    params: {
        api_key: API_KEY,
    },
});

async function getCategoryMovies() {
    const response = await api.get("genre/movie/list");
    const data = response.data;
    console.log(data);

    const genres = data.genres;

    const genresNamesContainer = document.querySelector('.main__section-opcion-movies');
    const listGenresContainer = document.createElement('ul');

    genres.forEach(genre => {
        const itemListGenres = document.createElement('li');
        const nameGenre = document.createElement('a');
        nameGenre.textContent = genre.name;

        itemListGenres.appendChild(nameGenre);
        listGenresContainer.appendChild(itemListGenres);
    });

    genresNamesContainer.appendChild(listGenresContainer);
}

getCategoryMovies();
