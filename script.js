// let url = 'http://recipepuppyproxy.herokuapp.com/api/?q=omelet';
let url = 'http://recipepuppyproxy.herokuapp.com/api/?q=';

let sampleSearch = `{"title":"Recipe Puppy","version":0.1,"href":"http://www.recipepuppy.com/","results":
[{"title":"Biscuit Topped Steak Pie","href":"http://www.recipezaar.com/Biscuit-Topped-Steak-Pie-82443","ingredients":"potato, beef gravy, black pepper, vegetable, biscuit, sirloin steak, thyme","thumbnail":"http://img.recipepuppy.com/169916.jpg"},
 {"title":"Biscuit Topped Steak Pie","href":"http://www.recipezaar.com/Biscuit-Topped-Steak-Pie-82443","ingredients":"potato, beef gravy, black pepper, vegetable, biscuit, sirloin steak, thyme","thumbnail":"http://img.recipepuppy.com/169916.jpg"},
 {"title":"Biscuit Topped Steak Pie","href":"http://www.recipezaar.com/Biscuit-Topped-Steak-Pie-82443","ingredients":"potato, beef gravy, black pepper, vegetable, biscuit, sirloin steak, thyme","thumbnail":"http://img.recipepuppy.com/169916.jpg"},
 {"title":"Biscuit Topped Steak Pie","href":"http://www.recipezaar.com/Biscuit-Topped-Steak-Pie-82443","ingredients":"potato, beef gravy, black pepper, vegetable, biscuit, sirloin steak, thyme","thumbnail":"http://img.recipepuppy.com/169916.jpg"},
 {"title":"Biscuit Topped Steak Pie","href":"http://www.recipezaar.com/Biscuit-Topped-Steak-Pie-82443","ingredients":"potato, beef gravy, black pepper, vegetable, biscuit, sirloin steak, thyme","thumbnail":"http://img.recipepuppy.com/169916.jpg"},
 {"title":"Biscuit Topped Steak Pie","href":"http://www.recipezaar.com/Biscuit-Topped-Steak-Pie-82443","ingredients":"potato, beef gravy, black pepper, vegetable, biscuit, sirloin steak, thyme","thumbnail":"http://img.recipepuppy.com/169916.jpg"}
]}`;

let sampleSearchJSON = JSON.parse(sampleSearch);

let divForSearchResults = document.querySelector('.search-results');
let inputSearchTerm = document.querySelector('#search-term');
let searchButton = document.querySelector('#search-button');

updatePageContents(sampleSearchJSON);



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
      console.log(JSON.stringify(data));
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
          <a href=${recipe.href}><img src=${recipe.thumbnail || 'http://via.placeholder.com/100x80'}  </a>
        </div>
      </div>
    `
    // append the one recipe to all the search results
    recipeResultsContent += htmlForNewRecipe;
  });
  // update the page
  divForSearchResults.innerHTML = recipeResultsContent;
}
