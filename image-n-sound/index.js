let img;

function preload() {
  img = loadImage(
    "assets/07tylerkevin-review1-videoSixteenByNineJumbo1600.jpg"
  );
}

function setup() {
  createCanvas(400);
  background(220);
}

function draw() {
  image(img, 0, 0);
  text("lol", 0, 0);
}
