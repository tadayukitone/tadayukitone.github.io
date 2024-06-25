document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('demoCanvas');
    const ctx = canvas.getContext('2d');
    const startButton = document.getElementById('startButton');

    let isDrawing = false;
    const expertPath = [];
    const agentPath = [];
    let imitationLearning = false;
    let currentStep = 0;

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        expertPath.length = 0; // Clear previous path
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const rect = canvas.getBoundingClientRect();
        expertPath.push({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    });

    canvas.addEventListener('mousemove', (e) => {
        if (isDrawing) {
            const rect = canvas.getBoundingClientRect();
            const point = { x: e.clientX - rect.left, y: e.clientY - rect.top };
            expertPath.push(point);
            drawPath(expertPath, 'blue');
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    startButton.addEventListener('click', () => {
        imitationLearning = true;
        currentStep = 0;
        agentPath.length = 0; // Clear previous agent path
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPath(expertPath, 'blue');
        requestAnimationFrame(update);
    });

    function drawPath(path, color) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (const point of path) {
            ctx.lineTo(point.x, point.y);
        }
        ctx.stroke();
    }

    function update() {
        if (imitationLearning && currentStep < expertPath.length) {
            agentPath.push(expertPath[currentStep]);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawPath(expertPath, 'blue');
            drawPath(agentPath, 'red');
            currentStep++;
            requestAnimationFrame(update);
        } else {
            imitationLearning = false;
        }
    }
});
