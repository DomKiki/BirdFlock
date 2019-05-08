/****************** Global variables *****************/

var flock = [];

/********************** p5 Methods *******************/
	
function setup() {
	
    var canvas = createCanvas(800, 600);
	canvas.parent("canvas");
	
	for (var i = 0; i < 100; i++)
		flock.push(new Boid(random(width), random(height)));
	
}

function draw() {

    background(0);
	noFill();
	
	for (b of flock) {
		b.ACS(flock);
		b.update();
		b.display();
	}
	
}