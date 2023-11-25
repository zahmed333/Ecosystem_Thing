class Cloud {
    constructor() {
      this.x = width / 2;
      this.y = 50; // Adjust the y-coordinate as needed
      this.lightning = false;
      this.lightningTimer = 0;
      this.lightningDuration = 10; // Duration of lightning visibility
    }
  
    display() {
      fill(200); // Light gray color
      noStroke();
  
      // Create a cloud using multiple ellipses
      ellipse(this.x, this.y, 120, 80); // Main cloud body
      ellipse(this.x - 60, this.y, 70, 60); // Left cloud puff
      ellipse(this.x + 60, this.y, 70, 60); // Right cloud puff
      ellipse(this.x - 30, this.y - 30, 60, 50); // Upper-left cloud puff
      ellipse(this.x + 30, this.y - 30, 60, 50); // Upper-right cloud puff
  
      // Draw lightning if active
      if (this.lightning) {
        stroke(255, 255, 0); // Yellow color for lightning
        strokeWeight(3);
        line(this.x, this.y + 40, this.x, this.y + 150); // Adjust lightning position and length
        this.lightningTimer++;
        if (this.lightningTimer > this.lightningDuration) {
          this.lightning = false;
          this.lightningTimer = 0;
        }
      }
    }
  
    move() {
      // Add movement logic if needed
    }
  
    triggerLightning(robinX, robinY) {
        return drawLightning(this.x, this.y, robinX, robinY);
    }
  }
  