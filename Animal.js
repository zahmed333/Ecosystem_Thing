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

  handleBorderCrossing() {
    if (this.x > width / 2 && !this.hasCrossed) {
      this.hasCrossed = true;
      return true; // Indicates that Robin has just crossed the border
    } else if (this.x < width / 2) {
      this.hasCrossed = false;
    }
    return false; // Indicates no border crossing
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
