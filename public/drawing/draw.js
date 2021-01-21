import { toScreen as toScreenFactory } from './utils.js';
import { BoardService } from './board-service.js';
import { bindEvents } from './bind-events.js';

const s = new BoardService();
const toScreen = toScreenFactory(s.gridSpacing);
const { ctx, lineLength, slope_el } = bindEvents(draw, s);

function drawBackground() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, s.canvasSize, s.canvasSize);
    
    drawGrid();
}

function drawGrid() {
    const lineLength = s.canvasSize - s.gridOffsetFromEdge;
    ctx.strokeStyle = "#ddd";

    for (let i = 1; i < s.lineCount - 1; i++) {
        let start = toScreen(i) + s.gridOffsetFromEdge;

        /**
         * Skip middle lines and draw them black at the end,
         * so that they're on top of the grey ones
         */
        if (i === (s.lineCount - 1) / 2) {
            continue;
        }

        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(s.gridOffsetFromEdge, start);
        ctx.lineTo(lineLength, start);
        ctx.stroke();
        ctx.closePath();

        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(start, s.gridOffsetFromEdge);
        ctx.lineTo(start, lineLength);
        ctx.stroke();
        ctx.closePath();
    }

    ctx.strokeStyle = "#777";
    let start = ((s.lineCount - 1) / 2) * s.gridSpacing + s.gridOffsetFromEdge;

    // Horizontal center line
    ctx.beginPath();
    ctx.moveTo(s.gridOffsetFromEdge, start);
    ctx.lineTo(lineLength, start);
    ctx.stroke();
    ctx.closePath();

    // Vertical center line
    ctx.beginPath();
    ctx.moveTo(start, s.gridOffsetFromEdge);
    ctx.lineTo(start, lineLength);
    ctx.stroke();
    ctx.closePath();
}

function drawPoints() {
    ctx.fillStyle = s.pointColor;

    // Draw point 1
    ctx.beginPath();
    ctx.arc(toScreen(s.x1), toScreen(s.y1) * -1, s.pointRadius, 0, 360);
    ctx.fill();
    ctx.closePath();

    // Draw point 2
    ctx.beginPath();
    ctx.arc(toScreen(s.x2), toScreen(s.y2) * -1, s.pointRadius, 0, 360);
    ctx.fill();
    ctx.closePath();

    // Draw the midpoint
    const [ midPointX, midPointY ] = midPoint(s.x1, s.y1, s.x2, s.y2);
    ctx.beginPath();
    ctx.arc(toScreen(midPointX), toScreen(midPointY) * -1, s.pointRadius - 0.5, 0, 360);
    ctx.fillStyle = s.midPointColor;
    ctx.fill();
    ctx.closePath();
}

function midPoint(x1, y1, x2, y2) {
    return [ (x1 + x2) / 2, (y1 + y2) / 2 ];
}

function drawConnectingLine() {
    ctx.strokeStyle = "red";

    ctx.beginPath();
    ctx.moveTo(toScreen(s.x1), toScreen(s.y1) * -1);
    ctx.lineTo(toScreen(s.x2), toScreen(s.y2) * -1);
    ctx.stroke();
    ctx.closePath();

    const delta_x = s.x2 - s.x1;
    const delta_y = s.y2 - s.y1;
    const slope = delta_y / delta_x;
    const diagonal = Math.sqrt(delta_x ** 2 + delta_y ** 2);

    drawPerpendicularBisector(...midPoint(s.x1, s.y1, s.x2, s.y2), slope);
    showResults(slope, diagonal);
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
    ctx.fillStyle = s.yInterceptColor;
    ctx.beginPath();
    ctx.arc(toScreen(0), toScreen(y_intercept * -1), s.pointRadius - 0.5, 0, 360);
    ctx.fill();
    ctx.closePath();
}

function showResults(slope, diagonal) {
    lineLength.innerHTML = diagonal.toFixed(3);
    slope_el.innerHTML = slope.toFixed(3);
}

function draw() {
    drawBackground();

    ctx.save();
    ctx.translate(s.halfCanvasSize, s.halfCanvasSize);

    drawConnectingLine();
    drawPoints();

    ctx.restore();
}

draw();
