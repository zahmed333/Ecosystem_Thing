class Tiger extends Animal {
  constructor(x, y, images) {
    super(x, y, images.right); // Default image
    this.images = images; // Object containing images for each direction
    this.currentImage = images.right; // Default image
    this.speedX = 2; // Horizontal speed
    this.speedY = 2; // Vertical speed
    this.isJumping = false; // Track if the tiger is jumping
    this.jumpHeight = 50; // Height of the jump
    this.jumpYStart = 0; // Starting Y position of the jump
  }

  move() {
    // Update position based on speed
    this.x += this.speedX;
    if (!this.isJumping) {
      this.y += this.speedY;
    }

    // Check boundaries for horizontal movement
    if (this.x > width - this.scaledWidth || this.x < 0) {
      this.speedX *= -1;
    }

    // Check boundaries for vertical movement
    if (this.y > height - this.scaledHeight) {
      this.y = height - this.scaledHeight; // Keep tiger above the bottom edge
      this.speedY *= -1;
    } else if (this.y < 0) {
      this.y = 0; // Keep tiger below the top edge
      this.speedY *= -1;
    }

    // Get river boundaries at tiger's y-coordinate
    let riverBoundaries = river.getRiverBoundaries(this.y);

    // Check if the tiger is over the river
    let isOverRiver = this.x >= riverBoundaries.left && this.x <= riverBoundaries.right;

    // Handle jumping logic
    if (isOverRiver && !this.isJumping) {
      this.isJumping = true;
      this.jumpYStart = this.y;
    }

    if (this.isJumping) {
      // Simulate jump
      let jumpProgress = (this.x - riverBoundaries.left) / (riverBoundaries.right - riverBoundaries.left);
      this.y = this.jumpYStart - this.jumpHeight * Math.sin(Math.PI * jumpProgress);

      // End jump when tiger reaches other side of the river
      if (this.x >= riverBoundaries.right) {
        this.isJumping = false;
        // Reset y to a consistent ground level if needed
      }
    }

    // Update image based on movement direction
    if (this.speedX > 0) {
      this.currentImage = isOverRiver ? this.images.jumpRight : this.images.right;
    } else if (this.speedX < 0) {
      this.currentImage = isOverRiver ? this.images.jumpLeft : this.images.left;
    }
  }

  display() {
    image(this.currentImage, this.x, this.y, this.scaledWidth, this.scaledHeight);
  }
}
