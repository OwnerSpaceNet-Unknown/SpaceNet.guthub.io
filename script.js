const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = '0123456789ABCDEFサイバースペース';
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) drops[x] = 1;

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#ff0000';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(draw, 50);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const bgSound = document.getElementById('bg-sound');
bgSound.volume = 0.1;
bgSound.play();

document.querySelectorAll('.project-card, button').forEach(el => {
    el.addEventListener('mouseover', () => {
        document.getElementById('click-sound').play();
    });
});

const sections = document.querySelectorAll('.about, .projects, .manifest, .riddle');
sections.forEach((section, index) => {
    section.style.opacity = '0';
    setTimeout(() => {
        section.style.transition = 'opacity 1s ease';
        section.style.opacity = '1';
    }, index * 500);
});

const cursor = document.querySelector('.custom-cursor');
const trailContainer = document.getElementById('cursor-trail-container');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;

    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        
        const size = Math.random() * 8 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        const offsetX = (Math.random() - 0.5) * 15;
        const offsetY = (Math.random() - 0.5) * 15;
        particle.style.left = `${e.pageX + offsetX}px`;
        particle.style.top = `${e.pageY + offsetY}px`;
        
        trailContainer.appendChild(particle);

        setTimeout(() => {
            particle.style.opacity = '0';
            setTimeout(() => {
                particle.remove();
            }, 800);
        }, 50);
    }
});