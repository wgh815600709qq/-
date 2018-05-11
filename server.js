var express = require('express');
var request = require('request');
var app = express();
var schedule = require('node-schedule');
function scheduleCronstyle(){
    schedule.scheduleJob('00 58 11 * * *', function() { // 每天的11点58分00秒触发
        if (new Date().getDay() > 0  && new Date().getDay() < 6) { // 工作日
          sendMsg();
        }
    }); 
}

function sendMsg () {
  var options = {
      headers: 
        {
          "charset": "UTF-8",
          "content-type": "application/json"
        },
        url: 'https://oapi.dingtalk.com/robot/send?access_token=d7a7e2a016c04959e636b2323f6cf5485f0effebd0b2a7ece030f3a764218ca0',
        method: 'POST',
        json: true,
        body: {
           "msgtype": "text",
           "text": {
               "content": "你的快递到了四楼了,速去领取下"
           },
           "at": {
               "isAtAll": true
           }
       }
  };
  request(options, function(res) {
    console.log('res')
  })
}

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 8888
app.listen(port, host)// Listen the server
scheduleCronstyle();