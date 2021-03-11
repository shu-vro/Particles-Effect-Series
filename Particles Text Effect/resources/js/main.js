const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

let mouse = {
    x: null,
    y: null,
    radius: 100
};
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});
window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

ctx.fillStyle = 'black';
ctx.font = '35px Arial';
var adjustX = 60;
var adjustY =  60;
ctx.fillText('Shuvro', adjustX, adjustY);
const data = ctx.getImageData(0, 0, window.innerWidth, window.innerHeight);

class Particles {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.velocity = (Math.random() * 50) + 1;
    }
    draw() {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let force = (mouse.radius - distance) / mouse.radius;
        let directionX = force * forceDirectionX * this.velocity;
        let directionY = force * forceDirectionY * this.velocity;
        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x != this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 15;
            }
            if (this.y != this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 15;
            }
        }
        this.draw();
    }
}

function init() {
    particlesArray = [];
    for (let y = 0, y2 = data.height; y < y2; y++) {
        for (let x = 0, x2 = data.width; x < x2; x++) {
            if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
                let positionX = x * 6;
                let positionY = y * 6;
                particlesArray.push(new Particles(positionX, positionY));
            }
        }
    }
}

function connect() {
    let opacity = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = Math.sqrt(((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
            ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y)));
            if (distance < 20) {
                opacity = 1 - (distance / 50);
                ctx.strokeStyle = 'rgba(0, 0, 0, '+opacity+')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(255, 255, 255, .5)';
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}
init()
animate()

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})