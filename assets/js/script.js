const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 100;
const G = 0.1; // 重力定数

function createStar(x, y, size, mass, vx, vy) {
    return { x, y, size, mass, vx, vy };
}

for (let i = 0; i < numStars; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 3 + 1;
    const mass = size * 0.5;
    const vx = Math.random() * 2 - 1;
    const vy = Math.random() * 2 - 1;
    stars.push(createStar(x, y, size, mass, vx, vy));
}

function update() {
    for (let star of stars) {
        for (let otherStar of stars) {
            if (star !== otherStar) {
                const dx = otherStar.x - star.x;
                const dy = otherStar.y - star.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < star.size + otherStar.size) {
                    // 衝突: 大きさを合成し、位置を更新
                    star.size += otherStar.size * 0.1;
                    otherStar.size = 0;
                } else {
                    // 重力による引力
                    const force = (G * star.mass * otherStar.mass) / (distance * distance);
                    const ax = (force * dx) / distance;
                    const ay = (force * dy) / distance;
                    star.vx += ax / star.mass;
                    star.vy += ay / star.mass;
                }
            }
        }
    }

    for (let star of stars) {
        star.x += star.vx;
        star.y += star.vy;

        // 画面外に出たら反対側に再配置
        if (star.x > canvas.width) star.x = 0;
        if (star.y > canvas.height) star.y = 0;
        if (star.x < 0) star.x = canvas.width;
        if (star.y < 0) star.y = canvas.height;
    }

    stars = stars.filter(star => star.size > 0); // サイズが0の星を除外
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
