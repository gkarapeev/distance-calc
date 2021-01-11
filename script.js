// Element references
// Inputs
const x1_input = document.getElementById("x1");
const y1_input = document.getElementById("y1");
const x2_input = document.getElementById("x2");
const y2_input = document.getElementById("y2");

// Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Results
const lineLength = document.getElementById("line-length");
const slope = document.getElementById("slope");

// Variables
let lineCount = 31;
let gridSpacing = 20;
let pointRadius = 5;
let gridOffsetFromEdge = 40;

const CANVAS_SIZE = 680;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
canvas.style.width = CANVAS_SIZE + "px";
canvas.style.height = CANVAS_SIZE + "px";

let x1 = 0;
let y1 = 0;
let x2 = 3;
let y2 = 3;

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

function drawBackground() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawGrid() {
    const lineLength = CANVAS_SIZE - gridOffsetFromEdge;
    ctx.strokeStyle = "#ddd";

    for (let i = 1; i < lineCount - 1; i++) {
        let start = i * gridSpacing + gridOffsetFromEdge;

        /**
         * Skip middle lines and draw them black at the end,
         * so that they're on top of the grey ones
         */
        if (i === (lineCount - 1) / 2) {
            continue;
        }

        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(gridOffsetFromEdge, start);
        ctx.lineTo(lineLength, start);
        ctx.closePath();
        ctx.stroke();

        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(start, gridOffsetFromEdge);
        ctx.lineTo(start, lineLength);
        ctx.closePath();
        ctx.stroke();
    }

    ctx.strokeStyle = "#777";
    let start = ((lineCount - 1) / 2) * gridSpacing + gridOffsetFromEdge;

    // Horizontal center line
    ctx.beginPath();
    ctx.moveTo(gridOffsetFromEdge, start);
    ctx.lineTo(lineLength, start);
    ctx.closePath();
    ctx.stroke();

    // Vertical center line
    ctx.beginPath();
    ctx.moveTo(start, gridOffsetFromEdge);
    ctx.lineTo(start, lineLength);
    ctx.closePath();
    ctx.stroke();
}

function drawPoints() {
    ctx.fillStyle = "#a54d00";

    // Draw point 1
    ctx.beginPath();
    ctx.arc(gridSpacing * x1 + canvas.width / 2, gridSpacing * y1 * -1 + canvas.width / 2, pointRadius, 0, 360);
    ctx.closePath();
    ctx.fill();

    // Draw point 2
    ctx.beginPath();
    ctx.arc(gridSpacing * x2 + canvas.width / 2, gridSpacing * y2 * -1 + canvas.width / 2, pointRadius, 0, 360);
    ctx.closePath();
    ctx.fill();
}

function drawConnectingLine() {
    const x_1 = x1 * gridSpacing;
    const y_1 = y1 * gridSpacing;
    const x_2 = x2 * gridSpacing;
    const y_2 = y2 * gridSpacing;

    ctx.strokeStyle = "red";

    const centerLocation = CANVAS_SIZE / 2;

    ctx.save();
    ctx.translate(centerLocation, centerLocation);
    ctx.beginPath();
    ctx.moveTo(x_1, y_1 * -1);
    ctx.lineTo(x_2, y_2 * -1);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    drawResults(x_1, y_1, x_2, y_2);
}

function drawResults(x_1, y_1, x_2, y_2) {
    // Calc the resulting line length
    const delta_x = x_2 - x_1;
    const delta_y = y_2 - y_1;
    const diagonal = Math.sqrt(delta_x ** 2 + delta_y ** 2)
    lineLength.innerHTML = diagonal / gridSpacing;

    // Calc the slope
    slope.innerHTML = delta_y / delta_x;
}

function draw() {
    drawBackground();
    drawGrid();
    drawConnectingLine();
    drawPoints();
}

draw();