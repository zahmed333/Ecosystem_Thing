class Robin extends Animal {
  constructor(x, y, images) {
    super(x, y, images.right); // Start with the right image
    this.images = images; // Store the images
    this.currentImage = images.right; // Current image displayed
    this.speedX = 3; // Horizontal speed
    this.scaledWidth = images.right.width / 5; // Set the scaled width specific for Robin
    this.scaledHeight = images.right.height / 5; // Set the scaled height specific for Robin
    this.stunned = false;
    this.stunnedDuration = 0; // Duration for how long the Robin is stunned
    this.hasCrossed = false;
    this.isInTree = false;
  }

  updateTreeStatus(isInTree) {
    this.isInTree = isInTree;
  }

  reactToLightning() {
    console.log("Robin hit by lightning!");
    this.stunned = true;
    this.stunnedDuration = 120; // Example: stunned for 120 frames
  }

  update() {
    if (this.stunned) {
      this.stunnedDuration--;
      if (this.stunnedDuration <= 0) {
        this.stunned = false; // Reset stunned state
      }
    }
  }

  move() {
    if (!this.stunned) {
      // Update position based on speed
      this.x += this.speedX;

      // Check boundaries for horizontal movement
      if (this.x > width - this.scaledWidth || this.x < 0) {
        this.speedX *= -1;
      }

      // Update image based on direction
      if (this.speedX > 0) {
        this.currentImage = this.images.right;
      } else {
        this.currentImage = this.images.left;
      }
    }
  }

  display() {
    if (this.stunned) {
      // Draw an 'X' instead of the usual robin image
      stroke(255, 0, 0); // Red color for the 'X'
      strokeWeight(3);
      line(this.x - 10, this.y - 10, this.x + 10, this.y + 10);
      line(this.x + 10, this.y - 10, this.x - 10, this.y + 10);
    } else {
      image(this.currentImage, this.x, this.y, this.scaledWidth, this.scaledHeight);
    }
  }
}
