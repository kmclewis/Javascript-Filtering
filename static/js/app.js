// from data.js
var tableData = data;

// YOUR CODE HERE!
var submit = d3.select("#filter-btn");
var tbody = d3.select("tbody");
var empty = d3.select("tbody");

// creating an array to hold ufo shapes for filtering
ufoShapes = [];
JSON.stringify(data, (key, value) => {
  if (key === 'shape') ufoShapes.push(value);
  return value;
});
// creating an array of unique ufo shape values
var objectShape = Array.from(new Set(ufoShapes));
// creating a alphabetically sorted array of ufo shapes
var sortedShapes = objectShape.sort();

// creating the data for the dropdown menu
var select = document.getElementById("sortedShapes");
var options = sortedShapes;
for(var i = 0; i < options.length; i++) { 
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
  }

// creating an array to hold countries for filtering
countryList = [];
JSON.stringify(data, (key, value) => {
  if (key === 'country') countryList.push(value);
  return value;
});
// creating an array of unique values
var countryName = Array.from(new Set(countryList));

// creating the data for the dropdown menu
var select = document.getElementById("countryName");
var options = countryName;
for(var i = 0; i < options.length; i++) { 
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
  }

// printing the complete dataset to the console log
console.log(data);
// creating the filter function
submit.on("click", function() {
 
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input element and get the raw HTML node
  var inputDate = d3.select("#datetime");
  var inputCity = d3.select("#city");
  var inputState = d3.select("#state");
  var inputCountry = d3.select("#countryName");
  var inputShape = d3.select("#sortedShapes");

  // Get the value property of the input element
  var dateValue = inputDate.property("value");
  var cityValue = inputCity.property("value").toLowerCase();
  var stateValue = inputState.property("value").toLowerCase();
  var countryValue = inputCountry.property("value");
  var shapeValue = inputShape.property("value");
// creating variables to hold filtered data
  var dateFilter = tableData.filter(info => info.datetime === dateValue);
  var cityFilter = tableData.filter(info => info.city === cityValue);    
  var stateFilter = tableData.filter(info => info.state === stateValue);  
  var countryFilter = tableData.filter(info => info.country === countryValue);  
  var shapeFilter = tableData.filter(info => info.shape === shapeValue);
 
  // if statements that return table data depending on the user's inputs.
  // If this if condition is met, search results will be returned for a date
  if(dateFilter.length>0){
    // clearing the search box once the form has been submitted 
    d3.select("#datetime").node().value="";
    // removing any data that may have already been returned from a previous search
    empty.html("");
    // function to return and append data to the table based on the user's input
    dateFilter.forEach((sightingEvent) => {
    var row = tbody.append("tr");
    Object.entries(sightingEvent).forEach(([key, value]) => {
    var cell = row.append("td");
    cell.text(value);      
    });
  }); 
  // If this if condition is met, search results will be returned for a state
  } else if(stateFilter.length>0){
      d3.select("#state").node().value="";
      empty.html("");
      stateFilter.forEach((sightingEvent) => {
      var row = tbody.append("tr");
      Object.entries(sightingEvent).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  }); 
  // If this if condition is met, search results will be returned for a country
    } else if(countryFilter.length>0){
      d3.select("#countryName").node().value="";
      empty.html("");
      countryFilter.forEach((sightingEvent) => {
      var row = tbody.append("tr");
      Object.entries(sightingEvent).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  }); 
  // If this if condition is met, search results will be returned for a ufo shape description
      } else if(shapeFilter.length>0){
        d3.select("#sortedShapes").node().value="";
        empty.html("");
        shapeFilter.forEach((sightingEvent) => {
        var row = tbody.append("tr");
        Object.entries(sightingEvent).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
      });
    }); 
// The else statement is more like an if statement and will return search results for city input 
}  else {
    d3.select("#city").node().value="";
    empty.html("");
    cityFilter.forEach((sightingEvent) => {
    var row = tbody.append("tr");
    Object.entries(sightingEvent).forEach(([key, value]) => {
    var cell = row.append("td");
    cell.text(value);
    });
  });  
}
});  
