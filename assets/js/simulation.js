const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = 500;

const numParticles = 300;
const particles = [];
const magneticField = { x: canvas.width / 2, y: canvas.height / 2, strength: 10000 };

function createParticle(x, y, vx, vy, radius) {
    return { x, y, vx, vy, radius, mass: radius * radius };
}

for (let i = 0; i < numParticles; i++) {
    const radius = Math.random() * 2 + 1;
    particles.push(createParticle(
        Math.random() * canvas.width,
        canvas.height - radius,  // Start particles at the bottom
        0,
        0,
        radius
    ));
}

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    magneticField.x = event.clientX - rect.left;
    magneticField.y = event.clientY - rect.top;
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    }
}

function update() {
    for (const p of particles) {
        const dx = magneticField.x - p.x;
        const dy = magneticField.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > p.radius) {
            const force = magneticField.strength / (distance * distance);
            const ax = (force * dx) / distance;
            const ay = (force * dy) / distance - 0.1;  // Adding gravity effect

            p.vx += ax / p.mass;
            p.vy += ay / p.mass;
        }

        p.vx *= 0.95;  // Damping to stabilize
        p.vy *= 0.95;  // Damping to stabilize

        p.x += p.vx;
        p.y += p.vy;

        if (p.x > canvas.width) p.x = canvas.width;
        if (p.x < 0) p.x = 0;
        if (p.y > canvas.height) p.y = canvas.height;
        if (p.y < 0) p.y = 0;
    }
}

function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
}

animate();
