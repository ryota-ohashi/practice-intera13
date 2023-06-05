import p5 from "p5";

const sketch = (p: p5) => {
  let centerX: number;
  let centerY: number;
  let shapeSize: number;
  let rotation: number;
  let rotationSpeed: number;
  let isDragging: boolean;
  let dragStartTime: number;
  let dragStartMouseX: number;
  let dragStartMouseY: number;
  let img: p5.Image;

  p.preload = () => {
    img = p.loadImage("/assets/img/handSpinner.png");
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    centerX = p.width / 2;
    centerY = p.height / 2;
    shapeSize = p.height / 2;
    rotation = 0;
    rotationSpeed = 0;
    isDragging = false;
  };

  p.draw = () => {
    if (!isDragging) {
      rotationSpeed *= 0.999;
    }

    rotation += rotationSpeed;

    if (isDragging) {
      const dragEndTime = p.millis();
      const dragDuration = dragEndTime - dragStartTime;
      const dragDistance = p.dist(
        p.mouseX,
        p.mouseY,
        dragStartMouseX,
        dragStartMouseY
      );
      const maxRotationSpeed = 0.1;

      rotationSpeed = (dragDistance / dragDuration) * maxRotationSpeed;

      const initAngle = p.atan2(dragStartMouseX - centerX, dragStartMouseY - centerY);
      const nextAngle = p.atan2(p.mouseX - centerX, p.mouseY - centerY);
      console.log(initAngle - nextAngle);
      // console.log(nextAngle/p.PI * 360);

      if(initAngle - nextAngle <= 0){
        rotationSpeed *= (-1);
      }
    }

    drawHandSpinner();
  };

  p.mousePressed = () => {
    const d = p.dist(p.mouseX, p.mouseY, centerX, centerY);
    if (d < shapeSize / 2) {
      isDragging = true;
      dragStartTime = p.millis();
      dragStartMouseX = p.mouseX;
      dragStartMouseY = p.mouseY;
    }
  };

  p.mouseReleased = () => {
    isDragging = false;
  };

  const drawHandSpinner = () => {
    p.background(220);

    p.push();
    p.translate(centerX, centerY);
    p.rotate(rotation);

    const maxRotationSpeed = 0.8;
    const red = p.map(Math.abs(rotationSpeed), 0, maxRotationSpeed, 50, 255);
    const blue = p.map(Math.abs(rotationSpeed), 0, maxRotationSpeed, 255, 50);
    p.tint(red, 0, blue);
    p.imageMode(p.CENTER);
    p.image(img, 0, 0, shapeSize, shapeSize);
    p.pop();
  };
};

export default sketch;
