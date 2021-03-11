const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const generateButton = document.querySelector(".generate-tree-button");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let trunkCurve = 10;
let branchCurve = 0;

function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = color1;
    ctx.fillStyle = color2;
    ctx.shadowBlur = 15;
    ctx.shadowColor = "black";
    ctx.lineWidth = branchWidth;
    ctx.translate(startX, startY);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.moveTo(0, 0);

    if (angle > 0) {
        ctx.bezierCurveTo(branchCurve, -len / 2, branchCurve, -len / 2, 0, -len);
    } else {
        ctx.bezierCurveTo(branchCurve, -len / 2, -branchCurve, -len / 2, 0, -len);
    }

    ctx.stroke();

    if (len < 5) {
        ctx.beginPath();
        ctx.arc(0, -len, Math.random() * 20 + 10, 0, Math.PI / 2, false);
        ctx.fill();
        ctx.restore();
        return;
    }

    drawTree(0, -len, len * .7, angle + trunkCurve, branchWidth * .6);
    drawTree(0, -len, len * .7, angle - trunkCurve, branchWidth * .6);
    ctx.restore();
}

drawTree(canvas.width / 2, canvas.height - 80, 120, 0, 20, 'brown', 'green');

function generateRandomTree() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let startX = canvas.width / 2;
    let startY = canvas.height - 80;
    let len = Math.floor(Math.random() * 20 + 140);
    let angle = 0;
    let branchWidth = Math.random() * 50 + 5;
    let color1 = `rgb(${Math.random() * 255}, ${0}, ${0})`;
    let color2 = `rgb(${0}, ${Math.random() * 255}, ${0})`;
    generateButton.style.background = color1;
    trunkCurve = Math.random() * 25 + 3;
    branchCurve = Math.random() * 10;
    drawTree(startX, startY, len, angle, branchWidth, color1, color2);
}

generateButton.addEventListener('click', generateRandomTree);
