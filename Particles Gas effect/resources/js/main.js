const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

let mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 150,
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
        this.opacity = 0;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
    update() {
        // Collision between wall and particle
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.velocity.y = -this.velocity.y;
        }
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.hypot(dx, dy);

        // Collision between mouse and particle
        if (distance < mouse.radius && this.opacity <= 1) {
            // console.log('go');
            this.opacity += 0.02;
        } else if (distance > mouse.radius) {
            this.opacity -= 0.02;
            if (this.opacity <= 0) {
                this.opacity = 0;
            }
        }

        // Collision between particle and particle
        for (let i = 0; i < particles.length; i++) {
            if (this == particles[i]) {
                continue;
            }
            let distance = Math.hypot(
                this.x - particles[i].x,
                this.y - particles[i].y
            );
            if (distance - this.radius * 2 < 0) {
                let angle = Math.atan2(
                    this.y - particles[i].y,
                    this.x - particles[i].x
                );
                this.velocity.x = Math.cos(angle) * 2;
                this.velocity.y = Math.sin(angle) * 2;
                particles[i].velocity.x = -Math.cos(angle) * 2;
                particles[i].velocity.y = -Math.sin(angle) * 2;
            }
        }

        // Add the velocity to coordinates.
        this.y += this.velocity.y;
        this.x += this.velocity.x;
        this.draw();
    }
}

function init() {
    particles = [];
    for (let i = 0; i < 100; i++) {
        let radius = Math.random() * 10 + 10;
        let x = Math.random() * (canvas.width - radius + 1) + radius;
        let y = Math.random() * (canvas.height - radius + 1) + radius;
        let color = `hsl(${Math.round(Math.random() * 360)}, 100%, 50%)`;
        let velocity = {
            x: Math.random() * 5 - 2.5,
            y: Math.random() * 5 - 2.5,
        };

        // We don't want the particles to override each other.
        if (i !== 0) {
            for (let j = 0; j < particles.length; j++) {
                let distance = Math.hypot(
                    x - particles[j].x,
                    y - particles[j].y
                );
                // If distance between 2 particles is less then 0, The particles will move it's place.
                if (distance - radius * 2 < 0) {
                    x = Math.random() * (canvas.width - radius + 1) + radius;
                    y = Math.random() * (canvas.height - radius + 1) + radius;

                    // Take the loop back.
                    j = -1;
                }
            }
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

window.addEventListener("resize", (e) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
