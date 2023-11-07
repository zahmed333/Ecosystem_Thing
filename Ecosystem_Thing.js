function preload() {
  // Load the image before setup runs
  tigerImage = loadImage("tigerImage.png");
  robinImage = loadImage("robinImage.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  river = new River();
  tiger = new Tiger(800, 100, tigerImage);
  robin = new Robin(200, 100, robinImage);
  python = new Python(400, 300, 50, 1); // Start at center, 50 segments, speed of 2

}

function draw() {
  background(20, 120, 20);

  river.display();
  tiger.move();
  tiger.display();
  robin.move();
  robin.display();
  python.move();
  python.display();
}
