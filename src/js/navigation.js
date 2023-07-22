let maxPage;
let page = 1;
let infiniteScroll;

searchBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value;
});

searchSecondaryBtn.addEventListener('click', () => {
    location.hash = '#search=';
})

homeFooterBtn.addEventListener('click', () => {
    location.hash = '#home';
});


window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('scroll', infiniteScroll, false);


function navigator() {
    console.log(location);

    if (infiniteScroll) {
        window.removeEventListener('scroll', infiniteScroll, { passive: false });
        infiniteScroll = undefined;
    }

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
    
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    if (infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll,  { passive: false });
        infiniteScroll = undefined;
    }

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

    infiniteScroll = getPaginatedCategoryMovies(categoryId);
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
    getTvSeriesPreview();
    getAnimatedMoviesPreview()
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

    infiniteScroll = getPaginatedMoviesBySearch(query);
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

    // ['movie' '5457452']
    const [_, movieId] = location.hash.split('='); 
    getMovieById(movieId);
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