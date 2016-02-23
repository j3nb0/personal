function Star(x,y,r,color){
	this.x = x; // x coordinate
	this.y = y; // y coordinate
	this.r = r; // radius
	this.rChange = 0.015; // rate of size change
	this.color = color; // color of star
}

// Create the individual star
Star.prototype = {
	constructor: Star,
	render: function(){
		context.beginPath();
		context.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
		context.fillStyle = this.color;
		context.fill();
	},
	update: function(){

	if (this.r > 2 || this.r < .8) {
		this.rChange = - this.rChange;
	}
		this.r += this.rChange;
	}
}


// Create canvas
var canvas = document.getElementById("star-canvas");
var context = canvas.getContext("2d");

// Define canvas width and height ad assign attribute
var C_WIDTH = canvas.width = window.innerWidth;
var C_HEIGHT = canvas.height = window.innerHeight;

// Choose random star color from list
function randomColor() {
	var arrColors = ["f1f1f1", "ffecd3" , "cafcf7"];
	return "#"+arrColors[Math.floor((Math.random()*3))];
}

// Array of star objects
var arrStars = [];

// Add stars with random radii and positions to star array
function addStars() {

	for(i = 0; i < 400; i++){
		var randX = Math.floor((Math.random()*C_WIDTH)+1);
		var randY = Math.floor((Math.random()*C_HEIGHT)+1);
		var randR = Math.random() * 1.7 + .5;

		var star = new Star(randX, randY, randR, randomColor());
		arrStars.push(star);
	}
}

addStars();

// Update canvas with radius changes
function update(){
	for(i = 0; i < arrStars.length; i ++){
		arrStars[i].update();
	}
}

// Kick off animation
function animate(){
	update();

	context.clearRect(0,0,C_WIDTH,C_HEIGHT);
	for(var i = 0; i < arrStars.length; i++){
		arrStars[i].render();
	}
	requestAnimationFrame(animate);
}

animate();

// Update canvas size and redraw stars on window resize
window.addEventListener('resize', function() {
	context.clearRect(0,0,C_WIDTH,C_HEIGHT);

	C_WIDTH = canvas.width = window.innerWidth;
	C_HEIGHT = canvas.height = window.innerHeight;

	arrStars = [];
	addStars();
});
