const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [],
    mouse = {
        x: canvas.width / 2,
        y: canvas.height / 2,
    };

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

class Particle {
    constructor(x, y, radius, color, distance) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.distance = distance;

        this.directionX = Math.cos(this.angle) * this.distance + mouse.x;
        this.directionY = Math.sin(this.angle) * this.distance + mouse.y;
        this.angle = Math.random() * Math.PI * 2;
        this.velocity = Math.random() * 0.03 + 0.02;
        this.lastMouse = {
            x: x,
            y: y,
        };
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    update() {
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * .05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * .05;
        this.directionX = Math.cos(this.angle) * this.distance + this.lastMouse.x;
        this.directionY = Math.sin(this.angle) * this.distance + this.lastMouse.y;

        if (this.x - this.radius < 0 && mouse.x < this.distance) {
            this.directionX = 0;
        } else if (this.x + this.radius > canvas.width && mouse.x + this.distance > canvas.width) {
            this.directionX = canvas.width;
        }

        if (this.y - this.radius < 0 && mouse.y < this.distance) {
            this.directionY = 0;
        } else if (this.y + this.radius > canvas.height && mouse.y + this.distance > canvas.height) {
            this.directionY = canvas.height;
        }
        this.x = this.directionX;
        this.y = this.directionY;
        this.angle += this.velocity;
        this.draw();
    }
}

function init() {
    particles = [];
    for (let i = 0; i < 60; i++) {
        let x = canvas.width / 2;
        let y = canvas.height / 2;
        let radius = Math.random() * 2 + 2;
        let color = `hsl(${Math.round(Math.random() * 360)}, 100%, 50%)`;
        let distance = Math.random() * 50 + 80;
        particles.push(new Particle(x, y, radius, color, distance));
    }
}
init();

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = `rgba(0, 0, 0, .15)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
        particle.update();
    });
}
animate();
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
