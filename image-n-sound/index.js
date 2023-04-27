let img;

function preload() {
  img = loadImage("assets/20190917-Tyler-01.webp");
}

function setup() {
  createCanvas(1000, 1000);
  background(220);
}

function draw() {
  tint(200, 200, 0);
  image(img, 0, 0);
}
