const url = "https://api.appworks-school-campus3.online/api/v1/clock/delay";
const XMLHttpRequest = require('xhr2');
const request = require('request');

function requestCallback(url, callback) {
  request(url, (err, res, body) => {
    callback('error: ', err);
    callback('stausCode: ', res.statusCode);
    callback('body: ', body);
  })
}
function requestPromise(url) {
  return new Promise((resolve, reject)=> {
    const req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function() {
      if (req.status == 200) {
        // 使用 resolve 回傳成功的結果，也可以在此直接轉換成 JSON 格式
        resolve(JSON.parse(req.response));
      } else {
        // 使用 reject 自訂失敗的結果
        reject(new Error(req))
      }
    };
    req.send();
  });
}
async function requestAsyncAwait(url) {
  let res = await requestPromise(url);
  return res;
}
// requestCallback(url, console.log); // would print out the execution time
// requestPromise(url).then(console.log);
requestAsyncAwait(url);