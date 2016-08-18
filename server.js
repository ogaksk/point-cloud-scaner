var io = require('socket.io').listen(3000),
    fs = require('fs');

var dataCount = 0;

var saveData = function(data) {
  var date = new Date();
  data.timestamp =  date.getTime();
  fs.appendFile('depthdata.json',"\""+dataCount+"\":"+JSON.stringify(data, null, '    ')+',\n');
  dataCount += 1;
}

io.sockets.on('connection', function(socket) {
  socket.on('depthdata', function(data) {
    saveData(data);
  });
});