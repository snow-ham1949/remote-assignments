// requestSync.js
const url = "https://api.appworks-school-campus3.online/api/v1/clock/delay";
var request = require('sync-request');

function requestSync(url) {
  const startTime = Date.now();
  var res = request('GET', url);
  let currentTime = JSON.parse(res.getBody()).data.now;
  currentTime /= 1000000;
  console.log(`${currentTime - startTime}`);
}
requestSync(url) // would print out the execution time
requestSync(url)
requestSync(url)