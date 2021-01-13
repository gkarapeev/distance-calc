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

const pointColor = "#a54d00";
const midPointColor = "blue";

const canvasSize = 680;
const halfCanvasSize = canvasSize / 2;
canvas.width = canvasSize;
canvas.height = canvasSize;
canvas.style.width = canvasSize + "px";
canvas.style.height = canvasSize + "px";
 
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
    ctx.fillRect(0, 0, canvasSize, canvasSize);
}

function drawGrid() {
    const lineLength = canvasSize - gridOffsetFromEdge;
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
    ctx.fillStyle = pointColor;

    // Draw point 1
    ctx.beginPath();
    ctx.arc(gridSpacing * x1 + halfCanvasSize, gridSpacing * y1 * -1 + halfCanvasSize, pointRadius, 0, 360);
    ctx.closePath();
    ctx.fill();

    // Draw point 2
    ctx.beginPath();
    ctx.arc(gridSpacing * x2 + halfCanvasSize, gridSpacing * y2 * -1 + halfCanvasSize, pointRadius, 0, 360);
    ctx.closePath();
    ctx.fill();

    // Draw the midpoint
    const [ midPointX, midPointY ] = midPoint(x1, y1, x2, y2);
    const screenMidPointX = gridSpacing * midPointX + halfCanvasSize;
    const screenMidPointY = gridSpacing * midPointY * -1 + halfCanvasSize;

    ctx.beginPath();
    ctx.arc(screenMidPointX, screenMidPointY, pointRadius - 0.5, 0, 360);
    ctx.closePath();
    ctx.fillStyle = midPointColor;
    ctx.fill();
}

function midPoint(x1, y1, x2, y2) {
    return [ (x1 + x2) / 2, (y1 + y2) / 2 ];
}

function drawConnectingLine() {
    const x_1 = x1 * gridSpacing;
    const y_1 = y1 * gridSpacing;
    const x_2 = x2 * gridSpacing;
    const y_2 = y2 * gridSpacing;

    ctx.strokeStyle = "red";

    ctx.save();
    ctx.translate(halfCanvasSize, halfCanvasSize);
    ctx.beginPath();
    ctx.moveTo(x_1, y_1 * -1);
    ctx.lineTo(x_2, y_2 * -1);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    drawResults(x_1, y_1, x_2, y_2);
}

function drawPerpendicularBisector(x = 1.5, y = 1.5, length = 4, slope = -1) {
    // Find where the point would be on this slope if X was 1 unit more
    const slopeOppositeReciprocal = -1 * (1 / slope);
    const xPlusOneY = x * slopeOppositeReciprocal;
    const nextPointScreenY = xPlusOneY * gridSpacing * -1 + halfCanvasSize;
    const nextPointScreenX = (x + 1) * gridSpacing + halfCanvasSize;

    ctx.beginPath();
    ctx.moveTo(nextPointScreenX, nextPointScreenY);
    ctx.lineTo(-1 * nextPointScreenX, -1 * nextPointScreenY);
    ctx.closePath();
    ctx.stroke();
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
 
drawPerpendicularBisector();