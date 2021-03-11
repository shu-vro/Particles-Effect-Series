const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

let mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
};
window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
window.addEventListener("mouseout", () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        if (this.y + this.radius > canvas.height) {
            this.velocity.y = -this.velocity.y / 1.3;
        } else {
            this.velocity.y += 1;
        }

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.velocity.x = - this.velocity.x;
        }
        this.draw();
    }
}

function init() {
    particles = [];
    for (let i = 0; i < 50; i++) {
        let radius = Math.random() * 20 + 10;
        let x = Math.random() * canvas.width - radius;
        let y = Math.random() * canvas.height / 2;
        let color = `hsl(${Math.round(Math.random() * 360)}, 100%, 50%)`;
        let velocity = {
            x: Math.random() * 5 - 2.5,
            y: 0,
        }
        particles.push(new Particle(x, y, radius, color, velocity));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
        particle.update();
    });
    requestAnimationFrame(animate);
}

init();
animate();
