const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray;

// Mouse Event
let mouse = {
    x: null,
    y: null,
    radius: 50,
};
window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});
// Mouseout event.
window.addEventListener("mouseout", () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

class Particles {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        // Collision Detection
        if (this.x + this.size * 2 > canvas.width || this.x - this.size * 2 < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y + this.size * 2 > canvas.height || this.y - this.size * 2 < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;

        // Mouse movement and actions.
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }

        this.draw();
    }
}
// Initialization.
function init() {
    particlesArray = [];
    for (let i = 0; i < 120; i++) {
        let size = Math.random() * 5 + 1;
        let x = Math.random() * (canvas.width - size * 2 - size * 2) + size * 2;
        let y = Math.random() * (canvas.height - size * 2 - size * 2) + size * 2;
        let directionX = Math.random() * 5 - 2.5;
        let directionY = Math.random() * 5 - 2.5;
        let color = "hsl(" + Math.floor(Math.random() * 360) + ", 100%, 50%)";
        particlesArray.push(new Particles(x, y, directionX, directionY, size, color));
    }
}

// Connection Between Particles
function connect() {
    let opacity = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = 0; b < particlesArray.length; b++) {
            let distance =
                (particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x) +
                (particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y);
            if (distance < (canvas.width / 10) * (canvas.height / 10)) {
                opacity = 1 - distance / 20000;

                // Connection Between two particles (or more).
                let dx = mouse.x - particlesArray[a].x;
                let dy = mouse.y - particlesArray[a].y;
                let mouseDistance = Math.sqrt(dx * dx + dy * dy);

                // If max distance between mouse and particle is more than 180px, The color will be blue else red.
                if (mouseDistance < 180) {
                    ctx.strokeStyle = "rgba(255, 0, 0, " + opacity + ")";
                } else {
                    ctx.strokeStyle = "rgba(0, 0, 255, " + opacity + ")";
                }
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();

                // The connection Between mouse and particles.
                ctx.strokeStyle = "rgba(153, 69, 0, .08)";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(mouse.x, mouse.y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    // Making animation Frame.
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}
init();
animate();
// Resize event.
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
