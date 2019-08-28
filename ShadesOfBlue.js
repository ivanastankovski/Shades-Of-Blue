var header = document.querySelector("h1");
header.addEventListener('click', function() {
  this.classList.add("remove");
});

var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// c - stands for Context
var c = canvas.getContext('2d');

//creating object mouse:
var mouse = {
    x: undefined,
    y: undefined
}
var maxRadius = 40;
// var minRadius = 2;

var colorArray = [
    "#191970",
    "#000080",
    "#00008B",
    "#0000CD",
    "#0000FF"
]

window.addEventListener('mousemove', function(event) {
    //finding the position of the mouse
    mouse.x = event.x;
    mouse.y = event.y;
    this.console.log(mouse);
});

//event listener for resizing
window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 
    //calling a function init() - for new bubbles after resize
    init();
});

//MOVING CIRCLE
//creating JavaScript OBJECT Circle:
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    //fixing issue of blinking circles
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    //draw the circle
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        c.strokeStyle = "#191970";
        c.fillStyle = this.color;
        c.stroke();
        c.fill();
    }
    //move the circle
    this.update = function() {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
    
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //interactivity:
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            //do this while circle radius is < maxRadius (=40)
            if(this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

//creating i number of circles:
var circleArray = [];
function init() {
    circleArray = [];
    for(var i = 0; i < 800; i++) {
        //creating function for animating the circle
        // +1 so that the min radius is 1, not 0
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        //defining velocity for x=dx, for y = dy
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5); 
        //adding new circle to the array:
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {
    //creatin a loop of 2 functions: animate() & requestAnimationFrame();
        requestAnimationFrame(animate);
        //clear the screen befor calling the function again = moving effect
        c.clearRect(0, 0, innerWidth, innerHeight);
        //acces each circle from the array:
        for(var i = 0; i < circleArray.length; i++) {
            circleArray[i].update();
        }
}
animate();
init();
