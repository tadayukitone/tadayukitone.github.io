document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('demoCanvas');
    const ctx = canvas.getContext('2d');
    const startButton = document.getElementById('startButton');

    const expertPath = [
        { x: 50, y: 50 }, { x: 100, y: 100 }, { x: 150, y: 50 }, { x: 200, y: 100 },
        { x: 250, y: 50 }, { x: 300, y: 100 }, { x: 350, y: 50 }, { x: 400, y: 100 }
    ];
    const agentPath = [];

    let imitationLearning = false;
    let currentStep = 0;

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
        }
    }
});
