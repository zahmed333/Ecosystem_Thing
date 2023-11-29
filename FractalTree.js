class FractalTree {
    constructor(start, leafs, branchs) {
      this.pos = createVector(start.x, start.y);
      this.theta = PI / random(4, 6);
      this.len = random(120, 150);
      this.ratio = random(0.6, 0.77);
      this.stroke = this.len / random(20, 30); // Start with thinner branches
      this.leafColors = leafs;
      this.branchCol = branchs;
      this.treeStructure = [];
      this.createBranch(this.pos, 0, this.len, this.stroke, 0);
    }
  
    createBranch(pos, angle, len, strokeW, depth) {
      if (len < 2 || depth > 10) {
        if (random() < 0.01) {
          this.treeStructure.push({ type: 'leaf', pos, size: random(2, 5), color: [random(0,255), random(0,255), 0] });
        }
        return;
      }
  
      let endX = pos.x + len * sin(angle);
      let endY = pos.y - len * cos(angle);
      let newPos = createVector(endX, endY);
      this.treeStructure.push({ type: 'branch', start: pos, end: newPos, strokeW });
  
      let newTheta = PI / random(4, 6);
      let newLen = len * random(0.6, 0.77);
      let newStrokeW = strokeW * random(0.5, 0.6); // Decrease stroke weight more rapidly
  
      this.createBranch(newPos, angle + newTheta, newLen, newStrokeW, depth + 1);
      this.createBranch(newPos, angle - newTheta, newLen, newStrokeW, depth + 1);
    }
  
    draw() {
      push();
      for (let element of this.treeStructure) {
        if (element.type === 'branch') {
          stroke(this.branchCol);
          strokeWeight(element.strokeW);
          line(element.start.x, element.start.y, element.end.x, element.end.y);
        } else if (element.type === 'leaf') {
          noStroke();
          fill(element.color);
          ellipse(element.pos.x, element.pos.y, element.size, element.size);
        }
      }
      pop();
    }
  }
  