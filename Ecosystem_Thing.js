function preload() {
  // Load the image before setup runs
  tigerImage = loadImage("tigerImage.png");
  robinImage = loadImage("robinImage.png");
}
let tree;
let cloud;


function setup() {
  createCanvas(windowWidth, windowHeight);
  river = new River();
  tiger = new Tiger(800, 100, tigerImage);
  robin = new Robin(200, 100, robinImage);
  python = new Python(400, 300, 50, 1); // Start at center, 50 segments, speed of 2
  tree = new Tree(300, height/2, 30, 150, color(34, 139, 34)); // Example tree
  cloud = new Cloud(); // Initialize the cloud

}

function draw() {
  background(20, 120, 20);

  // Add a vertical dashed line to symbolize crossing the river
  stroke(random(200,255), random(0,100), random(0,100)); // Set the color of the line
  strokeWeight(2); // Set the thickness of the line

  let lineX = windowWidth / 2; // Position of the line in the middle of the window
  let dashLength = random(14, 15); // Length of each dash
  let gapLength = random(8, 10); // Gap between dashes

  for (let y = 0; y < windowHeight; y += dashLength + gapLength) {
    line(lineX, y, lineX, y + dashLength);
  }
  river.display();
  tiger.move();
  tiger.display();
  python.move();
  python.display();
  tree.display();
  cloud.display();
  cloud.move();

  // Example condition to trigger lightning
  if (frameCount % 120 === 0) { // Trigger lightning every 120 frames
    cloud.triggerLightning();
  }

  // Check if lightning hits Robin
  if (cloud.lightning) {
    let distanceToRobin = dist(cloud.x, cloud.y, robin.x, robin.y);
    if (distanceToRobin < 100) { // Example distance threshold
      robin.reactToLightning();
    }
  }
  robin.move();
  robin.display();
}
