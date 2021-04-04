const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let eyes = [],
    angle,
    mouse = {
        x: undefined,
        y: undefined,
    };

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener("mouseleave", () => {
    mouse.x = undefined;
    mouse.y = undefined;
});
class Eye {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    draw() {
        // Draw eye
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "red";
        ctx.fill();
        // Draw iris
        angle = Math.atan2(mouse.y - this.y, mouse.x - this.x);
        let iris_x = this.x + (Math.cos(angle) * this.radius) / 10;
        let iris_y = this.y + (Math.sin(angle) * this.radius) / 10;
        let iris_radius = this.radius / 1.2;
        ctx.beginPath();
        ctx.arc(iris_x, iris_y, iris_radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
        // Draw pupil
        angle = Math.atan2(mouse.y - this.y, mouse.x - this.x);
        let pupil_x = this.x + (Math.cos(angle) * this.radius) / 2;
        let pupil_y = this.y + (Math.sin(angle) * this.radius) / 2;
        let pupil_radius = this.radius / 2.5;
        ctx.beginPath();
        ctx.arc(pupil_x, pupil_y, pupil_radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
        // Draw pupil reflection
        ctx.beginPath();
        ctx.arc(
            pupil_x - pupil_radius / 3,
            pupil_y - pupil_radius / 3,
            pupil_radius / 2,
            0,
            Math.PI * 2,
            false
        );
        ctx.fillStyle = `rgba(255, 255, 255, .5)`;
        ctx.fill();
        ctx.closePath();
        // Draw mouse
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 25, 0, Math.PI * 2, false);
        ctx.fillStyle = "gold";
        ctx.fill();
    }
}

function init() {
    eyes = [];
    for (let i = 0; i < 50; i++) {
        let radius = Math.random() * 75 + 5;
        let x = Math.random() * (canvas.width - radius * 2) + radius;
        let y = Math.random() * (canvas.height - radius * 2) + radius;

        if (i != 0) {
            for (let j = 0; j < eyes.length; j++) {
                let distance = Math.hypot(eyes[j].x - x, eyes[j].y - y);
                if (distance < radius + eyes[j].radius) {
                    x = Math.random() * (canvas.width - radius * 2) + radius;
                    y = Math.random() * (canvas.height - radius * 2) + radius;

                    // Take the loop back.
                    j = -1;
                }
            }
        }

        eyes.push(new Eye(x, y, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = `rgba(0, 0, 0, .25)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    eyes.forEach((eye) => {
        eye.draw();
    });
}

init();
animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
