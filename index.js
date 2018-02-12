// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");

var $datetimeInput = document.querySelector("#datetime");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $commentInput = document.querySelector("#comment");
var $durationMinutesInput = document.querySelector("#durationMinutes");

var $datetimeSearch = document.querySelector("#datetimeSearch");
var $citySearch = document.querySelector("#citySearch");
var $stateSearch = document.querySelector("#stateSearch");
var $countrySearch = document.querySelector("#countrySearch");
var $shapeSearch = document.querySelector("#shapeSearch");

var $submitBtn = document.querySelector("#submit");
var $searchBtn = document.querySelector("#search");
var $resetBtn = document.querySelector("#reset");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
// Add an event listener to the submitButton, call handleSubmitClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);
$submitBtn.addEventListener("click", handleSubmitButtonClick);
$resetBtn.addEventListener("click", handleResetButtonClick);

// Set filteredAddresses to addressData initially
var filteredAddresses = dataSet;

// renderTable renders the filteredAddresses to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredAddresses.length; i++) {
    // Get get the current address object and its fields
    var address = filteredAddresses[i];
    var fields = Object.keys(address);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = address[field];
    }
  }
}

function handleSubmitButtonClick(event) {
  // The default behavior of a button clicked inside of a form is to try to submit the form somewhere (which we don't want)
  event.preventDefault();

  //Method 1: Create a newSigting object that will hold the data and push to filteredAddresses dataset
  // var newSighting = {
  //   datetime: $datetimeInput.value.trim(),
  //   city: $cityInput.value.trim(),
  //   state: $stateInput.value.trim(),
  //   country: $countryInput.value.trim(),
  //   shape: $shapeInput.value.trim(),
  //   durationMinutes: $durationMinutesInput.value.trim(),
  //   comment: $commentInput.value.trim()
  // };
  // filteredAddresses.push(newSighting);

  //Method 2: Append Input values into html table
  var datetime =  $datetimeInput.value.trim();
  var city = $cityInput.value.trim();
  var state = $stateInput.value.trim();
  var country =  $countryInput.value.trim();
  var shape = $shapeInput.value.trim();
  var durationMinutes = $durationMinutesInput.value.trim();
  var comment = $commentInput.value.trim();
  var rows = "";
  rows += "<td>" + datetime + "</td><td>" + city + "</td><td>" + state + "</td><td>" + country + "</td><td>" + shape + "</td><td>" + durationMinutes + "</td><td>" + comment + "</td>";
  var tr = document.createElement("tr");
  tr.innerHTML = rows;
  $tbody.appendChild(tr)

  // Clear the input fields
  $datetimeInput.value = "";
  $cityInput.value = "";
  $stateInput.value = "";
  $countryInput.value = "";
  $shapeInput.value = "";
  $durationMinutesInput.value = "";
  $commentInput.value = "";

}

// function handleSearchButtonClick() {
  
//   // Format the user's search by removing leading and trailing whitespace, lowercase the string
//   var filterDatetime = $datetimeSearch.value.trim().toLowerCase();

//   // Set filteredAddresses to an array of all addresses whose "state" matches the filter
//   filteredAddresses = dataSet.filter(function(address) {
//     var addressDatetime = address.datetime.toLowerCase();
//     // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
//     return addressDatetime === filterDatetime;
//   });
//   renderTable();
// }

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  
  var filterDatetime = $datetimeSearch.value.trim().toLowerCase();
  var filterCity = $citySearch.value.trim().toLowerCase();
  var filterState = $stateSearch.value.trim().toLowerCase();
  var filterCountry = $countrySearch.value.trim().toLowerCase();
  var filterShape = $shapeSearch.value.trim().toLowerCase();

  // Set filteredAddresses to an array of all addresses who's "state" matches the filter
  filteredAddresses = dataSet.filter(function(address) {
    var addressDatetime = address.datetime.toLowerCase();
    var addressCity = address.city.toLowerCase();
    var addressState = address.state.toLowerCase();
    var addressCountry = address.country.toLowerCase();
    var addressShape = address.shape.toLowerCase();
    
    if (addressDatetime === filterDatetime && addressCity === filterCity && addressState === filterState && addressCountry === filterCountry && addressShape === filterShape) {
      return true;
    }
    return false;
  });
  renderTable();
}

function handleResetButtonClick() {
  $datetimeSearch.value = "";
  $citySearch.value = "";
  $stateSearch = "";
  $countrySearch = "";
  $shapeSearch = "";
  filteredAddresses = dataSet;
  renderTable();
}

// Render the table for the first time on page load
renderTable();
