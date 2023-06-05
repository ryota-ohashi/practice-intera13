import p5 from "p5";

// 画像の読み込み

const sketch = (p: p5) => {
  let centerX: number;
  let centerY: number;
  let shapeSize: number;
  let rotation: number;
  let rotationSpeed: number;
  let isDragging: boolean;
  let dragStartTime: number;
  // let dragStartAngle: number;
  let dragStartMouseX: number;
  let dragStartMouseY: number;
  let img: p5.Image;

  p.preload = () => {
    img = p.loadImage("/assets/img/handSpinner.png");
  }

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

    // 画像の描画
    p.push();
    p.translate(centerX, centerY);
    p.rotate(rotation);

    // 回転数に応じて画像の色を計算
    const maxRotationSpeed = 0.1;
    const red = p.map(Math.abs(rotationSpeed), 0, maxRotationSpeed, 50, 255);
    p.tint(red, 0, 0); // 画像の色を設定
    p.imageMode(p.CENTER);
    p.image(img, 0, 0, shapeSize, shapeSize);
    p.pop();

    // 回転速度の減衰
    if (!isDragging) {
      rotationSpeed *= 0.999;
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
      // dragStartAngle = rotation;
      dragStartMouseX = p.mouseX;
      dragStartMouseY = p.mouseY;
    }
  };

  p.mouseReleased = () => {
    isDragging = false;
  };
};

export default sketch;
