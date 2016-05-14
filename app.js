var http = require('http');
var Canvas = require('canvas');
var port = 3007;

http.createServer(function (req, res) {
  if (req.url === '/favicon.ico') {
    return;
  }
  var pathArr = req.url.split('/').slice(1);
  var size = pathArr[0].replace('X', 'x');
  var bgcolor = '#' + (pathArr[1] || 'A7E59B');
  var color = '#' + (pathArr[2] || '84B67B');


  var width;
  var height;
  if (size && size.includes('x')) {
    var sizeArr = size.split('x');
    width = +sizeArr[0];
    height = +sizeArr[1];
  } else if (size) {
    width = +size;
    height = +size;
  } else {
    width = 300;
    height = 300;
  }

  var text = decodeURIComponent(pathArr[3] || '') || (width + 'x' + height);

  var canvas = new Canvas(width, height);
  var ctx = canvas.getContext('2d');

  //绘制矩形
  ctx.fillStyle = bgcolor;
  ctx.fillRect(0, 0, width, height);

  //绘制文字
  ctx.font = '30px Arial';
  ctx.fillStyle = color;
  var m = ctx.measureText(text);
  ctx.fillText(text, width / 2 - m.width / 2, height / 2 + 15);

  //测试文字区块位置
  //ctx.strokeStyle = 'blue';
  //ctx.strokeRect(width / 2 - m.width/2, height / 2 - 15, m.width, 30);


  var buf = canvas.toDataURL();
  var base64Data = buf.replace(/^data:image\/\w+;base64,/, '');
  var dataBuffer = new Buffer(base64Data, 'base64');

  return res.end(dataBuffer, 'binary');
}).listen(port);

console.log('server is ok on', port);