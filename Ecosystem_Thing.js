function preload() {
  // Load the image before setup runs
  tigerImages = {
    left: loadImage("tigerLeft.png"),
    right: loadImage("tigerRight.png"),
    up: loadImage("tigerUp.png"),
    down: loadImage("tigerDown.png"),
    jumpLeft: loadImage("tigerRiverLeft.png"),
    jumpRight: loadImage("tigerRiverRight.png")
  };
  robinImages = {
    right: loadImage("robinRight.png"),
    left: loadImage("robinLeft.png")
  };
}
let tigerImages;
let robinImages;
let tree;
let cloud;
const LIGHTNING = 600;
let fractalTree;
let scoreboard;

function setup() {
  createCanvas(windowWidth, windowHeight);
  river = new River();
  tiger = new Tiger(800, 100, tigerImages);
  robin = new Robin(200, 100, robinImages);
  python = new Python(400, 300, 50, 1); // Start at center, 50 segments, speed of 2
  tree = new Tree(300, height/2, 30, 150, color(34, 139, 34)); // Example tree
  cloud = new Cloud(); // Initialize the cloud
  fractalTree = new FractalTree(createVector(width - 150, height), [color(0, 255, 0), color(34, 139, 34)], color(139, 69, 19));
  scoreboard = {
    "Refugee Robin": 0,
    "Trafficking Tiger": 0,
    "9/11 Nimbus": 0,
    "Policy Python": 0,
    "Withering Wishes": 0
  };
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
  fractalTree.draw();
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

  if (frameCount % 1000 === 0) {
    scoreboard["Withering Wishes"] -= 1;
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

  let collisionThreshold = 30;

  handleGameLogic(robin, tiger, python, cloud, scoreboard);


  // Display the scoreboard
  displayScoreboard(scoreboard);
}

function handleGameLogic(robin, tiger, python, cloud, scoreboard) {
  let collisionThreshold = 30;

  // Handle Robin crossing the border
  if (robin.handleBorderCrossing()) {
    scoreboard["Refugee Robin"] += 1;
  }
  if (tiger.handleBorderCrossing()) {
    scoreboard["Trafficking Tiger"] += 1;
  }

  // Check collision between Tiger and Robin
  if (checkCollision(robin, tiger, collisionThreshold)) {
    scoreboard["Trafficking Tiger"] += 1;
  }

  // Check collision between Python and Tiger/Robin
  if (checkCollision(python, tiger, collisionThreshold)) {
    scoreboard["Policy Python"] += 1; // Reset Tiger's points or other logic
    scoreboard["Trafficking Tiger"] -= 1;
  }
  if (checkCollision(python, robin, collisionThreshold) && robin.isInTree) {
    scoreboard["Refugee Robin"] -= 1;
    scoreboard["Policy Python"] += 1; // Implement logic for attacking Robin in the tree
  }
}

function displayScoreboard(scoreboard) {
  // Set the position and style for the scoreboard
  let x = 10; // X position of the scoreboard
  let y = height - 200; // Y position of the scoreboard
  let lineHeight = 20; // Line height for each score entry

  fill(255); // White text color
  textSize(16); // Text size
  noStroke(); // No border for the text

  // Iterate through the scoreboard object and display each score
  for (let entity in scoreboard) {
    text(`${entity}: ${scoreboard[entity]}`, x, y);
    y += lineHeight; // Move to the next line for the next entity
  }
}

function checkCollision(entity1, entity2, distanceThreshold) {
  let dx = entity1.x - entity2.x;
  let dy = entity1.y - entity2.y;
  return Math.sqrt(dx * dx + dy * dy) < distanceThreshold;
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
      scoreboard["9/11 Nimbus"] += 1;
      scoreboard["Refugee Robin"] -= 1;
      break; // Stop drawing if close to Robin
    }
  }

  return hitDetected;
}