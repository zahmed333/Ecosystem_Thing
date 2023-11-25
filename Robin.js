// Robin class extending Animal
class Robin extends Animal {
  constructor(x, y, img) {
    super(x, y, img); // Call the parent class constructor with the necessary arguments
    this.hitByLightning = false; // Flag to indicate if hit by lightning
    this.speed = 3; // Set the speed specific for Robin, overriding the default in Animal
    this.scaledWidth = img.width / 5; // Set the scaled width specific for Robin
    this.scaledHeight = img.height / 5; // Set the scaled height specific for Robin
    this.stunned = false;
    this.stunnedDuration = 0.5; // Duration for how long the Robin is stunned
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
      super.move();
    }
  }
  
  display() {
    if (this.hitByLightning) {
      // Draw an 'X' instead of the usual robin image
      stroke(255, 0, 0); // Red color for the 'X'
      strokeWeight(3);
      line(this.x - 10, this.y - 10, this.x + 10, this.y + 10);
      line(this.x + 10, this.y - 10, this.x - 10, this.y + 10);
    } else {
      super.display(); // Call the display method of the parent class
    }
  }
  
}
