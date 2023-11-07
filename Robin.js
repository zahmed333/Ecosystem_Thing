// Robin class extending Animal
class Robin extends Animal {
  constructor(x, y, img) {
    super(x, y, img); // Call the parent class constructor with the necessary arguments
    this.speed = 3; // Set the speed specific for Robin, overriding the default in Animal
    this.scaledWidth = img.width / 5; // Set the scaled width specific for Robin
    this.scaledHeight = img.height / 5; // Set the scaled height specific for Robin
  }

  // The move method is the same as in Animal, so no need to override it unless Robin has a unique way of moving
  // The display method is also the same as in Animal, so no need to override it
}
