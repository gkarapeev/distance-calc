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
const slope_el = document.getElementById("slope");

// Variables
let lineCount = 31;
let gridSpacing = 20;
let pointRadius = 5;
let gridOffsetFromEdge = 40;

const pointColor = "#a54d00";
const midPointColor = "blue";
const yInterceptColor = "orange";   

const canvasSize = 680;
const halfCanvasSize = canvasSize / 2;
canvas.width = canvasSize;
canvas.height = canvasSize;
canvas.style.width = canvasSize + "px";
canvas.style.height = canvasSize + "px";
 
let x1 = -3;
let y1 = 0;
let x2 = 9;
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

// Utils
const toScreen = value => value * gridSpacing;
const toWorld = value => value / gridSpacing;

// The real deal
function drawBackground() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    
    drawGrid();
}

function drawGrid() {
    const lineLength = canvasSize - gridOffsetFromEdge;
    ctx.strokeStyle = "#ddd";

    for (let i = 1; i < lineCount - 1; i++) {
        let start = toScreen(i) + gridOffsetFromEdge;

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
        ctx.stroke();
        ctx.closePath();

        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(start, gridOffsetFromEdge);
        ctx.lineTo(start, lineLength);
        ctx.stroke();
        ctx.closePath();
    }

    ctx.strokeStyle = "#777";
    let start = ((lineCount - 1) / 2) * gridSpacing + gridOffsetFromEdge;

    // Horizontal center line
    ctx.beginPath();
    ctx.moveTo(gridOffsetFromEdge, start);
    ctx.lineTo(lineLength, start);
    ctx.stroke();
    ctx.closePath();

    // Vertical center line
    ctx.beginPath();
    ctx.moveTo(start, gridOffsetFromEdge);
    ctx.lineTo(start, lineLength);
    ctx.stroke();
    ctx.closePath();
}

function drawPoints() {
    ctx.fillStyle = pointColor;

    // Draw point 1
    ctx.beginPath();
    ctx.arc(toScreen(x1), toScreen(y1) * -1, pointRadius, 0, 360);
    ctx.fill();
    ctx.closePath();

    // Draw point 2
    ctx.beginPath();
    ctx.arc(toScreen(x2), toScreen(y2) * -1, pointRadius, 0, 360);
    ctx.fill();
    ctx.closePath();

    // Draw the midpoint
    const [ midPointX, midPointY ] = midPoint(x1, y1, x2, y2);
    ctx.beginPath();
    ctx.arc(toScreen(midPointX), toScreen(midPointY) * -1, pointRadius - 0.5, 0, 360);
    ctx.fillStyle = midPointColor;
    ctx.fill();
    ctx.closePath();
}

function midPoint(x1, y1, x2, y2) {
    return [ (x1 + x2) / 2, (y1 + y2) / 2 ];
}

function drawConnectingLine() {
    ctx.strokeStyle = "red";

    ctx.beginPath();
    ctx.moveTo(toScreen(x1), toScreen(y1) * -1);
    ctx.lineTo(toScreen(x2), toScreen(y2) * -1);
    ctx.stroke();
    ctx.closePath();

    const delta_x = x2 - x1;
    const delta_y = y2 - y1;
    const slope = delta_y / delta_x;
    const diagonal = Math.sqrt(delta_x ** 2 + delta_y ** 2);

    drawPerpendicularBisector(...midPoint(x1, y1, x2, y2), slope);
    drawResults(slope, diagonal);
}

function drawPerpendicularBisector(x, y, sl) {
    const slope = -1 * (1 / sl); // Slope opposite reciprocal, because we want perpendicular
    const y_intercept = y - slope * x; // y = mx + b; b = y - m * x;

    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(toScreen(0), toScreen(y_intercept) * -1);
    ctx.lineTo(toScreen(x), toScreen(y * -1));
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = yInterceptColor;
    ctx.beginPath();
    ctx.arc(toScreen(0), toScreen(y_intercept * -1), pointRadius - 0.5, 0, 360);
    ctx.fill();
    ctx.closePath();
}

function drawResults(slope, diagonal) {
    lineLength.innerHTML = diagonal.toFixed(3);
    slope_el.innerHTML = slope.toFixed(3);
}

function draw() {
    drawBackground();

    ctx.save();
    ctx.translate(halfCanvasSize, halfCanvasSize);

    drawConnectingLine();
    drawPoints();

    ctx.restore();
}

draw();
