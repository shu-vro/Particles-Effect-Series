const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particlesArray = [];

const colors = [
    'white', 
    'rgba(255, 255, 255, .3)',
    'rgba(173, 216, 230, .8)',
    'rgba(211, 211, 211, .8)',
];
const maxSize = 40;
const minSize = 0;
const mouseRadius = 60;

// Mouse position...
let mouse = {
    x: null,
    y:null, 
}
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})
// Create constructor function for particles...
class Particles{
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    // add draw method to particles prototype...
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2 ,false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    // Add update method to particles prototype...
    update() {
        if (this.x + this.size*2 > canvas.width || this.x - this.size * 2 < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y + this.size*2 > canvas.height || this.y - this.size*2 < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;


        // Mouse inactivity...
        if (    mouse.x - this.x < mouseRadius
            &&  mouse.x - this.x > -mouseRadius
            &&  mouse.y - this.y < mouseRadius
            &&  mouse.y - this.y > - mouseRadius) {
            if (this.size < maxSize) {
                this.size += 3;
            }
        }
        else if (this.size > minSize) {
            this.size -= .1;
        }
        if (this.size < 0) {
            this.size = 0;
        }
        this.draw();
    }
}

// create particles array...
function init() {
    particlesArray = [];
    for (let i = 0; i < 1000; i++) {
        let size = 0;
        let x = (Math.random() * ((innerWidth - size * 2) - (size*2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size*2)) + size * 2);
        let directionX = (Math.random() * .2) - .1;
        let directionY = (Math.random() * .2) - .1;
        let color = colors[Math.floor(Math.random() * colors.length)];

        particlesArray.push(new Particles(x, y, directionX, directionY, size, color));
    }
}

// Animation loop...
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}
init();
animate();

// Resize event...
window.addEventListener('resize', function () {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
    init();
});

// Remove mouse position periodically
// window.addEventListener('mouseout', function () {
//     mouse.x = undefined;
//     mouse.y = undefined;
// })
setInterval(() => {
    mouse.x = undefined;
    mouse.y = undefined;
}, 1000);