class Cloud {
  constructor() {
    this.x = width / 2;
    this.y = 50; // Adjust the y-coordinate as needed
    this.lightning = false;
    this.lightningTimer = 0;
    this.lightningDuration = 10; // Duration of lightning visibility
  }

  display() {
    // Draw the cloud
    fill(200); // Light gray color
    noStroke();
    ellipse(this.x, this.y, 150, 80); // Adjust size as needed

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

  triggerLightning() {
    this.lightning = true;
  }
}
