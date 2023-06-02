import p5 from "p5";

const sketch = (p: p5) => {
  let centerX: number;
  let centerY: number;
  let shapeSize: number;
  let rotation: number;
  let rotationSpeed: number;
  let isDragging: boolean;
  let dragStartTime: number;
  let dragStartAngle: number;
  let dragStartMouseX: number;
  let dragStartMouseY: number;

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
    p.background(220);

    // 図形の描画
    p.push();
    p.translate(centerX, centerY);
    p.rotate(rotation);
    drawSymmetricShape();
    p.pop();

    // 回転速度の減衰
    if (!isDragging) {
      rotationSpeed *= 0.99;
    }

    // 回転の更新
    rotation += rotationSpeed;

    // ドラッグの時間と距離から回転数を計算
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
    }
  };

  p.mousePressed = () => {
    const d = p.dist(p.mouseX, p.mouseY, centerX, centerY);
    if (d < shapeSize / 2) {
      isDragging = true;
      dragStartTime = p.millis();
      dragStartAngle = rotation;
      dragStartMouseX = p.mouseX;
      dragStartMouseY = p.mouseY;
    }
  };

  p.mouseReleased = () => {
    isDragging = false;
  };

  function drawSymmetricShape() {
    const segments = 12;
    const angleStep = (2 * p.PI) / segments;
    const radius = shapeSize / 2;

    p.stroke(0);
    p.strokeWeight(2);
    p.noFill();

    p.beginShape();
    for (let i = 0; i < segments; i++) {
      const x = p.cos(angleStep * i) * radius;
      const y = p.sin(angleStep * i) * radius;
      p.curveVertex(x, y);
    }
    p.endShape(p.CLOSE);
  }
};

export default sketch;
