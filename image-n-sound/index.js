let img;

function preload() {
  img = loadImage("assets/120-1207564_tyler-the-creator-earfquake.jpg");
}

function setup() {
  createCanvas(1000, 1000);
  background(220);
}

function draw() {
  //   tint(frameCount % 100, frameCount % 50, frameCount % 255);
  //   filter(INVERT);
  image(img, 0, 0, 1000, 650);
  filter(THRESHOLD, 0.2);
}
