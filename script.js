// Element references
// Inputs
const x1_input = document.getElementById("x1");
const y1_input = document.getElementById("y1");
const x2_input = document.getElementById("x2");
const y2_input = document.getElementById("y2");

// Canvas
const board = document.getElementById("board");
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

// Result
const lineLength = document.getElementById("line-length");

// Variables
let lineCount = 30;
let gridSpacing = 20;
let pointRadius = 5;

let x1 = 3;
let y1 = 3;
let x2 = 6;
let y2 = 6;

// Init input values
x1_input.value = x1;
y1_input.value = y1;
x2_input.value = x2;
y2_input.value = y2;

// Event listeners
x1_input.addEventListener("input", (e) => {
    x1 = parseInt(e.target.value);
    draw();
});

y1_input.addEventListener("input", (e) => {
    y1 = parseInt(e.target.value);
    draw();
});

x2_input.addEventListener("input", (e) => {
    x2 = parseInt(e.target.value);
    draw();
});

y2_input.addEventListener("input", (e) => {
    y2 = parseInt(e.target.value);
    draw();
});

function draw() {
    drawBackground();
    drawGrid();
    drawPoints();
    drawLine();
}

canvas.width = board.offsetWidth;
canvas.height = board.offsetHeight;

draw();

function drawGrid() {
    ctx.strokeStyle = "#ddd";

    for (let i = 1; i <= lineCount; i++) {
        let value = i * gridSpacing;

        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(0, value);
        ctx.lineTo(1500, value);
        ctx.closePath();
        ctx.stroke();

        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(value, 0);
        ctx.lineTo(value, 1500);
        ctx.closePath();
        ctx.stroke();
    }
}

function drawBackground() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPoints() {
    ctx.fillStyle = "#a54d00";

    // Draw point 1
    ctx.beginPath();
    ctx.arc(gridSpacing * x1, gridSpacing * y1, pointRadius, 0, 360);
    ctx.closePath();
    ctx.fill();

    // Draw point 2
    ctx.beginPath();
    ctx.arc(gridSpacing * x2, gridSpacing * y2, pointRadius, 0, 360);
    ctx.closePath();
    ctx.fill();
}

function drawLine() {
    const x_1 = x1 * gridSpacing;
    const y_1 = y1 * gridSpacing;
    const x_2 = x2 * gridSpacing;
    const y_2 = y2 * gridSpacing;

    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(x_1, y_1);
    ctx.lineTo(x_2, y_2);
    ctx.closePath();
    ctx.stroke();

    // Calc the resulting line length
    const delta_x = Math.abs(x_1 - x_2);
    const delta_y = Math.abs(y_1 - y_2);
    const diagonal = Math.sqrt(delta_x ** 2 + delta_y ** 2)
    lineLength.innerHTML = diagonal / gridSpacing;
}