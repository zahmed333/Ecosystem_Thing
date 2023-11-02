let river;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  river = new River();
}

function draw() {
  background(220);
  river.display();
}
