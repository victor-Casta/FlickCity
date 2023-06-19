searchBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value;
});

searchSecondaryBtn.addEventListener('click', () => {
    location.hash = '#search=';
})

homeFooterBtn.addEventListener('click', () => {
    location.hash = '#home';
});


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


    headerContain.classList.add('inactive');
    popularSearchMovies.classList.add('inactive');
    moviesDestails.classList.add('inactive');
    categoriesMovies.classList.remove('inactive');
    trendingMovies.classList.add('inactive');
    newMovies.classList.add('inactive');
    animatedMovies.classList.add('inactive');

    const [_, categoryData] = location.hash.split('='); //['#category', '#id-name']
    const [categoryId, categoryName] = categoryData.split('-');
    
    categoriesNames.innerHTML = categoryName;
    getMoviesByCategory(categoryId);
}

function homePage() {
    console.log('Home!!');

    headerContain.classList.remove('inactive');
    popularSearchMovies.classList.add('inactive');
    moviesDestails.classList.add('inactive');
    categoriesMovies.classList.add('inactive');
    trendingMovies.classList.remove('inactive');
    newMovies.classList.remove('inactive');
    animatedMovies.classList.remove('inactive');


    getCategoryMovies();
    getTrendingMoviesPreview();     
}

function searchPage() {
    console.log('Search!!');

    headerContain.classList.remove('inactive');
    popularSearchMovies.classList.remove('inactive');
    moviesDestails.classList.add('inactive');
    categoriesMovies.classList.add('inactive');
    trendingMovies.classList.add('inactive');
    newMovies.classList.add('inactive');
    animatedMovies.classList.add('inactive');

    // ['search' 'platzi']
    const [_, query] = location.hash.split('='); 
    getMoviesBySearch(query);
}

function movieDetailsPage() {
    console.log('Movie!!');

    headerContain.classList.add('inactive');
    popularSearchMovies.classList.add('inactive');
    moviesDestails.classList.remove('inactive');
    categoriesMovies.classList.add('inactive');
    trendingMovies.classList.add('inactive');
    newMovies.classList.add('inactive');
    animatedMovies.classList.add('inactive');
}

function trendsPage() {
    console.log('Trends!!');

    headerContain.classList.remove('inactive');
    popularSearchMovies.classList.add('inactive');
    moviesDestails.classList.add('inactive');
    categoriesMovies.classList.add('inactive');
    trendingMovies.classList.remove('inactive');
    newMovies.classList.add('inactive');
    animatedMovies.classList.remove('inactive');
}