class Boid {
	
	constructor(x, y, fov=50, col=255) {
		
		this.pos = createVector(x,y);
		this.vel  = p5.Vector.random2D().setMag(random(1, 2));
		this.acc  = createVector();
		
		this.maxA = 0.2;
		this.maxV = 3;
		
		this.fov  = fov;
		this.col  = col;
		
	}
	
	// Alignment  : Steering towards the average velocity*
	// Cohesion   : Steering towards the average position*
	// Separation : Steering away from the average position* with proportionally inversed magnitude
	// *in the neighbourhood (or fov)
	ACS(flock) {
				
		var ali = createVector(), 
			coh = createVector(),
			sep = createVector(),
			cpt = 0, 
			d;
			
		for (var b of flock) {
			d = b.pos.dist(this.pos);
			if ((b != null) && (d != 0) && (d <= this.fov)) {
				ali.add(b.vel);
				coh.add(b.pos);
				sep.add(p5.Vector.sub(this.pos, b.pos).div(d));
				cpt++;
			}
		}
		
		if (cpt > 0) {
			ali.div(cpt).setMag(this.maxV).sub(this.vel).limit(this.maxA);
			coh.div(cpt).sub(this.pos).setMag(this.maxV).sub(this.vel).limit(this.maxA);
			sep.div(cpt).setMag(this.maxV).sub(this.vel).limit(this.maxA);
		}
		
		// Apply all vectors to acceleration
		this.acc.add(ali);
		this.acc.add(coh);
		this.acc.add(sep);
		
	}
	
	// Wrap world on itself
	bound() {
		this.pos.x = (this.pos.x + width)  % width;
		this.pos.y = (this.pos.y + height) % height;
	}
	
	update() {

		// Bounded Position and Velocity
		this.pos.add(this.vel);
		this.bound();

		this.vel.add(this.acc);
		this.vel.limit(this.maxV);
		
		// Reset acceleration
		this.acc = createVector();
		
	}
	
	display() {
		strokeWeight(12);
		stroke(this.col);
		point(this.pos.x, this.pos.y);
	}

}