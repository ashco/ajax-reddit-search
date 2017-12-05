// Set up the page when it loads.
$(function() {
  // attach the form submission to the search function
  $('#search-form').on('submit', search);
});

function search(event) {
  // Stop the form from refreshing the page by default.
  event.preventDefault();

  clearSearchResults();

  // Get the users search input and save it in a variable.
  // Use the input placeholder value (like "kittens") as a default value.
  //|| 'kittens' works because a blank .val() is falsy, will default to ||
  var userInput = $('#query').val() || 'corgi';
  console.log('user input was', userInput);

  $.get('https://www.reddit.com/search.json', {
    q: userInput,
    limit: 10
  }).done(function(response) {
    console.log(response.data.children);
    addSearchResult(response.data.children);
  });
}


// Clear previous search results.
function clearSearchResults() {
  //TO DO
  $('#results').html('');
}

// Adds a single result object to the page.
function addSearchResult(results) {
  for(var i = 0; i < results.length; i++){
    console.log(results[i].data.title);
  // Create a list item to contain the search result link
    var div = document.createElement('div');
    var img = document.createElement('img');
    var li = document.createElement('li');
    var a = document.createElement('a');
    var ups = document.createElement('p');


    div.class = ('post' + i);
    img.src = results[i].data.thumbnail;
    a.href = results[i].data.url
    a.textContent = results[i].data.title;
    ups.textContent = results[i].data.ups + " points"
  // put the link inside the list item.
    $(div).append(img);
    $(div).append(li);
    $(li).append(a);
    $(li).append(ups);
  // add the list item to the list of search results
    $('#results').append(div);
  }
}
