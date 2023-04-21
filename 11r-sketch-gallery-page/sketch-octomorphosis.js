let start = false;
let gameMode = "play";
let fileName = 1;
let bubblesMode = true;

//the creatures
let initCreaturesNum = 5;
let creaturesArray = [];
let maxLenOfTInit = 100;

//the bubbles
let bubbles = [];
let totalNum = 80;
let spdXB = 1;
let spdYB = 1;
//the sin

let sinArray = [];
let cosArray = [];
let sinDetail = 100;

let colorChange = [0, 0, 0];

let img;

function setup() {
  let canvas = createCanvas(windowWidth, 600);
  canvas.parent("canvasContainer");
  //createCanvas(700, 700);
  background(0);
  //noCursor();

  for (let i = 0; i < initCreaturesNum; i++) {
    creaturesArray[i] = new Creature(
      random(maxLenOfTInit, width - maxLenOfTInit),
      random(maxLenOfTInit, height - maxLenOfTInit),
      random(7, 15),
      random(3, maxLenOfTInit)
    );
  }

  for (let i = 0; i < totalNum; i++) {
    bubbles[i] = new Bubble(
      random(0, width),
      random(0, height),
      random(2, 4),

      random(-spdXB, spdXB),
      random(-spdYB, spdYB)
    );
  }

  setFastSinAndCos();
}

function draw() {
  if (start === true) {
    if (gameMode === "play") {
      background(0, 40);
    }

    addNew();
    creaturesInteraction();
    for (let i = 0; i < creaturesArray.length; i++) {
      creaturesArray[i].display();
      creaturesArray[i].update();
      creaturesArray[i].updateLife();
      if (creaturesArray[i].isDone == true) {
        creaturesArray.splice(i, 1);
        i--;
      }
    }
    if (bubblesMode === true) {
      bubblesFunction();
    }
  } else {
    startingText();
  }

  // mouse cursor

  if (gameMode === "play" && start === true) {
    noCursor();
    push();
    blendMode(ADD); // MULTIPLY

    noStroke();
    fill(180, 100, 15, 20); // ***
    drawBlob(mouseX, mouseY, 50);

    pop();
  } else {
    cursor();
  }

  //   push();
  //   fill(0, 255, 0);
  //   text(frameRate().toFixed(2), 10, 20);
  //   pop();
}

//COOL CURSOR
function drawBlob(x, y, dia) {
  push();
  translate(x, y);
  let xAdj, yAdj;
  xAdj = mCos(frameCount * 0.1) * 5;
  yAdj = mSin(frameCount * 0.1) * 5;
  circle(xAdj, yAdj, dia);

  xAdj = mCos(frameCount * 0.11) * 5;
  yAdj = mSin(frameCount * 0.11) * 5;
  circle(xAdj, yAdj, dia);

  xAdj = mCos(frameCount * 0.09) * 5;
  yAdj = mSin(frameCount * 0.09) * 5;
  circle(xAdj, yAdj, dia);

  pop();
}

//THE SIN
function setFastSinAndCos() {
  for (let i = 0; i < sinDetail; i++) {
    let angleDeg = map(i, 0, sinDetail, 0, 360);
    let angleRad = radians(angleDeg);
    sinArray[i] = sin(angleRad);
    cosArray[i] = cos(angleRad);
  }
}

function mSin(rad) {
  let angleDeg = degrees(rad);
  let index = floor(map(angleDeg, 0, 360, 0, sinDetail)) % sinDetail;
  return sinArray[index];
}

function mCos(rad) {
  let angleDeg = degrees(rad);
  let index = floor(map(angleDeg, 0, 360, 0, sinDetail)) % sinDetail;
  return cosArray[index];
}

function mousePressed() {
  for (let i = 0; i < creaturesArray.length; i++) {
    if (
      dist(mouseX, mouseY, creaturesArray[i].x, creaturesArray[i].y) <
      creaturesArray[i].lenOfT
    ) {
      creaturesArray[i].paletteNumber = random(1, 8);
    }
  }
}

function startingText() {
  fill(255);

  textSize(20);

  text("to SEE INSTRUCTIONS press ESCAPE", width / 4, height / 4);
  text("to START press ENTER", width / 4, height / 4 + height * 0.05);

  text("to CHANGE MODE press M", width / 4, height / 4 + height * 0.25);
  text("to CHANGE COLORS press SPACE", width / 4, height / 4 + height * 0.3);
  text("to ADD/REMOVE BUBBLES press B", width / 4, height / 4 + height * 0.35);
  text("to SAVE press S", width / 4, height / 4 + height * 0.4);
}

//BUBBLES FUNCTIONS SECTION
function bubblesFunction() {
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].moveFrom();
    bubbles[i].changeColors();
    bubbles[i].defineColors();
    if (bubbles[i].popIfHovered() !== "pop") {
      bubbles[i].display();
    } else {
      bubbles.splice(i, 1);
      i--;
    }
  }
  if (bubbles.length > totalNum + 50) {
    bubbles.splice(0, bubbles.length - totalNum - 50);
  } else {
    bubbles.push(
      new Bubble(
        random(0, width),
        random(0, height),
        random(2, 4),
        random(-spdXB, spdXB),
        random(-spdYB, spdYB)
      )
    );
  }
  noStroke();
  if (gameMode === "play") {
    fill(255, 255, 0, 10);
    circle(mouseX, mouseY, 60);
  }
}

function addNew() {
  if (creaturesArray.length < initCreaturesNum) {
    creaturesArray.push(
      new Creature(
        random(maxLenOfTInit, width - maxLenOfTInit),
        random(maxLenOfTInit, height - maxLenOfTInit),
        random(7, 20),
        random(3, maxLenOfTInit)
      )
    );
  }
}

//KEYPRESSED
let drawingMode = false;

function keyPressed() {
  if (keyCode === 32) {
    for (let i = 0; i < creaturesArray.length; i++) {
      creaturesArray[i].paletteNumber = random(1, 8);
    }
  }

  if (key == "m") {
    drawingMode = !drawingMode;
    if (drawingMode) {
      start = true;
      gameMode = "draw";
      background(0);
    } else {
      start = true;
      gameMode = "play";
    }
  }

  if (key === "s") {
    saveCanvas(fileName.toString(), "jpg");
    fileName++;
  }
  if (keyCode === 27) {
    start = false;
  }
  if (keyCode === 13) {
    start = true;
  }
  if (key === "b") {
    bubblesMode = !bubblesMode;
  }
}

//UPDATE COLOR
function updateColor(dia, centerX, centerY, minSize, maxSize, paletteNumber) {
  if (paletteNumber >= 1 && paletteNumber < 2) {
    //b is 0
    colorChange[0] = map(dia, minSize, maxSize, 100, 255);
    colorChange[1] = map(
      dist(centerX, centerY, mouseX, mouseY),
      0,
      600,
      255,
      0
    );
    colorChange[2] = 0;
  } else if (paletteNumber >= 2 && paletteNumber < 3) {
    // b is 0
    colorChange[0] = map(
      dist(centerX, centerY, mouseX, mouseY),
      0,
      600,
      255,
      0
    );
    colorChange[1] = map(dia, minSize, maxSize, 100, 255);
    colorChange[2] = 0;
  } else if (paletteNumber >= 3 && paletteNumber < 4) {
    //g is 0
    colorChange[0] = map(
      dist(centerX, centerY, mouseX, mouseY),
      0,
      600,
      255,
      0
    );
    colorChange[1] = 0;
    colorChange[2] = map(dia, minSize, maxSize, 100, 255);
  } else if (paletteNumber >= 4 && paletteNumber < 5) {
    //g is 0
    colorChange[0] = map(
      dist(centerX, centerY, mouseX, mouseY),
      0,
      600,
      255,
      0
    );
    colorChange[1] = 0;
    colorChange[2] = map(dia, minSize, maxSize, 100, 255);
  } else if (paletteNumber >= 6 && paletteNumber < 7) {
    //r is 0
    colorChange[0] = 0;
    colorChange[1] = map(
      dist(centerX, centerY, mouseX, mouseY),
      0,
      600,
      255,
      0
    );
    colorChange[2] = map(dia, minSize, maxSize, 100, 255);
  } else {
    colorChange[0] = 0;
    colorChange[1] = map(dia, minSize, maxSize, 100, 255);
    colorChange[2] = map(
      dist(centerX, centerY, mouseX, mouseY),
      0,
      600,
      255,
      0
    );
  }
}

function creaturesInteraction() {
  for (let i = 0; i < creaturesArray.length - 1; i++) {
    for (let j = i + 1; j < creaturesArray.length; j++) {
      if (
        dist(
          creaturesArray[i].x,
          creaturesArray[i].y,
          creaturesArray[j].x,
          creaturesArray[j].y
        ) < min(creaturesArray[i].lenOfT, creaturesArray[j].lenOfT)
      ) {
        for (let k = 0; k < 50; k++) {
          bubbles.push(
            new Bubble(
              creaturesArray[j].x,
              creaturesArray[i].y,
              1.5,

              random(-spdXB, spdXB),
              random(-spdYB, spdYB)
            )
          );
        }
        creaturesArray.push(
          new Creature(
            creaturesArray[j].x,
            creaturesArray[i].y,
            random(7, 15),
            (creaturesArray[j].lenOfT + creaturesArray[i].lenOfT) * 0.7
          )
        );
        creaturesArray[i].isDone = true;
        creaturesArray[j].isDone = true;
        return;
      }
    }
  }
}

//CREATURE CLASS
class Creature {
  constructor(startX, startY, numOfTentacles, lenOfT) {
    this.x = startX;
    this.y = startY;

    this.spdX = random(-1, 1);
    this.spdY = random(-1, 1);
    this.size = 20;
    this.color = {
      r: 0,
      g: 0,
      b: 0,
    };
    this.numOfTentacles = numOfTentacles;
    this.maxAmpOfT = random(20, 150);
    this.maxSizeOfT = random(10, 50);
    this.minSizeOfT = random(1, 2);
    this.positionChangeCoeff = random(1, 3) * 0.01;
    this.timeChangeCoeff = random(2, 5) * 0.01;
    this.currentAngleOfT = (2 * PI) / (numOfTentacles - 1);
    this.lifespan = random(0, 3); //3
    this.speedOfDying = 0.01;
    this.currentAlpha = 100;
    this.isDone = false;
    this.paletteNumber = random(1, 8);

    this.lenOfT = lenOfT;
  }
  update() {
    this.x += this.spdX;
    this.y += this.spdY;

    if (
      this.x - this.lenOfT < 0 ||
      this.x + this.lenOfT > width ||
      this.y - this.lenOfT < 0 ||
      this.y + this.lenOfT > height
    ) {
      if (this.x - this.lenOfT < 0 || this.x + this.lenOfT > width) {
        this.x = abs(width - this.x);
      } else if (this.y - this.lenOfT < 0 || this.y + this.lenOfT > height) {
        this.y = abs(height - this.y);
      }
    } else if (dist(mouseX, mouseY, this.x, this.y) < this.lenOfT) {
      if (mouseX > this.x) {
        this.spdX -= 1;
      } else {
        this.spdX += 1;
      }
      if (mouseY > this.y) {
        this.spdY -= 1;
      } else {
        this.spdY += 1;
      }
    } else if (
      this.spdX > 5 ||
      this.spdY > 5 ||
      this.spdX < -5 ||
      this.spdY < -5
    ) {
      if (this.spdX < 0) {
        this.spdX += 1;
      } else {
        this.spdX -= 1;
      }
      if (this.spdY < 0) {
        this.spdY += 1;
      } else {
        this.spdY -= 1;
      }
    }
  }
  updateLife() {
    this.lifespan -= this.speedOfDying;
    this.currentAlpha = map(this.lifespan, 0, 3, 0, 100);
    if (this.lifespan < -0.5) {
      this.isDone = true;
    }
  }
  display() {
    fill(this.color.r, this.color.g, this.color.b);

    push();
    translate(this.x, this.y);
    for (let i = 0; i < this.numOfTentacles; i++) {
      let t = new Tentacle(
        0,
        0,
        this.currentAngleOfT,
        this.lenOfT,
        this.maxAmpOfT,
        this.maxSizeOfT,
        this.minSizeOfT,
        this.positionChangeCoeff,
        this.timeChangeCoeff,
        this.currentAlpha,
        this.x,
        this.y,
        this.paletteNumber
      );
      this.currentAngleOfT += (2 * PI) / (this.numOfTentacles - 1);
      t.updateSpeedOfT();
      t.display();
    }
    this.currentAngleOfT = 0;

    pop();
  }
}

//TENTACLE CLASS

class Tentacle {
  constructor(
    x,
    y,
    angle,
    len,
    maxAmp,
    maxSize,
    minSize,
    positionChangeCoeff,
    timeChangeCoeff,
    currentAlpha,
    actualPositionX,
    actualPositionY,
    paletteNumber
  ) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.startI = 0;
    this.len = len;
    this.maxAmp = maxAmp;
    this.frq = 0;
    this.maxSize = maxSize;
    this.minSize = minSize;
    this.positionChangeCoeff = positionChangeCoeff;
    this.timeChangeCoeff = timeChangeCoeff;
    this.currentAlpha = currentAlpha;
    this.actualPositionX = actualPositionX;
    this.actualPositionY = actualPositionY;
    this.timeChangeCoeffInit = timeChangeCoeff;
    this.paletteNumber = paletteNumber;
  }
  updateSpeedOfT() {
    let timeChangeCoeffAdd = 0;
    if (
      dist(mouseX, mouseY, this.actualPositionX, this.actualPositionY) <
      this.len
    ) {
      let distance = dist(
        mouseX,
        mouseY,
        this.actualPositionX,
        this.actualPositionY
      );
      timeChangeCoeffAdd = map(distance, 0, 200, 5, 0);
      this.timeChangeCoeff = timeChangeCoeffAdd;
    } else {
      this.timeChangeCoeff = this.timeChangeCoeffInit;
    }
  }
  display() {
    push();
    translate(this.x, this.y);
    push();
    rotate(this.angle);
    for (let x = 0; x < this.len; x += 20) {
      this.frq =
        x * this.positionChangeCoeff + frameCount * this.timeChangeCoeff;

      let amp = map(x, 0, this.len, 0, this.maxAmp);
      let y = mSin(this.frq) * amp;

      let dia = map(x, 0, this.len, this.maxSize, this.minSize);
      updateColor(
        dia,
        this.actualPositionX,
        this.actualPositionY,
        this.minSize,
        this.maxSize,
        this.paletteNumber
      );
      stroke(
        colorChange[0],
        colorChange[1],
        colorChange[2],
        this.currentAlpha + 40
      );
      fill(colorChange[0], colorChange[1], colorChange[2], this.currentAlpha);
      //manipulate the diameter?
      ellipse(x, y, dia, dia);
      // ellipse(x, y + 10, dia / 2, dia / 2);
      // ellipse(x, y - 10, dia / 2, dia / 2);
      stroke(
        colorChange[1],
        colorChange[2],
        colorChange[0],
        this.currentAlpha + 40
      );
      fill(colorChange[1], colorChange[2], colorChange[0], this.currentAlpha);
      ellipse(x + 5, y, dia * 2, dia * 2);
    }
    pop();
    // fill("white");
    // text(floor(this.len), -10, 10);
    pop();
  }
}

//BUBBLE CLASS

class Bubble {
  constructor(x, y, colorPaletteB, xSpd, ySpd) {
    this.x = x;
    this.y = y;
    this.xSpd = xSpd;
    this.ySpd = ySpd;
    this.size = random(1, 3) ** 2;
    this.r = 0;
    this.g = 0;
    this.b = 0;

    this.colorPaletteB = colorPaletteB;
    this.alpha = 10;
  }

  defineColors() {
    if (this.colorPaletteB >= 1 && this.colorPaletteB < 2) {
      this.r = random(255, 255);
      this.g = random(255, 255);
      this.b = random(255, 255);
    } else if (this.colorPaletteB >= 2 && this.colorPaletteB < 3) {
      this.r = random(100, 150);
      this.g = random(100, 150);
      this.b = random(200, 255);
    } else if (this.colorPaletteB >= 3 && this.colorPaletteB < 4) {
      this.r = random(100, 150);
      this.g = random(100, 150);
      this.b = random(200, 255);
    }
  }

  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }

  display() {
    push();
    translate(this.x, this.y);

    fill(this.r, this.g, this.b, this.alpha);
    stroke(this.r, this.g, this.b, this.alpha + 20);
    circle(0, 0, this.size);

    pop();
  }
  moveFrom() {
    let moveAmount = 0.5;
    if (mouseX > this.x && dist(mouseX, mouseY, this.x, this.y) < 20) {
      this.x -= moveAmount;
    } else if (mouseX < this.x && dist(mouseX, mouseY, this.x, this.y) < 20) {
      this.x += moveAmount;
    }
    if (mouseY > this.y && dist(mouseX, mouseY, this.x, this.y) < 20) {
      this.y -= moveAmount;
    } else if (mouseY < this.y && dist(mouseX, mouseY, this.x, this.y) < 20) {
      this.y += moveAmount;
    }
  }
  popIfHovered() {
    if (dist(mouseX, mouseY, this.x, this.y) <= this.size) {
      return "pop";
    }
  }
  changeColors() {
    this.alpha = map(dist(this.x, this.y, mouseX, mouseY), 0, width / 3, 60, 0);
  }
}
