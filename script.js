let url = 'http://recipepuppyproxy.herokuapp.com/api/?q=omelet';

let divForSearchResults = document.querySelector('.search-results');

fetch(url)
  .then( (response) => {
    return response.json();
  })
  .then( (data) => {
    console.log(data);
  })
