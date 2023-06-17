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


    popularSearchMovies.classList.add('inactive');
    moviesDestails.classList.add('inactive');
    categoriesMovies.classList.remove('inactive');
    trendingMovies.classList.add('inactive');
    headerConatiner.classList.add('inactive');
    newMovies.classList.add('inactive');
    animatedMovies.classList.add('inactive');
}

function homePage() {
    console.log('Home!!');

    headerContainer.classList.remove('inactive')
    popularSearchMovies.classList.add('inactive');
    moviesDestails.classList.add('inactive');
    categoriesMovies.classList.add('inactive');


    getCategoryMovies();
    getTrendingMoviesPreview();     
}

function searchPage() {
    console.log('Search!!');

    headerContainer.classList.remove('inactive');
    headerContainer.style.height = '15vh';
    popularSearchMovies.classList.remove('inactive');
    moviesDestails.classList.add('inactive');
    categoriesMovies.classList.add('inactive');
    trendingMovies.classList.add('inactive');
    newMovies.classList.add('inactive');
    animatedMovies.classList.add('inactive');
}

function movieDetailsPage() {
    console.log('Movie!!');
}

function trendsPage() {
    console.log('Trends!!');
}

// homePage();
// movieDetailsPage();
// searchPage();
// categoriesPage();
// trendsPage();