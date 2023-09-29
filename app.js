const hours = [
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
];

// get the table from the HTML so we can add rows
const table = document.getElementById("salesData");

// give a random number between two numbers
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// CookieStore Factory. It makes CookieStore objects
function CookieStore(location, minCust, maxCust, average) {
  this.location = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookiesPerCust = average;
  this.customersPerHour = [];
  this.cookiesPerHour = [];
  this.totalCookieSold = 0;
}

CookieStore.prototype.calculateSales = function () {
  for (let i = 0; i < hours.length; i++) {
    // get the number of customers for this hour
    const hourCustomers = randomNumber(this.minCust, this.maxCust);
    this.customersPerHour.push(hourCustomers);

    // get the number of cookies sold this hour
    const hourCookiesSold = Math.floor(hourCustomers * this.avgCookiesPerCust);
    this.cookiesPerHour.push(hourCookiesSold);

    // increase the total cookies by adding this hours sales to it
    this.totalCookieSold = this.totalCookieSold + hourCookiesSold;
  }
};

CookieStore.prototype.render = function () {
  // calculating sales data before rendering
  this.calculateSales();

  // create a row
  const tr = document.createElement("tr");

  // add the store name to the row
  const th = document.createElement("th");
  th.textContent = this.location;
  tr.appendChild(th);

  // add this store's data to that row
  for (let i = 0; i < this.cookiesPerHour.length; i++) {
    // create a new td and put the sales number in it
    const td = document.createElement("td");
    td.textContent = this.cookiesPerHour[i];
    tr.appendChild(td);
  }

  // add the total to the end of the row
  const totalTd = document.createElement("td");
  totalTd.textContent = this.totalCookieSold;
  tr.appendChild(totalTd);

  // add that row to the table
  table.appendChild(tr);
};

// create our store objects in an array
const stores = [
  new CookieStore("Seattle", 23, 65, 6.3),
  new CookieStore("Tokyo", 3, 24, 1.2),
  new CookieStore("Dubai", 11, 38, 3.7),
  new CookieStore("Paris", 20, 38, 2.3),
  new CookieStore("Lima", 2, 16, 4.6),
];

// claculate sales for each store (commented out because the calculate sales in the render method)
// seattle.calculateSales()
// tokyo.calculateSales()
// dubai.calculateSales()
// paris.calculateSales()
// lima.calculateSales()

// render the header row
// create the tr
const headerRow = document.createElement("tr");
const blankTd = document.createElement("td");
headerRow.appendChild(blankTd);

// add each time in a th
for (let i = 0; i < hours.length; i++) {
  const th = document.createElement("th");
  th.textContent = hours[i];
  headerRow.appendChild(th);
}

// add a total heading
const totalHeading = document.createElement("th");
totalHeading.textContent = "Total";
headerRow.appendChild(totalHeading);

// add the row to the table
table.appendChild(headerRow);

// render each store on the page
for (let i = 0; i < stores.length; i++) {
  stores[i].render();
}

// get the form dom NODE
const form = document.querySelector("form");

// add the event listener
form.addEventListener("submit", function (event) {
  // prevent the page from reloading
  event.preventDefault();
  //get the users input
  const location = event.target.location.value;
  const minCust = event.target.minCust.value;
  const maxCust = event.target.maxCust.value;
  const avgCookiesPerCust = event.target.avgCookiesPerCust.value;

  //create a new cookie store
  const newStore = new CookieStore(
    location,
    +minCust,
    +maxCust,
    +avgCookiesPerCust
  );

  // render the new store
  newStore.render();
  renderTotalRow();
});

// stores need to be in an array
function renderTotalRow() {
  const oldTr = document.getElementById("totalrow");
  oldTr?.remove();
  // make a new tr
  const tr = document.createElement("tr");
  //add a total row heading
  const th = document.createElement("th");
  th.textContent = "Hourly Total";
  tr.appendChild(th);
  for (let i = 0; i < hours.length; i++) {
    let hourlyTotal = 0;
    for (let k = 0; k < stores.length; k++) {
      hourlyTotal = hourlyTotal + stores[k].cookiesPerHour[i];
    }

    const td = document.createElement("td");
    td.textContent = hourlyTotal;
  }

  table.appendChild(tr);
}

renderTotalRow();

// const form = document.querySelector("form");
// const salesDataTable = document.querySelector("#salesData"); //select the existing table with the ID "salesData" using querySelector.
// form.addEventListener("submit", function (event) {
// event.preventDefault();
// const location = event.target.location.value;
// const newRow = document.createElement("tr"); //create a new table row (newRow) and a table data cell (locationCell) to hold the location data
// const locationCell = document.createElement("td");
// locationCell.textContent = location; //set the text content of the locationCell to the location value obtained from the form
// newRow.appendChild(locationCell); //append the newRow to the existing table with the ID "salesData."
// salesDataTable.appendChild(newRow);
// event.target.location.value = ""; //clear the form input field after submission
// });

//This code captures form submission, prevents the default page refresh behavior, extracts form data, creates a new table row and table data cell, populates the cell with the location data, and appends the row to an existing table in the HTML document.
