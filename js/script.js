// Gestione dell'overlay di entrata
document.addEventListener('DOMContentLoaded', () => {
    const enterOverlay = document.querySelector('.enter-overlay');
    const mainContent = document.querySelector('.main-content');
    const mainSnowflakes = document.querySelector('.main-snowflakes');

    enterOverlay.addEventListener('click', () => {
        enterOverlay.style.opacity = '0';
        setTimeout(() => {
            enterOverlay.style.display = 'none';
            mainContent.style.display = 'block';
            
            // Mostra i fiocchi di neve nel contenuto principale
            if (mainSnowflakes) {
                mainSnowflakes.style.display = 'block';
            }
            
            // Fade in dell'elemento main-content
            setTimeout(() => {
                mainContent.style.opacity = '1';
            }, 100);
        }, 500);
    });

    // Aggiunta dello stile per la transizione
    const style = document.createElement('style');
    style.textContent = `
        .enter-overlay {
            transition: opacity 0.5s ease;
        }
        
        .main-content {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
    `;
    document.head.appendChild(style);
});

// Custom cursor
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Delay follower cursor for effect
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });
    
    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('.enter-text, .username, .description, .avatar');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursorFollower.classList.add('active');
            
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorFollower.classList.remove('active');
            
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null) {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        }
    });
    
    document.addEventListener('mouseover', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });
});

// Animazione fiocchi di neve
document.addEventListener('DOMContentLoaded', () => {
    // Seleziona tutti i fiocchi di neve, sia nell'overlay che nel contenuto principale
    const snowflakes = document.querySelectorAll('.snowflake');
    
    // Inizializza i fiocchi di neve
    function initializeSnowflakes() {
        snowflakes.forEach((snowflake, index) => {
            // Posizione iniziale casuale
            const randomLeft = Math.random() * 100;
            snowflake.style.left = `${randomLeft}%`;
            
            // Oscillazione orizzontale
            const duration = 10 + Math.random() * 10;
            const amplitude = 10 + Math.random() * 20;
            
            const keyframes = `
            @keyframes snowflake-left-${index} {
                0% { transform: translateX(0) translateY(-100px); }
                50% { transform: translateX(${amplitude}px) translateY(50vh); }
                100% { transform: translateX(0) translateY(100vh); }
            }`;
            
            const style = document.createElement('style');
            style.textContent = keyframes;
            document.head.appendChild(style);
            
            snowflake.style.animation = `snowfall ${duration}s linear infinite, snowflake-left-${index} ${duration}s ease-in-out infinite`;
        });
    }
    
    // Inizializza i fiocchi di neve
    initializeSnowflakes();
});

// Funzione di fallback per GSAP (se non disponibile)
function gsapCompatible(callback) {
    // Verifica se GSAP è disponibile
    if (typeof gsap !== 'undefined') {
        // Utilizzo GSAP per animazioni avanzate
        return function() {
            // Implementazione con GSAP
        };
    } else {
        // Fallback per CSS standard
        return callback;
    }
} 