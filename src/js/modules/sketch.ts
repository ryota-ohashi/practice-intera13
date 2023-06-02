import p5 from "p5";

const sketch = (p: p5) => {
  let rotationSpeed = 0;
  let startTime = 0;
  let endTime = 0;
  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;
  let maxRPM = 300;
  let currentRPM = maxRPM;
  let rotationAngle = 0;
  let prevRotationAngle = 0;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.angleMode(p.DEGREES);
    p.rectMode(p.CENTER);

    // Attach event listeners
    p.mousePressed = mousePressed;
    p.mouseReleased = mouseReleased;
    p.touchStarted = touchStarted;
    p.touchEnded = touchEnded;
  };

  p.draw = () => {
    p.background(220);

    let deltaTime = (endTime - startTime) / 1000;
    let distance = p.dist(startX, startY, endX, endY);

    if (p.mouseIsPressed || p.touches.length > 0) {
      if (rotationSpeed < maxRPM) {
        rotationSpeed = p.map(distance / deltaTime, 0, p.width, 0, maxRPM);
      }
    } else {
      rotationSpeed *= 0.99;
      if (rotationSpeed < 0.01) {
        rotationSpeed = 0;
      }
    }

    currentRPM = p.lerp(currentRPM, rotationSpeed, 0.1);

    let deltaAngle = (currentRPM / 60) * deltaTime * 360;
    rotationAngle += deltaAngle;
    if (rotationAngle >= 360) {
      rotationAngle -= 360;
    }

    p.push();
    p.translate(p.width / 2, p.height / 2);
    p.rotate(rotationAngle);

    let colorValue = p.map(rotationSpeed, 0, maxRPM, 0, 255);
    p.fill(colorValue, 0, 0);
    p.rect(0, 0, 400, 50);

    p.pop();

    startTime = p.millis();
    prevRotationAngle = rotationAngle;
  };

  function touchStarted(event: Event) {
    startTime = p.millis();
    startX = p.mouseX;
    startY = p.mouseY;
    event.preventDefault();
  }

  function touchEnded(event: Event) {
    endTime = p.millis();
    endX = p.mouseX;
    endY = p.mouseY;
    event.preventDefault();
  }

  function mousePressed() {
    startTime = p.millis();
    startX = p.mouseX;
    startY = p.mouseY;
  }

  function mouseReleased() {
    endTime = p.millis();
    endX = p.mouseX;
    endY = p.mouseY;
  }

  // function judgeInSpinner() {
  //   if (p.mouseX) {
  //     return true;
  //   }
  // }
};

export default sketch;
