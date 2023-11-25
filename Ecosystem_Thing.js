function preload() {
  // Load the image before setup runs
  tigerImage = loadImage("tigerImage.png");
  robinImage = loadImage("robinImage.png");
}
let tree;
let cloud;
const LIGHTNING = 300;


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

  
  // Trigger lightning every 120 frames and pass Robin's position
  // Example condition to trigger lightning
  if (frameCount % LIGHTNING === 0) {
    let hit = cloud.triggerLightning(robin.x, robin.y);
    if (hit) {
      robin.reactToLightning();
    }
  }


  // Check if lightning hits Robin
  if (cloud.lightning) {
    let distanceToRobin = dist(cloud.x, cloud.y, robin.x, robin.y);
    if (distanceToRobin < 100) { // Example distance threshold
      robin.reactToLightning();
    }
  }
  robin.update(); // Update Robin's state each frame
  robin.move();
  robin.display();
}


function drawLightning(cloudX, cloudY, robinX, robinY) {
  let xCoord1 = cloudX;
  let yCoord1 = cloudY;
  let xCoord2 = cloudX;
  let yCoord2 = cloudY;
  let hitDetected = false;

  for (let i = 0; i < 20; i++) {
    xCoord1 = xCoord2;
    yCoord1 = yCoord2;

    // Direction towards Robin
    let dirX = robinX - xCoord1;
    let dirY = robinY - yCoord1;

    // Normalize direction and add randomness
    let magnitude = sqrt(dirX * dirX + dirY * dirY);
    dirX /= magnitude;
    dirY /= magnitude;

    xCoord2 = xCoord1 + dirX * int(random(5, 20)) + int(random(-10, 10));
    yCoord2 = yCoord1 + dirY * int(random(5, 20)) + int(random(-10, 10));

    strokeWeight(random(1, 3));
    stroke(255, 255, random(0, 255));
    line(xCoord1, yCoord1, xCoord2, yCoord2);

    // Check if lightning is close to Robin
    if (dist(xCoord2, yCoord2, robinX, robinY) < 50) { // Adjust the threshold as needed
      hitDetected = true;
      break; // Stop drawing if close to Robin
    }
  }

  return hitDetected;
}

