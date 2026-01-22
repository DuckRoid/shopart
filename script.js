// Emoji car background: spawn floating car emojis
(function () {
    console.log('Emoji script iniciado');
    
    function rand(min, max) { return Math.random() * (max - min) + min; }

    function spawnEmojiCars(options = {}) {
        console.log('spawnEmojiCars chamado');
        
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            console.log('Prefere redução de movimento');
            return;
        }
        if (document.querySelector('.emoji-bg')) {
            console.log('emoji-bg já existe');
            return;
        }

        const emojis = ['🚗','🚕','🚙','🏎️','🚓','🚑','🚚','🛻','🚛'];
        const count = options.count || (window.innerWidth < 480 ? 12 : 28);
        console.log('Criando', count, 'emojis');

        const container = document.createElement('div');
        container.className = 'emoji-bg';
        document.body.appendChild(container);
        console.log('Container criado e adicionado ao body');

        for (let i = 0; i < count; i++) {
            const span = document.createElement('span');
            span.className = 'emoji-car';
            span.textContent = emojis[Math.floor(rand(0, emojis.length))];

            const leftPct = rand(2, 96);
            const topPct = rand(6, 92);

            span.style.left = `${leftPct}%`;
            span.style.top = `${topPct}%`;

            span.style.setProperty('--float', `${Math.floor(rand(6, 18))}px`);
            span.style.setProperty('--rot', `${Math.floor(rand(-10, 10))}deg`);

            const dur = rand(2.8, 6.5).toFixed(2) + 's';
            const delay = rand(0, 1.6).toFixed(2) + 's';
            span.style.animationDuration = dur;
            span.style.animationDelay = delay;

            const size = window.innerWidth < 480 ? rand(14, 26) : rand(16, 34);
            span.style.fontSize = `${Math.floor(size)}px`;

            span.style.opacity = '0.85';

            container.appendChild(span);
        }
        
        console.log('Emojis criados com sucesso');
    }

    // Chama a função assim que possível
    spawnEmojiCars();
    
    if (document.readyState !== 'loading') {
        spawnEmojiCars();
    } else {
        window.addEventListener('DOMContentLoaded', () => {
            console.log('DOMContentLoaded disparado');
            spawnEmojiCars();
        });
    }
})();

// Animação do contador de anos
function animateCounter() {
    const yearElement = document.getElementById('year');
    const counterBox = document.querySelector('.counter-box');
    const targetYear = 2027;
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 3;
    
    let currentCount = startYear;
    const duration = 3000;
    const steps = 60;
    const increment = (targetYear - startYear) / steps;
    const stepDuration = duration / steps;
    
    function updateYear() {
        if (currentCount < targetYear) {
            currentCount += increment;
            yearElement.textContent = Math.floor(currentCount);
            
            yearElement.style.animation = 'none';
            setTimeout(() => {
                yearElement.style.animation = 'pulse 0.6s ease-in-out';
            }, 10);
            
            setTimeout(updateYear, stepDuration);
        } else {
            yearElement.textContent = targetYear;
            // Dispara confetis e pop effect quando chega a 2027
            counterBox.classList.add('celebration');
            createConfetti();
        }
    }
    
    updateYear();
}

// Função para criar confetis
function createConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);
    
    const colors = ['#ff0000', '#ffffff', '#dc143c', '#f5f5f5'];
    const count = 100;
    
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.backgroundColor = color;
        
        const left = Math.random() * 100;
        const delay = Math.random() * 0.5;
        const duration = 2 + Math.random() * 1;
        
        confetti.style.left = left + '%';
        confetti.style.top = '-10px';
        
        const isSwing = Math.random() > 0.5;
        const animationName = isSwing ? 'confetti-swing' : 'confetti-fall';
        
        confetti.style.animation = `${animationName} ${duration}s linear ${delay}s forwards`;
        
        // Tamanho aleatório
        const size = 5 + Math.random() * 10;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        
        container.appendChild(confetti);
    }
    
    // Remove o container após a animação terminar
    setTimeout(() => {
        container.remove();
    }, 4000);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(animateCounter, 500);
    
    // Newsletter form
    const form = document.getElementById('newsletterForm');
    const noteElement = document.getElementById('newsletterNote');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = form.querySelector('input[type="email"]').value;
        const button = form.querySelector('button');
        const originalText = button.textContent;
        
        // Feedback visual
        button.disabled = true;
        button.textContent = 'A enviar...';
        noteElement.textContent = '';
        
        // Simula envio (em produção, seria um fetch real)
        setTimeout(() => {
            button.textContent = '✓ Pronto!';
            noteElement.textContent = 'Muito obrigado! Vamos notificar-te em breve.';
            noteElement.style.color = 'rgba(144, 238, 144, 0.9)';
            
            form.reset();
            
            setTimeout(() => {
                button.disabled = false;
                button.textContent = originalText;
                noteElement.textContent = '';
            }, 3000);
        }, 1500);
    });
});
