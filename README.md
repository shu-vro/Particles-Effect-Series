# Particles-Effect-Series

Particles Effect Series &lt;html> {css} (JavaScript)

![canvas](https://i.stack.imgur.com/4U565.png)

## What is canvas?

> **_The Canvas API provides a means for drawing graphics via JavaScript and the HTML &lt;canvas> element._**

Among other things, it can be used for animation, game graphics, data visualization, photo manipulation, and real-time video processing.

The Canvas API largely focuses on 2D graphics. The WebGL API, which also uses the &lt;canvas> element, draws hardware-accelerated 2D and 3D graphics.

## Browser Support

---

| Chrome         | 4.0 |
| -------------- | --- |
| Microsoft Edge | 9.0 |
| Firefox        | 2.0 |
| Safari         | 3.1 |
| Opera          | 9.0 |

## What we are going to learn

---

Here, we are going to learn very basics of canvas element. We are going to make some floating particles that we are going to animate to make cool animations, background and games too.

## Some Common Code

---

### HTML

```html
<canvas></canvas>
```

### CSS

```css
body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

canvas {
    position: absolute;
    top: 0;
    left: 0;
}
```

### JavaScript

```js
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
        this.draw();
    }
}

function init() {
    particles = [];
    for (let i = 0; i < 50; i++) {
        let radius = Math.random() * 20 + 10;
        let x = Math.random() * canvas.width - radius;
        let y = Math.random() * canvas.height - radius;
        let color = `hsl(${Math.round(Math.random() * 360)}, 100%, 50%)`;
        let velocity = {
            x: Math.random() * 5 - 2.5,
            y: 0,
        };
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

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
```

#### For More Details, Goto [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
