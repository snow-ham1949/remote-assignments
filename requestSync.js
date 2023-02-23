// requestSync.js
const url = "https://api.appworks-schoolcampus3.online/api/v1/clock/delay";
const XMLHttpRequest = require('xhr2');

function requestSync(url) {
  var httpRequest = new XMLHttpRequest(); 
  httpRequest.open("GET", url, true); 
  httpRequest.send(); 
}
requestSync(url) // would print out the execution time
requestSync(url)
requestSync(url)