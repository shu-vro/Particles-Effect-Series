const canvas = document.querySelector("canvas")!;
const ctx = canvas.getContext("2d")!;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray: any[] = [];
let bars: any[] = [];

const audio = document.querySelector("audio")!;
class MusicAnalyzer {
    source: HTMLMediaElement;
    audioContext: AudioContext;
    analyzer: AnalyserNode;
    audioSource: MediaElementAudioSourceNode;
    bufferLength: number;
    dataArray: Uint8Array;
    constructor(source: HTMLMediaElement) {
        this.source = source;
        this.audioContext = new AudioContext();
        this.analyzer = this.audioContext.createAnalyser();
        this.audioSource = this.audioContext.createMediaElementSource(
            this.source
        );
        this.audioSource.connect(this.analyzer);
        this.analyzer.connect(this.audioContext.destination);
        this.analyzer.fftSize = 256;
        this.bufferLength = this.analyzer.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
    }

    getSamples() {
        this.analyzer.getByteFrequencyData(this.dataArray);
        let intendedArray = this.dataArray.slice(
            0,
            Math.round(this.bufferLength / 2)
        );
        let samples = [...intendedArray].concat([
            ...intendedArray.slice().reverse(),
        ]);
        return samples;
    }

    getVolume() {
        this.analyzer.getByteFrequencyData(this.dataArray);
        return this.dataArray.reduce((a, b) => a + b) / this.bufferLength;
    }
}
const musicAnalyzer = new MusicAnalyzer(audio);

// Draw image function
function drawImage() {
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    class Particle {
        public color: string | CanvasGradient | CanvasPattern;
        public x: number;
        public y: number;
        public size: number;
        public baseX: number;
        public baseY: number;
        public constructor(
            x: number,
            y: number,
            color: string | CanvasGradient | CanvasPattern,
            size: number
        ) {
            this.x = x + canvas.width / 2 - png.width / 2;
            this.y = y + canvas.height / 2 - png.height / 2;
            this.color = color;
            this.size = size;
            this.baseX = x + canvas.width / 2 - png.width / 2;
            this.baseY = y + canvas.height / 2 - png.height / 2;
        }
        public draw() {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();
        }
        public update() {
            let angle = Math.atan2(
                canvas.height / 2 - this.y,
                canvas.width / 2 - this.x
            );
            let distance = Math.sqrt(
                Math.pow(canvas.height / 2 - this.y, 2) +
                    Math.pow(canvas.width / 2 - this.x, 2)
            );
            let dense = 150;
            let volume = musicAnalyzer.getVolume();
            let forceDirectionX = (Math.cos(angle) * volume * distance) / dense;
            let forceDirectionY = (Math.sin(angle) * volume * distance) / dense;
            this.x = this.baseX - forceDirectionX;
            this.y = this.baseY - forceDirectionY;
            this.draw();
        }
    }
    class Bar {
        x: number;
        y: number;
        color: string;
        width: number;
        height: number;
        index: number;
        constructor(
            x: number,
            y: number,
            width: number,
            height: number,
            color: string,
            index: number
        ) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.width = width;
            this.height = height;
            this.index = index;
        }

        draw() {
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.width;
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((this.index * (Math.PI * 2)) / bars.length + Math.PI);
            ctx.moveTo(0, 75);
            ctx.lineTo(0, this.height + 50);
            ctx.stroke();
            ctx.restore();
        }

        update(input: number) {
            const sound = input;

            if (sound > this.height) {
                this.height = sound;
            } else {
                this.height -= this.height * 0.05;
            }
            this.draw();
        }
    }
    function init(n: number) {
        particlesArray = [];
        bars = [];
        for (let y = 0; y < data.height; y++) {
            for (let x = 0; x < data.width; x++) {
                if (data.data[y * 4 * data.width + x * 4 + 3] > 128) {
                    if (x % n !== 0 || y % n !== 0) {
                        continue;
                    }
                    let positionX = x;
                    let positionY = y;
                    let color =
                        "rgb(" +
                        data.data[y * 4 * data.width + x * 4] +
                        ", " +
                        data.data[y * 4 * data.width + x * 4 + 1] +
                        ", " +
                        data.data[y * 4 * data.width + x * 4 + 2] +
                        ")";

                    particlesArray.push(
                        new Particle(positionX, positionY, color, n)
                    );
                }
            }
        }
        for (let i = 0; i < musicAnalyzer.bufferLength; i++) {
            bars.push(
                new Bar(
                    (canvas.width / musicAnalyzer.bufferLength) * i,
                    300,
                    0.5,
                    250,
                    "white",
                    i
                )
            );
        }
    }

    let centerCircle = new Particle(png.width / 2, png.height / 2, "white", 50);

    function animate() {
        requestAnimationFrame(animate);
        // ctx.fillStyle = "rgba(0, 0, 0, 1)";
        // ctx.fillRect(0, 0, innerWidth, innerHeight);
        ctx.drawImage(png, 0, 0, canvas.width, canvas.height);

        particlesArray.forEach(p => {
            p.update();
        });
        bars.forEach((b, i) => {
            b.update(musicAnalyzer.getSamples()[i]);
        });
        const gradient = ctx.createConicGradient(
            -Math.PI / 2,
            canvas.width / 2,
            canvas.height / 2
        );
        gradient.addColorStop(0, "white");
        gradient.addColorStop(audio.currentTime / audio.duration, "white");
        gradient.addColorStop(
            audio.currentTime / audio.duration + 0.00001,
            "transparent"
        );
        gradient.addColorStop(1, "transparent");
        centerCircle.color = gradient;
        centerCircle.draw();
    }
    let size = 10;
    init(size);
    animate();
    window.addEventListener("resize", function () {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init(size);
    });
}

var png = document.querySelector("img")!;

window.addEventListener("load", () => {
    ctx.drawImage(png, 0, 0, png.width, png.height);
    drawImage();
});

document.addEventListener("click", startPlayer);

function startPlayer() {
    audio.play();
    musicAnalyzer.audioContext.resume();
    document.removeEventListener("click", startPlayer);
}
