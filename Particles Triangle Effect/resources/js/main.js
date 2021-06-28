const canvas = document.querySelector("canvas"),
    ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function deg(degree) {
    return (Math.PI / 180) * degree;
}

function p2c(r, theta) {
    return {
        x: r * Math.cos(theta),
        y: r * Math.sin(theta),
    };
}

let triangles = [],
    interval,
    hue = 0,
    color = `hsl(${hue}, 100%, 50%)`;

class Triangle {
    constructor(r) {
        this.r = r || 0;
    }
    draw() {
        let i = 0;
        // for (let i = 0; i < 5; i++) {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(deg(-90));
        ctx.beginPath();
        let { x: x1, y: y1 } = p2c(this.r + i * 45, 0);
        let { x: x2, y: y2 } = p2c(this.r + i * 45, deg(120));
        let { x: x3, y: y3 } = p2c(this.r + i * 45, deg(240));
        ctx.shadowColor = color;
        ctx.shadowBlur = 20;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.strokeStyle = color;
        ctx.lineWidth = 5;
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
        // }
    }
    update() {
        this.r += 10;
        this.draw();
    }
}

function init() {
    triangles = [];
    interval = setInterval(() => {
        triangles.push(new Triangle());
    }, 200);
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    hue += 0.5;
    color = `hsl(${hue}, 100%, 50%)`;
    triangles.forEach((triangle, index) => {
        if (triangle.r < Math.hypot(canvas.width, canvas.height)) {
            triangle.update();
        } else {
            triangles.splice(index, 1);
        }
    });
}

init();
animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    clearInterval(interval);
    init();
});
