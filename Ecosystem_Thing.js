function setup() {
  createCanvas(windowWidth, windowHeight);
  river = new River();
}

function draw() {
  background(20, 120, 20);

  // Draw blades of grass with varying heights and shades of green
  // Loop through the width and height of the canvas
  for (let x = 0; x < width; x += 3) {
    for (let y = 0; y < height; y += 3) { // New loop for y dimension
      let grassHeight = random(5, 20); // Random height for each blade of grass
      let yOffset = noise(x * 0.1, y * 0.1) * 50; // Noise based on both x and y
      let grassTopY = y - yOffset - grassHeight; // New y-position for the top of the grass
      let greenShade = random(100, 255); // Random green shade for color variation

      // Ensure grass is drawn on canvas
      if (grassTopY < 0) {
        grassTopY = 0;
      }
      
        stroke(0, greenShade, 0);
        line(x, y - yOffset, x, grassTopY);
    }
  }
    river.display();

}
