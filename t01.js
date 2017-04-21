function randomColor() {
  var color = '#';
  for (var i = 0; i < 3; i++) {
    var hex = Math.floor(Math.random() * (255 + 1)).toString(16);
    color += (hex.length == 1 ? '0' + hex : hex);
  }
  return color;
}

console.log(randomColor());