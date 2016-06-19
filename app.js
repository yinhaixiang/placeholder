var http = require('http');
var Canvas = require('canvas');
var port = 3007;

var defaultColors = [
  'aliceblue',
  'antiquewhite',
  'aqua',
  'aquamarine',
  'azure',
  'beige',
  'bisque',
  'black',
  'blanchedalmond',
  'blue',
  'blueviolet',
  'brown',
  'burlywood',
  'cadetblue',
  'chartreuse',
  'chocolate',
  'coral',
  'cornflowerblue',
  'cornsilk',
  'crimson',
  'cyan',
  'darkblue',
  'darkcyan',
  'darkgoldenrod',
  'darkgray',
  'darkgreen',
  'darkgrey',
  'darkkhaki',
  'darkmagenta',
  'darkolivegreen',
  'darkorange',
  'darkorchid',
  'darkred',
  'darksalmon',
  'darkseagreen',
  'darkslateblue',
  'darkslategray',
  'darkslategrey',
  'darkturquoise',
  'darkviolet',
  'deeppink',
  'deepskyblue',
  'dimgray',
  'dimgrey',
  'dodgerblue',
  'firebrick',
  'floralwhite',
  'forestgreen',
  'fuchsia',
  'gainsboro',
  'ghostwhite',
  'gold',
  'goldenrod',
  'gray',
  'green',
  'greenyellow',
  'grey',
  'honeydew',
  'hotpink',
  'indianred',
  'indigo',
  'ivory',
  'khaki',
  'lavender',
  'lavenderblush',
  'lawngreen',
  'lemonchiffon',
  'lightblue',
  'lightcoral',
  'lightcyan',
  'lightgoldenrodyellow',
  'lightgray',
  'lightgreen',
  'lightgrey',
  'lightpink',
  'lightsalmon',
  'lightseagreen',
  'lightskyblue',
  'lightslategray',
  'lightslategrey',
  'lightsteelblue',
  'lightyellow',
  'lime',
  'limegreen',
  'linen',
  'magenta',
  'maroon',
  'mediumaquamarine',
  'mediumblue',
  'mediumorchid',
  'mediumpurple',
  'mediumseagreen',
  'mediumslateblue',
  'mediumspringgreen',
  'mediumturquoise',
  'mediumvioletred',
  'midnightblue',
  'mintcream',
  'mistyrose',
  'moccasin',
  'navajowhite',
  'navy',
  'oldlace',
  'olive',
  'olivedrab',
  'orange',
  'orangered',
  'orchid',
  'palegoldenrod',
  'palegreen',
  'paleturquoise',
  'palevioletred',
  'papayawhip',
  'peachpuff',
  'peru',
  'pink',
  'plum',
  'powderblue',
  'purple',
  'red',
  'rosybrown',
  'royalblue',
  'saddlebrown',
  'salmon',
  'sandybrown',
  'seagreen',
  'seashell',
  'sienna',
  'silver',
  'skyblue',
  'slateblue',
  'slategray',
  'slategrey',
  'snow',
  'springgreen',
  'steelblue',
  'tan',
  'teal',
  'thistle',
  'tomato',
  'turquoise',
  'violet',
  'wheat',
  'white',
  'whitesmoke',
  'yellow',
  'yellowgreen'
];


http.createServer(function (req, res) {
  if (req.url === '/favicon.ico') {
    return res.end();
  }
  var pathArr = req.url.split('/').slice(1);
  var size = pathArr[0].replace('X', 'x');
  var bgcolor = (defaultColors.indexOf(pathArr[1]) > -1) ? pathArr[1] : ('#' + (pathArr[1] || 'A7E59B'));
  var color = (defaultColors.indexOf(pathArr[2]) > -1) ? pathArr[2] : ('#' + (pathArr[2] || '666666'));

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
  var fontSize = getFontSize(width, height);
  ctx.font = fontSize + 'px Arial';
  ctx.fillStyle = color;
  var m = ctx.measureText(text);
  ctx.fillText(text, width / 2 - m.width / 2, height / 2 + fontSize / 2);

  //测试文字区块位置
  //ctx.strokeStyle = 'blue';
  //ctx.strokeRect(width / 2 - m.width/2, height / 2 - 15, m.width, 30);


  var buf = canvas.toDataURL();
  var base64Data = buf.replace(/^data:image\/\w+;base64,/, '');
  var dataBuffer = new Buffer(base64Data, 'base64');

  return res.end(dataBuffer);
}).listen(port);

function getFontSize(width, height) {
  var tmpWidth = Math.round(width / 10);
  var tmpHeight = Math.round(height / 10);
  var fontSize = tmpHeight < tmpWidth ? tmpHeight : tmpWidth;
  if (fontSize < 12) {
    fontSize = 12;
  }
  return fontSize;
}


console.log('server is ok on', port);