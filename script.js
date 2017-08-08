let url = 'http://recipepuppyproxy.herokuapp.com/api/?q=omelet';

let divForSearchResults = document.querySelector('.search-results');
let inputSearchTerm = document.querySelector('#search-term');
let searchButton = document.querySelector('#search-button');

searchButton.addEventListener('click', (event) => {
  // grab the contents of the search field
  let searchString = inputSearchTerm.value;
  console.log(searchString);
})

fetch(url)
  .then( (response) => {
    return response.json();
  })
  .then( (data) => {
    console.log(data);
  })
