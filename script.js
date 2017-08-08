// let url = 'http://recipepuppyproxy.herokuapp.com/api/?q=omelet';
let url = 'http://recipepuppyproxy.herokuapp.com/api/?q=';

let divForSearchResults = document.querySelector('.search-results');
let inputSearchTerm = document.querySelector('#search-term');
let searchButton = document.querySelector('#search-button');

searchButton.addEventListener('click', (event) => {
  // grab the contents of the search field
  let searchString = inputSearchTerm.value;
  console.log(`User searched for: ${searchString}`);

  let newSearchURL = url + searchString;
  searchForRecipes(newSearchURL);
})

function searchForRecipes(url) {
  fetch(url)
    .then( (response) => {
      return response.json();
    })
    .then( (data) => {
      console.log(data);
      updatePageContents(data);
    })
}

function updatePageContents(data) {
  let results = data.results;
  // hold all our search results
  let recipeResultsContent = '';
  results.forEach( (recipe) => {
    let htmlForNewRecipe = `
      <div class='recipe'>
        <div class='recipe-title'>
          ${recipe.title}
        </div>
        <div class='recipe-ingredients'>
          ${recipe.ingredients}
        </div>
        <div class='recipe-image'>
          <a href=${recipe.href}><img src=${recipe.thumbnail || 'http://via.placeholder.com/350x150'}  </a>
      </div>
    `
    // append the one recipe to all the search results
    recipeResultsContent += htmlForNewRecipe;
  });
  // update the page
  divForSearchResults.innerHTML = recipeResultsContent;
}
