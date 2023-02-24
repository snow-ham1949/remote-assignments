// requestSync.js
const url = "https://api.appworks-school-campus3.online/api/v1/clock/delay";
var request = require('sync-request');

function requestSync(url) {
  var res = request('GET', url);
  console.log(res.getBody());
}
requestSync(url) // would print out the execution time
requestSync(url)
requestSync(url)