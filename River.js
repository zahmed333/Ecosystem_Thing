class River {
  constructor() {
    this.points = [];
    this.widths = [];
    this.yOffset = 0;

    // Generate main river path
    this.generatePath();    
    this.particles = [];
    for (let i = 0; i < 50; i++) { // 50 particles, adjust as needed
      let y = random(height);
      let x = this.getRiverX(y);
      let speed = random(0.5, 2); // Random speed for particles, adjust as needed
      this.particles.push(new Particle(x, y, speed));
    }
  }

  getRiverBoundaries(y) {
    let index = floor(y / 5);
    if (index >= 0 && index < this.points.length) {
      let halfWidth = this.widths[index] / 2;
      return {
        left: this.points[index].x - halfWidth,
        right: this.points[index].y + halfWidth
      };
    }
    return { left: width / 2 - 75, right: width / 2 + 75 }; // Default boundaries
  }

  getRiverX(y) {
    let index = floor(y / 5);
    if (index >= 0 && index < this.points.length) {
      return this.points[index].x;
    }
    return width / 2;
  }

  displayParticles() {
    for (let particle of this.particles) {
      particle.update();
      particle.pos.x = this.getRiverX(particle.pos.y);
      particle.display();
    }
  }
  
updateParticles() {
  for (let p of this.particles) {
    // Adjust the particle's velocity based on the river's tangent at its current y position
    p.adjustVelocity(p.pos.y);

    // Update the particle's position
    p.update();

    // Get the x position of the river at the particle's current y
    let riverX = this.getRiverX(p.pos.y);
    let halfWidth = this.widths[floor(p.pos.y / 5)] / 2;

    // Check if the particle is within the river's boundaries after the update
    if (p.pos.x < riverX - halfWidth || p.pos.x > riverX + halfWidth) {
      // Adjust the particle's x position back to the nearest point within the river
      p.pos.x = constrain(p.pos.x, riverX - halfWidth, riverX + halfWidth);
    }
  }
}



getTangentAngle(x) {
  // Calculate a slight difference along the x-axis to get two points and compute the tangent
  let delta = 1.0;
  let y1 = height * noise(x * 0.01);
  let y2 = height * noise((x + delta) * 0.01);
  
  // atan2 calculates the angle from the difference between two points
  return atan2(y2 - y1, delta);
}


  generatePath() {
    this.points = [];
    this.widths = [];
    let xOffset = 0;
    for (let y = 0; y < height; y += 5) {
      let x = map(noise(xOffset), 0, 1, width * 0.25, width * 0.75); // main river path
      this.points.push(createVector(x, y));
      this.widths.push(map(noise(xOffset + 1000), 0, 1, 50, 150)); // varying width of the river
      xOffset += 0.02;
    }
  }

  display() {
    noStroke(); // Ensure no stroke for the river
    this.yOffset += 0.01; // controls the speed of the flow. Adjust as needed.

    // Update the river path based on yOffset
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].x = map(noise(i * 0.02 + this.yOffset), 0, 1, width * 0.25, width * 0.75);
    }

    noStroke();
    fill(0, 0, 255); // Blue color for the river

    // Draw river using QUAD_STRIP
    beginShape(QUAD_STRIP);
    for (let i = 0; i < this.points.length; i++) {
      let pt = this.points[i];
      let halfWidth = this.widths[i] / 2;
      vertex(pt.x - halfWidth, pt.y);
      vertex(pt.x + halfWidth, pt.y);
    }
    endShape();
    this.displayParticles();
  }
}
