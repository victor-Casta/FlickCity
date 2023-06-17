window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)


function navigator() {
    console.log(location);

    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }
    location.hash
}

function categoriesPage() {
    console.log('Categories!!');
}

function homePage() {
    console.log('Home!!');

    getCategoryMovies();
    getTrendingMoviesPreview();
}

function searchPage() {
    console.log('Search!!');
}

function movieDetailsPage() {
    console.log('Movie!!');
}

function trendsPage() {
    console.log('Trends!!');
}
