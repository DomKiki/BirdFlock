class Boid {
	
	constructor(x, y, fov=100, col=255) {
		
		this.pos = createVector(x,y);
		this.vel  = p5.Vector.random2D().setMag(random(1, 2));
		this.acc  = createVector();
		
		this.maxA = 1;
		this.maxV = 3;
		
		this.fov  = fov;
		this.col  = col;
		
	}

	// Steering towards the average velocity in the neighbourhood
	align(flock) {
		
		var dir = createVector();
		var cpt = 0;
		for (var b of flock)
			if ((b != this) && (b.pos.dist(this.pos) <= this.fov)) {
				dir.add(b.vel);
				cpt++;
			}
		
		// Steering = Desired - Velocity
		if (cpt > 0)
			dir.div(cpt).setMag(this.maxV).sub(this.vel).limit(this.maxA);
		
		return dir;
	}
	
	// Steering towards the average position in the neighbourhood
	cohesion(flock) {
		
		var dir = createVector();
		var cpt = 0;
		for (var b of flock)
			if ((b != this) && (b.pos.dist(this.pos) <= this.fov)) {
				dir.add(b.pos);
				cpt++;
			}
		
		// Cohesion = Avg - Position
		if (cpt > 0)
			dir.div(cpt).sub(this.pos).setMag(this.maxV).sub(this.vel).limit(this.maxA);
		
		return dir;
	}
	
	// Steering away from average position in the neighbourhood with proportionally inversed magnitude
	separation(flock) {
		
		var dir = createVector();
		var cpt = 0,
			d;
		for (var b of flock) {
			d = b.pos.dist(this.pos);
			if ((b != this) && (d <= this.fov)) {
				// Magnitude is 1/d
				dir.add(p5.Vector.sub(this.pos, b.pos).div(d));
				cpt++;
			}
		}
		
		// Separation = Avg - Position
		if (cpt > 0)
			dir.div(cpt).setMag(this.maxV).sub(this.vel).limit(this.maxA);
		
		return dir;
		
	}
	
	// Align, Cohesion and Separation
	applyACS(flock) {
		
		var ACS = [ this.align(flock), this.cohesion(flock), this.separation(flock) ];
		
		for (var v of ACS)
			this.acc.add(v);
		
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