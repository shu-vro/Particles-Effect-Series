const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
let canvasCenterX = window.innerWidth / 2;
let canvasCenterY = window.innerHeight / 2;
let radius = window.innerWidth / 5;
let angle = 0;

// GET MOUSE POSITION ///////////////////////////////
let mouse = {
    x: null,
    y: null,
};
window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});
// SET MOUSE POSITION AS UNDEFINED EVERY 5 SEC(to prevent effect getting stuck in corners when mouse leaves window)//////
setInterval(function () {
    mouse.x = undefined;
    mouse.y = undefined;
}, 10);

// CREATE PARTICLE OBJECT ///////////////////
class Particle {
    constructor(x, y, size, color, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
    }
    update() {
        // autopilot when mouse leaves canvas
        if (mouse.x == undefined && mouse.y == undefined) {
            let newX = radius * 2 * Math.cos(angle * (Math.PI / 180));
            let newY = radius * 0.9 * Math.sin(angle * (Math.PI / 90));
            mouse.x = newX + canvasCenterX;
            mouse.y = newY + canvasCenterY;
        }
        angle += Math.random() * 0.02 + 0.001; //0.001 - 0.021

        this.size -= 0.15;
        if (this.size < 0) {
            this.x = mouse.x + (Math.random() * 20 - 10);
            this.y = mouse.y + (Math.random() * 20 - 10);
            this.size = Math.random() * 25; // The prior size of the particles
            this.weight = Math.random() * 2 + 0.1; // The prior weight of the particles
        }
        this.y += this.weight;
        this.weight += 0.05;

        // if it reaches bottom bounce
        if (this.y > canvas.height - this.size) {
            this.weight *= -0.5;
        }
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < 150; i++) {
        let size = Math.random() * 10 + 5;
        let x = Math.random() * (innerWidth - size * 2) + size;
        let y = Math.random() * (innerHeight - size * 2) + size;
        let color = "black";
        let weight = 1;
        particlesArray.push(new Particle(x, y, size, color, weight));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
}
init();
animate();

// check if particles are close enough to draw line between them
function connect() {
    let opacity = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = Math.sqrt(
                (particlesArray[a].x - particlesArray[b].x) *
                    (particlesArray[a].x - particlesArray[b].x) +
                    (particlesArray[a].y - particlesArray[b].y) *
                        (particlesArray[a].y - particlesArray[b].y)
            );
            if (distance < 110) {
                opacity = 1 - distance / 100;
                ctx.strokeStyle = "rgba(0,0,0," + opacity + ")";
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasCenterX = window.innerWidth / 2;
    canvasCenterY = window.innerHeight / 2;
    radius = window.innerWidth / 5;
    init();
});
