class Tree {
    constructor(x, y, trunkWidth, treeHeight, leavesColor) {
      this.x = x;
      this.y = y;
      this.trunkWidth = trunkWidth;
      this.treeHeight = treeHeight;
      this.leavesColor = leavesColor;
      this.branches = [];
      this.leaves = [];
      this.generateBranches();
      this.generateLeaves();
    }
  
    generateBranches() {
        let numBranches = int(random(2, 5)); // Reduced the maximum number of branches
        for (let i = 0; i < numBranches; i++) {
          let branchLength = random(20, 80);
          let angle = random(-PI / 4, PI / 4);
          let branchThickness = random(5, this.trunkWidth / 3); // Slightly reduced thickness range
          let yPos = random(this.y - this.treeHeight * 0.5, this.y); // Start branches higher up
          this.branches.push({ length: branchLength, angle: angle, thickness: branchThickness, yPos: yPos });
        }
      }

    drawCanopy() {
        push();
        translate(this.x + this.trunkWidth / 2, this.y - this.treeHeight);
        noStroke(); // Disable stroke for canopy
        fill(this.leavesColor);
        beginShape();
        for (let angle = 0; angle < TWO_PI; angle += radians(5)) {
          let radius = this.treeHeight / 2 + noise(angle) * 100; // Canopy radius with noise for organic shape
          let x = radius * cos(angle);
          let y = radius * sin(angle) - this.treeHeight / 2;
          vertex(x, y);
        }
        endShape(CLOSE);
        pop();
      }
  
      generateLeaves() {
        for (let branch of this.branches) {
          let numLeaves = int(random(1, 3)); // Reduced the maximum number of leaves per branch
          for (let i = 0; i < numLeaves; i++) {
            let leafX = this.x + this.trunkWidth / 2 + branch.thickness + random(-10, 10); // Tighten the leaf spread
            let leafY = branch.yPos + random(0, branch.length);
            this.leaves.push({ x: leafX, y: leafY });
          }
        }
      }
    
  
    drawLeaf(x, y) {
      // Custom leaf shape
      push();
      translate(x, y);
      beginShape();
      vertex(0, -10);
      bezierVertex(10, -10, 10, -20, 20, -20);
      bezierVertex(10, -20, 10, -10, 0, 0);
      bezierVertex(10, 10, 10, 20, 20, 20);
      bezierVertex(10, 20, 10, 10, 0, 10);
      endShape(CLOSE);
      pop();
    }
  
    display() {
        // Draw the trunk
        fill(101, 67, 33);
        noStroke(); // Apply noStroke() here as well to remove the trunk outline
        rect(this.x, this.y - this.treeHeight, this.trunkWidth, this.treeHeight);
  
      // Draw the branches
      for (let branch of this.branches) {
        push();
        translate(this.x + this.trunkWidth / 2, branch.yPos);
        rotate(branch.angle);
        fill(101, 67, 33);
        rect(0, 0, branch.thickness, branch.length);
        pop();
      }
  
      // Draw the leaves
      fill(this.leavesColor);
      for (let leaf of this.leaves) {
        this.drawLeaf(leaf.x, leaf.y);
      }
  
      this.drawCanopy();
    }
  }
  