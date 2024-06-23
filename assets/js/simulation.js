const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = 500;

const particles = [];
const numParticles = 200;
let magneticField = { x: canvas.width / 2, y: canvas.height / 2, strength: 10000 };

function createParticle(x, y, vx, vy, radius, color) {
    return { x, y, vx, vy, radius, color, mass: radius * radius };
}

for (let i = 0; i < numParticles; i++) {
    particles.push(createParticle(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 + 1,
        'white'
    ));
}

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    magneticField = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        strength: 10000
    };
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
    }
}

function update() {
    for (let p of particles) {
        const dx = magneticField.x - p.x;
        const dy = magneticField.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = magneticField.strength / (distance * distance);
        const ax = (force * dx) / distance;
        const ay = (force * dy) / distance;

        p.vx += ax / p.mass;
        p.vy += ay / p.mass;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x > canvas.width || p.x < 0) p.vx = -p.vx;
        if (p.y > canvas.height || p.y < 0) p.vy = -p.vy;
    }
}

function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
}

animate();
