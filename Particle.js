class Particle {
  constructor(x, y, speed) {
    this.pos = createVector(x, y);
    this.speed = speed;
    this.vel = createVector(0, speed);
    this.points = [this.pos.copy()];
    this.maxLength = 10;
  }
  
  getRiverTangentAt(y) {
    const epsilon = 0.001; 
    let y1 = noise(y) * width;
    let y2 = noise(y + epsilon) * width;
    return createVector(epsilon, y2 - y1).normalize();
  }


  adjustVelocity(y) {
    const tangent = getRiverTangentAt(y);
    const angle = tangent.heading();

    // Limit the turning angle to avoid sharp turns
    const maxTurnAngle = PI /10000000; // adjust as needed
    let turnAngle = angle - this.vel.heading();
    if (abs(turnAngle) > maxTurnAngle) {
      turnAngle = maxTurnAngle * Math.sign(turnAngle);
    }

    this.vel.rotate(turnAngle);
    this.vel.setMag(this.speed);
  }

  update() {
    this.pos.add(this.vel);
    this.points.unshift(this.pos.copy());

    // If the line streak gets too long, remove the last point
    if (this.points.length > this.maxLength) {
      this.points.pop();
    }

    if (this.pos.y > height) {
      this.pos.y = 0;
      this.points = [this.pos.copy()];
    }
  }

  display() {
    noFill();
    stroke(255);
    strokeWeight(2);
    
    beginShape();
    vertex(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length - 1; i+=2) {
      let xc = (this.points[i].x + this.points[i+1].x) / 2;
      let yc = (this.points[i].y + this.points[i+1].y) / 2;
      quadraticVertex(this.points[i].x, this.points[i].y, xc, yc);
    }
    endShape();
  }
}
