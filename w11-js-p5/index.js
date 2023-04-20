function showAlert() {
  alert("Hey");
}

//p5

// function setup() {
//   createCanvas(windowWidth, 400);
//   background(0);
// }

// function draw() {
//   fill(255);
//   circle(mouseX, mouseY, 20);
// }
function setup() {
  createCanvas(windowWidth, 5);
  background(0);
}

function draw() {
  fill(map(mouseX, 0, width, 0, 255));
  rect(0, 0, width, height);
}
