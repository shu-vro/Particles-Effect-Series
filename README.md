# Particles-Effect-Series

Particles Effect Series &lt;html> {css} (JavaScript)

![canvas](https://camo.githubusercontent.com/63d537cc39ef0d570aef0467bf2f8e010c6edb73c7cf7b80bef14daa0174ba80/68747470733a2f2f692e737461636b2e696d6775722e636f6d2f34553536352e706e67)

## Links
<a
    href="https://shu-vro.github.io/Particles-Effect-Series/Firework Particles Effect/Firework Particles Effect.html"
    class="link"
    target="_blank"
    >Firework Particles Effect</a>
    
<a
    href="https://shu-vro.github.io/Particles-Effect-Series/Image Particles Effect/Image Particles Effect.html"
    class="link"
    target="_blank"
    >Image Particles Effect</a>
    
<a
    href="https://shu-vro.github.io/Particles-Effect-Series/Particles move on mousemove/Particles move on mousemove.html"
    class="link"
    target="_blank"
    >Particles move on mousemove</a>
    
<a
    href="https://shu-vro.github.io/Particles-Effect-Series/Particles Effect/PARTICLES EFFECT.html"
    class="link"
    target="_blank"
    >Particles Effect</a>
    
<a
    href="https://shu-vro.github.io/Particles-Effect-Series/Particles Effect Trail/Particles Effect Trail.html"
    class="link"
    target="_blank"
    >Particles Effect Trail</a>
    
<a
    href="https://shu-vro.github.io/Particles-Effect-Series/Particles Effect_2/Particles Effect_2.html"
    class="link"
    target="_blank"
    >Particles Effect_2</a>
    
<a
    href="https://shu-vro.github.io/Particles-Effect-Series/Particles Effect_Connectable/Particles Effect_Connectable.html"
    class="link"
    target="_blank"
    >Particles Effect Connectable</a>
    
<a
    href="https://shu-vro.github.io/Particles-Effect-Series/Particles EyeBall Effect/Particles Eyeball Effect.html"
    class="link"
    target="_blank"
    >Particles EyeBall Effect</a>
    
<a
    href="https://shu-vro.github.io/Particles-Effect-Series/Particles Gas effect/Particles Gas Effect.html"
    class="link"
    target="_blank"
    >Particles Gas Effect</a>
    
<a
    href="https://shu-vro.github.io/Particles-Effect-Series/Particles Gravity Effect/Particles Gravity Effect.html"
    class="link"
    target="_blank"
    >Particles Gravity Effect</a>
    
<a
    href="https://shu-vro.github.io/Particles-Effect-Series/Particles Root Effect/Particles Root Effect.html"
    class="link"
    target="_blank"
    >Particles Root Effect</a>
    
<a
    href="https://shu-vro.github.io/Particles-Effect-Series/Particles Star Shower/Particles Star Shower.html"
    class="link"
    target="_blank"
    >Particles Star Shower</a>
    
<a
    href="https://shu-vro.github.io/Particles-Effect-Series/Particles Text Effect/Particles Text Effect.html"
    class="link"
    target="_blank"
    >Particles Text Effect</a>
    
<a
    href="https://shu-vro.github.io/Particles-Effect-Series/Particles Triangle Effect/Particles Triangle Effect.html"
    class="link"
    target="_blank"
    >Particles Triangle Effect</a>
    
<a
    href="https://shu-vro.github.io/Particles-Effect-Series/Particles With Music/Particles With Music.html"
    class="link"
    target="_blank"
    >Particles With Music</a>
    

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

Here, we are going to learn very basics of canvas element. We are going to make some floating particles that we are going to animate to make cool animations, background and games too. We are going to understand some basic math functions and their usages in coding. These tutorials are going to be user friendly and you can use them anywhere if you want to impress your friends, or use them in your website.

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
