const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
ctx.fillStyle = 'white';

class Ball {
    constructor(effects) {
        this.radius = Math.random() * (150 - 10) + 50; // Random size between 50 and 100
        this.x = Math.random() * (canvas.width - 2 * this.radius) + this.radius;
        this.y = Math.random() * (canvas.height - 2 * this.radius) + this.radius;
        this.speedx = 0.3;
        this.speedy = 0.3;
        
    }

    update() {
        this.x += this.speedx;
        this.y += this.speedy;
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.speedx = -this.speedx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.speedy = -this.speedy;
        }
        this.draw(ctx); // Pass the context parameter here
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }

}

class MetaballsEffect {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.metaballArray = [];
    }
    init(numberOfBalls) {
        for (let i = 0; i < numberOfBalls; i++) {
            this.metaballArray.push(new Ball(this));
        }
    }
    update() {
        this.metaballArray.forEach(metaball => metaball.update());
    }

    draw(context) {
        this.metaballArray.forEach(metaball => metaball.draw(context));
    }
}

const effect = new MetaballsEffect(canvas.width, canvas.height);
effect.init(6);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.update();
    effect.draw(ctx); // Pass the context parameter here
    requestAnimationFrame(animate);
}
animate();

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    effect.metaballArray.forEach(metaball => {
        const dx = mouseX - metaball.x;
        const dy = mouseY - metaball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < metaball.radius) {
            metaball.speedx = -metaball.speedx;
            metaball.speedy = -metaball.speedy;
        }
    });
});

