export function bindEvents(drawFn, s) {
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
    canvas.width = s.canvasSize;
    canvas.height = s.canvasSize;
    canvas.style.width = s.canvasSize + "px";
    canvas.style.height = s.canvasSize + "px";

    // Init input values
    x1_input.value = s.x1;
    y1_input.value = s.y1;
    x2_input.value = s.x2;
    y2_input.value = s.y2;

    // Event listeners
    x1_input.addEventListener("input", (e) => {
        s.x1 = parseInt(e.target.value);
        drawFn();
    });

    y1_input.addEventListener("input", (e) => {
        s.y1 = parseInt(e.target.value);
        drawFn();
    });

    x2_input.addEventListener("input", (e) => {
        s.x2 = parseInt(e.target.value);
        drawFn();
    });

    y2_input.addEventListener("input", (e) => {
        s.y2 = parseInt(e.target.value);
        drawFn();
    });

    return { ctx, lineLength, slope_el };
}