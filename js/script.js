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
    const interactiveElements = document.querySelectorAll('.enter-text, .username, .description, .avatar, .controls i, .play-pause, .progress-area, .volume-slider');
    
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

// Player Audio
document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.querySelector('.audio-player');
    const audio = document.querySelector('#main-audio');
    const playPauseBtn = document.querySelector('.play-pause');
    const playPauseIcon = playPauseBtn.querySelector('i');
    const progressArea = document.querySelector('.progress-area');
    const progressBar = document.querySelector('.progress-bar');
    const currentTimeEl = document.querySelector('.current-time');
    const maxDurationEl = document.querySelector('.max-duration');
    const volumeIcon = document.querySelector('#volume-icon');
    const volumeSlider = document.querySelector('.volume-slider');
    const volumeBar = document.querySelector('.volume-bar');
    const prevBtn = document.querySelector('#prev');
    const nextBtn = document.querySelector('#next');
    const repeatBtn = document.querySelector('#repeat-plist');
    const moreBtn = document.querySelector('#more-music');
    
    // Stato iniziale del player
    let musicIndex = 1;
    let isPlaying = false;
    let isShuffling = false;
    let repeatMode = 'off'; // 'off', 'one', 'all'
    
    // Lista delle canzoni (in questo caso abbiamo solo una canzone)
    const musicList = [
        {
            name: "Song",
            artist: "",
            src: "assets/song.flac"
        }
    ];
    
    // Imposta il volume iniziale al 80%
    audio.volume = 0.8;
    volumeBar.style.width = `${audio.volume * 100}%`;
    
    // Inizializza il player con la prima canzone
    function loadMusic(index) {
        const song = musicList[index];
        audio.src = song.src;
        document.querySelector('.song-title').textContent = song.name;
        document.querySelector('.song-artist').textContent = song.artist;
    }
    
    // Funzione play
    function playMusic() {
        isPlaying = true;
        playPauseIcon.classList.remove('fa-play');
        playPauseIcon.classList.add('fa-pause');
        playPauseBtn.classList.add('play-active');
        audio.play();
    }
    
    // Funzione pause
    function pauseMusic() {
        isPlaying = false;
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
        playPauseBtn.classList.remove('play-active');
        audio.pause();
    }
    
    // Evento play/pause
    playPauseBtn.addEventListener('click', () => {
        isPlaying ? pauseMusic() : playMusic();
    });
    
    // Previene lo stato di pausa iniziale al click di playPauseBtn dopo il caricamento
    audio.addEventListener('canplay', () => {
        maxDurationEl.textContent = formatTime(audio.duration);
    });
    
    // Aggiorna la progress bar
    audio.addEventListener('timeupdate', (e) => {
        const currentTime = e.target.currentTime;
        const duration = e.target.duration || 0;
        
        let progressWidth = (currentTime / duration) * 100;
        progressBar.style.width = `${progressWidth}%`;
        
        currentTimeEl.textContent = formatTime(currentTime);
    });
    
    // Funzione per formattare il tempo in MM:SS
    function formatTime(time) {
        if (isNaN(time) || time === Infinity) return "0:00";
        
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    
    // Click sulla progress bar per cambiare posizione
    progressArea.addEventListener('click', (e) => {
        const progressWidthval = progressArea.clientWidth;
        const clickedOffsetX = e.offsetX;
        const songDuration = audio.duration;
        
        audio.currentTime = (clickedOffsetX / progressWidthval) * songDuration;
        playMusic();
    });
    
    // Aggiorna la progress bar mentre si fa hover
    progressArea.addEventListener('mousemove', (e) => {
        if (e.buttons === 1) { // Click sinistro premuto
            const progressWidthval = progressArea.clientWidth;
            const clickedOffsetX = e.offsetX;
            const songDuration = audio.duration;
            
            audio.currentTime = (clickedOffsetX / progressWidthval) * songDuration;
            playMusic();
        }
    });
    
    // Quando la canzone finisce
    audio.addEventListener('ended', () => {
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
        playPauseBtn.classList.remove('play-active');
        
        if (repeatMode === 'one') {
            audio.currentTime = 0;
            playMusic();
        } else if (repeatMode === 'all') {
            nextMusic();
        } else {
            isPlaying = false;
        }
    });
    
    // Click sul volume icon per mutare/smutare
    volumeIcon.addEventListener('click', () => {
        if (audio.muted) {
            audio.muted = false;
            volumeIcon.classList.remove('fa-volume-off');
            volumeIcon.classList.add('fa-volume-up');
            volumeBar.style.width = `${audio.volume * 100}%`;
        } else {
            audio.muted = true;
            volumeIcon.classList.remove('fa-volume-up');
            volumeIcon.classList.add('fa-volume-off');
            volumeBar.style.width = '0%';
        }
    });
    
    // Aggiorna il volume
    volumeSlider.addEventListener('click', (e) => {
        const volumeWidthval = volumeSlider.clientWidth;
        const clickedOffsetX = e.offsetX;
        const newVolume = clickedOffsetX / volumeWidthval;
        
        audio.volume = newVolume;
        volumeBar.style.width = `${newVolume * 100}%`;
        
        if (newVolume === 0) {
            volumeIcon.classList.remove('fa-volume-up');
            volumeIcon.classList.add('fa-volume-off');
            audio.muted = true;
        } else {
            volumeIcon.classList.remove('fa-volume-off');
            volumeIcon.classList.add('fa-volume-up');
            audio.muted = false;
        }
    });
    
    // Aggiorna il volume mentre si fa hover
    volumeSlider.addEventListener('mousemove', (e) => {
        if (e.buttons === 1) { // Click sinistro premuto
            const volumeWidthval = volumeSlider.clientWidth;
            const clickedOffsetX = e.offsetX;
            const newVolume = clickedOffsetX / volumeWidthval;
            
            audio.volume = newVolume;
            volumeBar.style.width = `${newVolume * 100}%`;
            
            if (newVolume === 0) {
                volumeIcon.classList.remove('fa-volume-up');
                volumeIcon.classList.add('fa-volume-off');
                audio.muted = true;
            } else {
                volumeIcon.classList.remove('fa-volume-off');
                volumeIcon.classList.add('fa-volume-up');
                audio.muted = false;
            }
        }
    });
    
    // Cambio modalità di ripetizione
    repeatBtn.addEventListener('click', () => {
        if (repeatMode === 'off') {
            repeatMode = 'one';
            repeatBtn.classList.add('active');
            repeatBtn.setAttribute('title', 'Ripeti una');
        } else if (repeatMode === 'one') {
            repeatMode = 'all';
            repeatBtn.setAttribute('title', 'Ripeti tutte');
        } else {
            repeatMode = 'off';
            repeatBtn.classList.remove('active');
            repeatBtn.setAttribute('title', 'Ripetizione disattivata');
        }
    });
    
    // Bottoni next e prev (in questo caso non fanno nulla poiché abbiamo solo una canzone)
    prevBtn.addEventListener('click', () => {
        // Se avessimo più canzoni, qui implementeremmo la logica per passare alla precedente
    });
    
    nextBtn.addEventListener('click', () => {
        // Se avessimo più canzoni, qui implementeremmo la logica per passare alla successiva
    });
    
    // Carica la canzone al caricamento della pagina
    loadMusic(0);
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