const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
const numStars = 100;
const G = 0.1; // 重力定数
const splitProbability = 0.05; // 分裂の確率
const maxStarSize = 10; // 恒星になるサイズの閾値

function createStar(x, y, size, mass, vx, vy, color = 'white', isFixed = false) {
    return { x, y, size, mass, vx, vy, color, isFixed };
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
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        if (star.size >= maxStarSize) {
            star.vx = 0;
            star.vy = 0;
            star.color = 'yellow';
            star.isFixed = true;
        } else {
            for (let j = i + 1; j < stars.length; j++) {
                let otherStar = stars[j];
                const dx = otherStar.x - star.x;
                const dy = otherStar.y - star.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < star.size + otherStar.size) {
                    if (Math.random() < splitProbability) {
                        // 分裂: 星を小さくし、新しい星を追加
                        const splitSize = star.size / 2;
                        star.size = splitSize;
                        star.mass = splitSize * 0.5;
                        stars.push(createStar(star.x, star.y, splitSize, splitSize * 0.5, -star.vx, -star.vy));
                    } else {
                        // 合体: 大きさと質量を合成
                        const newSize = Math.sqrt(star.size * star.size + otherStar.size * otherStar.size);
                        const newMass = star.mass + otherStar.mass;
                        const newVx = (star.vx * star.mass + otherStar.vx * otherStar.mass) / newMass;
                        const newVy = (star.vy * star.mass + otherStar.vy * otherStar.mass) / newMass;

                        star.size = newSize;
                        star.mass = newMass;
                        star.vx = newVx;
                        star.vy = newVy;

                        stars.splice(j, 1);
                        j--;
                    }
                } else {
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
        if (!star.isFixed) {
            star.x += star.vx;
            star.y += star.vy;

            if (star.x > canvas.width) star.x = 0;
            if (star.y > canvas.height) star.y = 0;
            if (star.x < 0) star.x = canvas.width;
            if (star.y < 0) star.y = canvas.height;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();
    }
}

function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
}

animate();
