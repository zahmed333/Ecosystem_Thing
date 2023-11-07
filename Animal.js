// Base Animal class
class Animal {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.speed = 0.5;
    this.scaledWidth = img.width / 4;
    this.scaledHeight = img.height / 4;
  }

  move() {
    this.x += this.speed;
    if (this.x > width - this.scaledWidth || this.x < 0) {
      this.speed *= -1;
    }
  }

  display() {
    image(this.img, this.x, this.y, this.scaledWidth, this.scaledHeight);
  }
}
