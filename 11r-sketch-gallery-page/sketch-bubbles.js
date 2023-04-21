let bubbles = [];
let totalNum = 100; // Decide the number of particles here.

function setup() {
  let canvas = createCanvas(windowWidth, 500);
  canvas.parent("canvasContainer");
  for (let i = 0; i < totalNum; i++) {
    bubbles[i] = new Bubble(random(0, 600), random(0, 600));
  }
}

function appearOnHover() {
  if (abs(dist(mouseX, mouseY, pmouseX, pmouseY)) > 20) {
    bubbles.push(new Bubble(mouseX, mouseY));
  }
}

function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY));
}

function draw() {
  background(0, 50);

  appearOnHover();

  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].moveFrom();
    bubbles[i].changeColors();
    if (bubbles[i].popIfHovered() !== "pop") {
      bubbles[i].display();
    } else {
      bubbles.splice(i, 1);
    }
  }
  if (bubbles.length > totalNum + 50) {
    bubbles.splice(0, 1);
  } else {
    bubbles.push(new Bubble(random(0, width), random(0, height)));
  }
  noStroke();
  fill(255, 255, 0, 10);
  circle(mouseX, mouseY, 60);
  fill(255, 255, 0);
  triangle(
    mouseX - 10,
    mouseY + 10,
    mouseX,
    mouseY - 10,
    mouseX + 10,
    mouseY - 10
  );
}

class Bubble {
  //  Constructor Function:properties
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dia = 30;
    this.xSpd = 0;
    this.ySpd = 0;
    this.size = random(-1, 30);
    this.r = random(150, 255);
    this.g = random(50, 100);
    this.b = random(150, 255);
    this.alpha = 10;
  }

  // methods
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;

    this.xSpd = random(0.5, -0.5);
    this.ySpd = random(-1, 0.5);
  }

  //  Particle's appearance
  display() {
    push();
    translate(this.x, this.y);

    fill(this.r, this.g, this.b, this.alpha);
    stroke(this.r, this.g, this.b, this.alpha + 10);
    circle(0, 0, this.size);

    pop();
  }
  moveFrom() {
    let moveAmount = 0.5;
    if (mouseX > this.x) {
      this.x -= moveAmount;
    } else if (mouseX < this.x) {
      this.x += moveAmount;
    }
    if (mouseY > this.y) {
      this.y -= moveAmount;
    } else if (mouseY < this.y) {
      this.y += moveAmount;
    }
  }
  popIfHovered() {
    if (dist(mouseX, mouseY, this.x, this.y) <= this.size) {
      return "pop";
    }
  }
  changeColors() {
    this.alpha = map(
      dist(this.x, this.y, mouseX, mouseY),
      0,
      width / 2,
      100,
      0
    );
  }
}
