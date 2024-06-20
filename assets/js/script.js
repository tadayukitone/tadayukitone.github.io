const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 100;

function createStar(x, y, size, velocity) {
    return {
        x: x,
        y: y,
        size: size,
        velocity: velocity
    };
}

for (let i = 0; i < numStars; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 2 + 1;
    const velocity = Math.random() * 0.5;
    stars.push(createStar(x, y, size, velocity));
}

function update() {
    for (let star of stars) {
        star.x += star.velocity;
        star.y += star.velocity;

        if (star.x > canvas.width) star.x = 0;
        if (star.y > canvas.height) star.y = 0;

        for (let otherStar of stars) {
            if (star !== otherStar) {
                const dx = otherStar.x - star.x;
                const dy = otherStar.y - star.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    star.velocity += 0.01;
                    otherStar.velocity -= 0.01;
                }
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    }
}

function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
}

animate();
