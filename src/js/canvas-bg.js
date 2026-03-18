const canvas = document.getElementById('bio-canvas');
const ctx = canvas.getContext('2d');

let particlesArray;

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

const mouse = {
    x: null,
    y: null,
    radius: 150
};

// Listen for mouse movement
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', function() {
    mouse.x = null;
    mouse.y = null;
});

function calculateDistance(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
}

class Particle {
    constructor(x, y, size, color) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        
        // Gentle orbiting movement
        this.angle = Math.random() * Math.PI * 2;
        this.speed = (Math.random() * 0.01) + 0.002;
        this.orbitRadius = (Math.random() * 20) + 5;
        this.density = (Math.random() * 30) + 1;
    }

    draw() {
        ctx.beginPath();
        // Bioluminescent glow
        ctx.shadowBlur = this.size * 4;
        ctx.shadowColor = this.color;
        
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Reset shadow for performance down the line
        ctx.shadowBlur = 0;
    }

    update() {
        this.angle += this.speed;
        let targetX = this.baseX + Math.cos(this.angle) * this.orbitRadius;
        let targetY = this.baseY + Math.sin(this.angle) * this.orbitRadius;

        if (mouse.x != null && mouse.y != null) {
            let heroRect = canvas.parentElement.getBoundingClientRect();
            let adjMouseY = mouse.y - heroRect.top;
            let adjMouseX = mouse.x - heroRect.left;

            const distance = calculateDistance(adjMouseX, adjMouseY, this.x, this.y);
            if (distance < mouse.radius) {
                const forceDirectionX = (adjMouseX - this.x) / distance;
                const forceDirectionY = (adjMouseY - this.y) / distance;
                const force = (mouse.radius - distance) / mouse.radius;
                const directionX = forceDirectionX * force * this.density * 1.5;
                const directionY = forceDirectionY * force * this.density * 1.5;

                targetX -= directionX;
                targetY -= directionY;
            }
        }
        
        // Smoothly return or move to target
        this.x += (targetX - this.x) * 0.05;
        this.y += (targetY - this.y) * 0.05;

        this.draw();
    }
}

function getColor(x, y, w, h) {
    const relX = x / w;
    const relY = y / h;

    // Far left and upper-right: sky blue
    if (relX < 0.15 || (relX > 0.8 && relY < 0.4)) {
        return '#87CEEB'; // Sky blue
    }
    
    // Left and upper canopy: teals, sea-greens, light green-blues
    if (relX >= 0.15 && relX < 0.4) {
        const greens = ['#20B2AA', '#008B8B', '#48D1CC', '#3CB371'];
        return greens[Math.floor((x * 13 + y * 7)) % greens.length];
    }
    
    // Far-right edge: warm orange
    if (relX > 0.8) {
        return '#FFA500'; // Orange
    }
    
    // Base trunk & Inner Canopy: vibrant yellow-gold
    if (relX >= 0.4 && relX <= 0.8) {
        if (relY > 0.6) {
            return '#FFD700'; // Solid gold trunk
        } else {
            return '#FFDF00'; // Inner canopy yellow
        }
    }
    
    return '#FFD700';
}

function init() {
    particlesArray = [];
    const parentNode = canvas.parentElement;
    if(parentNode) {
        w = canvas.width = parentNode.offsetWidth;
        h = canvas.height = parentNode.offsetHeight;
    }

    // High density for filigree feel
    const numParticles = Math.min((w * h) / 2500, 600); 
    
    // 1. Ambient particles (everywhere to ensure no empty spaces)
    let ambientParticles = Math.floor(numParticles * 0.2);
    for(let i=0; i<ambientParticles; i++) {
        let x = Math.random() * w;
        let y = Math.random() * h;
        let size = Math.random() * 1.5 + 0.5;
        particlesArray.push(new Particle(x, y, size, getColor(x, y, w, h)));
    }
    
    // 2. Roots (spreading to bottom corners)
    let rootParticles = Math.floor(numParticles * 0.15);
    for(let i=0; i<rootParticles; i++) {
        let isLeft = Math.random() > 0.5;
        let x = isLeft ? (Math.random() * (w * 0.35)) : (w - Math.random() * (w * 0.35));
        let y = h - (Math.random() * (h * 0.4)); // bottom 40%
        let size = Math.random() * 2 + 1;
        particlesArray.push(new Particle(x, y, size, getColor(x, y, w, h)));
    }
    
    // 3. Central Trunk (converging stream)
    let trunkParticles = Math.floor(numParticles * 0.15);
    for(let i=0; i<trunkParticles; i++) {
        let x = w / 2 + ((Math.random() - 0.5) * (w * 0.2));
        let y = h - (Math.random() * (h * 0.5)); // bottom 50%
        let size = Math.random() * 3 + 2; // slightly larger
        particlesArray.push(new Particle(x, y, size, getColor(x, y, w, h)));
    }
    
    // 4. Canopy branches (wide spread)
    let canopyParticles = numParticles - trunkParticles - ambientParticles - rootParticles;
    for(let i=0; i<canopyParticles; i++) {
        // Use gaussian to cluster around center top
        let u1 = Math.random();
        let u2 = Math.random();
        let z0 = Math.sqrt(-2.0 * Math.log(u1 + 0.001)) * Math.cos(2.0 * Math.PI * u2);
        
        // Spread horizontally more to cover full width
        let x = (w / 2) + (z0 * (w * 0.4)); 
        let y = (h * 0.3) + ((Math.random() - 0.5) * (h * 0.6));
        
        x = Math.max(10, Math.min(w - 10, x));
        y = Math.max(10, Math.min(h - 10, y));

        let size = Math.random() * 1.5 + 0.5; // smaller
        particlesArray.push(new Particle(x, y, size, getColor(x, y, w, h)));
    }
}

function connect() {
    const maxDistance = 70; // Short connection distance for dense filigree

    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
            const dx = particlesArray[a].x - particlesArray[b].x;
            const dy = particlesArray[a].y - particlesArray[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < maxDistance) {
                const opacity = 1 - (distance / maxDistance);
                // Inherit color from node
                ctx.strokeStyle = particlesArray[a].color; 
                ctx.globalAlpha = opacity * 0.5;
                ctx.lineWidth = 0.5; // extremely fine lines

                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
    ctx.globalAlpha = 1.0;
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

window.addEventListener('resize', () => {
    const parentNode = canvas.parentElement;
    if(parentNode) {
        w = canvas.width = parentNode.offsetWidth;
        h = canvas.height = parentNode.offsetHeight;
    } else {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    init();
});

window.addEventListener('load', () => {
    init();
    animate();
});
