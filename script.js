// let url = 'http://recipepuppyproxy.herokuapp.com/api/?q=omelet';
let url = 'https://recipepuppyproxy.herokuapp.com/api/?q=';

let sampleSearch = `{"title":"Recipe Puppy","version":0.1,"href":"http://www.recipepuppy.com/","results":
[{"title":"Biscuit Topped Steak Pie","href":"http://www.recipezaar.com/Biscuit-Topped-Steak-Pie-82443","ingredients":"potato, beef gravy, black pepper, vegetable, biscuit, sirloin steak, thyme","thumbnail":"http://img.recipepuppy.com/169916.jpg"},
 {"title":"German Restaurant Steak","href":"http://www.recipezaar.com/German-Restaurant-Steak-229367","ingredients":"butter, onions, black pepper, rib eye steak, salt, salt, sour cream","thumbnail":"http://img.recipepuppy.com/35287.jpg"},
 {"title":"Barbara's Flank Steak Dinner","href":"http://www.recipezaar.com/Barbaras-Flank-Steak-Dinner-218830","ingredients":"black pepper, butter, rice, beef, corn, red pepper, salt, green onion, mushroom, water","thumbnail":"http://img.recipepuppy.com/141326.jpg"},
 {"title":"Basic Steak Sandwich","href":"http://www.recipezaar.com/Basic-Steak-Sandwich-226955","ingredients":"barbecue sauce, bread, mushroom, black pepper, salt, sirloin steak, vegetable oil, yellow onions","thumbnail":""},
 {"title":"Buccaneer's Turtle Steak, Cayman Brac Style","href":"http://www.recipezaar.com/Buccaneers-Turtle-Steak-Cayman-Brac-Style-341596","ingredients":"coconut, thyme, lime juice, garlic powder, garlic powder, rum, black pepper, sauce, red pepper, salt, tomato, green pepper, worcestershire sauce, yellow onions","thumbnail":""},{"title":"Margarita-style Drunken Steak Recipe","href":"http://www.grouprecipes.com/68987/margarita-style-drunken-steak.html","ingredients":"tequila, triple sec, sirloin steak, cilantro, sugar, cumin, cayenne","thumbnail":""},
 {"title":"Steak Fingers for Rare Steak Lovers","href":"http://www.recipezaar.com/Steak-Fingers-for-Rare-Steak-Lovers-141402","ingredients":"flour, black pepper, sirloin steak, soy sauce","thumbnail":"http://img.recipepuppy.com/615817.jpg"}
]}`;

let sampleSearchJSON = JSON.parse(sampleSearch);

let divForSearchResults = document.querySelector('.search-results');
let inputSearchTerm = document.querySelector('#search-term');
let searchButton = document.querySelector('#search-button');

// uncomment this to load some default data.
// updatePageContents(sampleSearchJSON);

function process(value) {
  return encodeURIComponent(value.toLowerCase().replace(/[^a-z0-9 _-]+/gi, '-'));
}

searchButton.addEventListener('click', (event) => {
  // grab the contents of the search field
  let searchString = inputSearchTerm.value;
  // clear the input for next input
  inputSearchTerm.value = '';
  inputSearchTerm.focus();
  console.log(`User searched for: ${searchString}`);

  let newSearchURL = url + process(searchString);
  searchForRecipes(newSearchURL);
})

function searchForRecipes(url) {
  fetch(url)
    .then( (response) => {
      // check the server's response
      if ( response.status == 200 ) {
        return response.json();
      } else {
        reject('Server Error');
      }
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
          <a href='${recipe.href}'><img src='${recipe.thumbnail || 'http://via.placeholder.com/100x80'}'>  </a>
        </div>
      </div>
    `
    // append the one recipe to all the search results
    recipeResultsContent += htmlForNewRecipe;
  });
  // update the page
  divForSearchResults.innerHTML = recipeResultsContent;
}
