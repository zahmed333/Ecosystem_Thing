class Python {
  constructor(x, y, length, speed) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(speed);
    this.length = length;
    this.tongueLength = 15;
    this.tongueOut = false;
  }

  move() {
    this.position.add(this.velocity);
    this.position.x = (this.position.x + width) % width;
    this.position.y = (this.position.y + height) % height;

    // Flick tongue in and out
    if (frameCount % 60 === 0) { // Every 60 frames change the state
      this.tongueOut = !this.tongueOut;
    }
  }
  
display() {
  // Draw body
  stroke(104, 205, 60);
  strokeWeight(5);
  noFill();
  beginShape();
  for (let i = 0; i < this.length; i++) {
    let angle = noise(this.position.x * 0.01, this.position.y * 0.01, i * 0.1) * TWO_PI * 2;
    let x = this.position.x + cos(angle) * i;
    let y = this.position.y + sin(angle) * i;
    vertex(x, y);
  }
  endShape();

  push(); // Isolate the style changes
  
  // Draw eyes
  const eyeOffsetX = 6;
  const eyeOffsetY = 2;
  fill(0); // Black color for the eyes
  noStroke(); // No stroke for the eyes
  ellipse(this.position.x + eyeOffsetX, this.position.y - eyeOffsetY, 4, 4);
  ellipse(this.position.x + eyeOffsetX, this.position.y + eyeOffsetY, 4, 4);
  
  // Draw tongue
  fill(255, 0, 0); // Red color for the tongue
  noStroke(); // No stroke for the tongue
  translate(this.position.x + eyeOffsetX * 2, this.position.y);
  rotate(this.velocity.heading()); // Rotate the tongue in the direction of movement
  if (this.tongueOut) {
    // Sinusoidal movement for tongue to simulate flicking
    let tongueExtend = sin(frameCount * 0.2) * this.tongueLength;
    if(tongueExtend < 0) tongueExtend = 0; // Only extend out, not in

    // Draw forked tongue
    beginShape();
    vertex(0, tongueExtend);
    vertex(-2, tongueExtend - this.tongueLength / 4);
    vertex(0, tongueExtend - this.tongueLength / 2);
    vertex(2, tongueExtend - this.tongueLength / 4);
    endShape(CLOSE);
  }
  
  pop(); // Restore original styles
}

}
