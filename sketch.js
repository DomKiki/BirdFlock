/****************** Global variables *****************/

var flock   = [];
var walls   = [];
var options = { fov: false, vel: false, walls: false };

var btnFov,
	btnVel,
	btnWalls;

/********************** p5 Methods *******************/

function setup() {
	
    var canvas = createCanvas(800, 600);
	canvas.parent("canvas");
	
	for (var i = 0; i < 100; i++)
		flock.push(new Boid(random(width), random(height)));
	
	btnFoV = createButton("FoV")
			.parent("canvas")
			.mouseClicked(pressFoV);
				
	btnVel = createButton("Velocity")
			.parent("canvas")
			.mouseClicked(pressVel);
	
	btnWalls = createButton("Walls (alpha)")
			  .parent("canvas")
			  .mouseClicked(pressWalls);
	
}

function draw() {
	
    background(0);
	
	if (options.walls) {
		strokeWeight(1);	
		for (var w of walls)
			w.display();
	}
	
	noFill();
	
	for (var b of flock) {
		b.ACS(flock);
		if (options.walls)
			b.avoid(walls);
		b.update();
		b.display(options);
	}
	
}

function pressFoV() { 
	options.fov = !options.fov;
	btnFoV.style("border-style", options.fov ? "inset" : "outset");
}
function pressVel() {
	options.vel = !options.vel;
	btnVel.style("border-style", options.vel ? "inset" : "outset");
}

function pressWalls() { 
	options.walls = !options.walls;
	btnWalls.style("border-style", options.walls ? "inset" : "outset"); 
	if (options.walls)
		instantiateWalls(20);
}

function instantiateWalls(amount, size=20, minLen=80, maxLen=200) {
	
	walls = [];
	
	var x, y, d, w, h;
		
	for (var i = 0; i < amount; i++) {
		// Value generation
		x = random(width);
		y = random(height);
		d = random();
		w = random(maxLen - minLen) + minLen;
		h = random(maxLen - minLen) + minLen;
		if (d < 0.5) w = size;
		else		 h = size;
		// Instantiations
		walls.push(new Wall([createVector(x,y), createVector(x+w,y), createVector(x+w,y+h), createVector(x,y+h)], color(random(255), random(255), random(255))));
	}
		
}