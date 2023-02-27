const url = "https://api.appworks-school-campus3.online/api/v1/clock/delay";
const XMLHttpRequest = require('xhr2');
const request = require('request');

function requestCallback(url, callback) {
  const startTime = Date.now();
  request(url, (err, res, body) => {
    callback(`error: ${err}`);
    callback(`stausCode: ${res.statusCode}`);
    callback(`execution time: ${JSON.parse(body).data.now / 1000000 - startTime}`);
  })
}
function requestPromise(url) {
  const startTime = Date.now();
  return new Promise((resolve, reject)=> {
    const req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function() {
      if (req.status == 200) {
        const executionTime = JSON.parse(req.response).data.now / 1000000 - startTime;
        resolve(executionTime);
      } else {
        reject(new Error(req));
      }
    };
    req.send();
  });
}
async function requestAsyncAwait(url) {
  let res = await requestPromise(url);
  return res;
}
requestCallback(url, console.log); // would print out the execution time
requestPromise(url).then(console.log);
requestAsyncAwait(url);