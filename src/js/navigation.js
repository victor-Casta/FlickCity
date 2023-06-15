window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)


var botonBurger = document.querySelector(".menu__icons-burger");
var slideMenu = document.getElementById("slide-menu");

botonBurger.addEventListener("click", function() {
  slideMenu.classList.toggle("inactive");
});

document.addEventListener("click", function(event) {
  if (!slideMenu.contains(event.target) && !botonBurger.contains(event.target)) {
    slideMenu.classList.add("inactive");
  }
});


function navigator() {
    console.log(location);
    
    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    }  else if (location.hash.startsWith('#category=')) {
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
