/**
 * CINEMATIC ROMANTIC EXPERIENCE
 * Phase 1: Foundation, Environmental Effects, and Initialization
 */

// ==========================================
// CONFIGURATION (ONLY EDIT THIS SECTION)
// ==========================================
const CONFIG = {
    // Media & Intro settings
    music: "music/song.mp3",
    welcomeTitle: "For Fay",
    welcomeSubtitle: "A Journey of Our Moments",
    
    // Final Letter Content
    finalLetter: `My dearest Fay,\n\nEvery moment with you is a memory I treasure. I cannot wait to build our future together.\n\nForever yours.`,
    
    // Memory Gallery Configuration
    memories: [
        {
            title: "Our First Date",
            message: "The moment everything changed.",
            image: "images/photo1.jpg",
            story: "I remember being so nervous, but the moment I saw your smile, everything felt right."
        }
    ]
};

// ==========================================
// APPLICATION ARCHITECTURE
// ==========================================
class CinematicRomance {
    constructor() {
        this.musicPlaying = false;
        this.audioElement = document.getElementById('bg-music');
        
        // Initialize systems
        this.init();
    }

    init() {
        this.applyConfig();
        this.initEffects();
        this.initEvents();
        
        // Simulate loading time for cinematic effect
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 3200);
    }

    /**
     * Injects configuration variables into the DOM
     */
    applyConfig() {
        document.getElementById('welcome-title').textContent = CONFIG.welcomeTitle;
        document.getElementById('welcome-subtitle').textContent = CONFIG.welcomeSubtitle;
        
        if (this.audioElement && CONFIG.music) {
            this.audioElement.src = CONFIG.music;
        }
    }

    /**
     * Binds user interaction events
     */
    initEvents() {
        // Global Audio Toggle
        const musicBtn = document.getElementById('music-toggle');
        if (musicBtn) {
            musicBtn.addEventListener('click', () => this.toggleMusic());
        }

        // Welcome Screen Action
        const startBtn = document.getElementById('start-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.startJourney();
            });
        }
    }

    // ==========================================
    // ENVIRONMENTAL EFFECTS
    // ==========================================
    
    initEffects() {
        this.createParticles(35);
        this.createHearts(12);
    }

    createParticles(count) {
        const container = document.getElementById('particles-container');
        if (!container) return;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Randomize spatial and temporal values
            const size = Math.random() * 4 + 1; // 1px to 5px
            const left = Math.random() * 100; // 0vw to 100vw
            const duration = Math.random() * 12 + 10; // 10s to 22s
            const delay = Math.random() * 10; // 0s to 10s

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}vw`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;

            container.appendChild(particle);
        }
    }

    createHearts(count) {
        const container = document.getElementById('hearts-container');
        if (!container) return;
        
        const heartSymbol = '♥';

        for (let i = 0; i < count; i++) {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerHTML = heartSymbol;
            
            // Randomize size, placement, and speed
            const size = Math.random() * 1.2 + 0.6; // 0.6rem to 1.8rem
            const left = Math.random() * 100;
            const duration = Math.random() * 15 + 18; // 18s to 33s
            const delay = Math.random() * 12;

            heart.style.fontSize = `${size}rem`;
            heart.style.left = `${left}vw`;
            heart.style.animationDuration = `${duration}s`;
            heart.style.animationDelay = `${delay}s`;

            container.appendChild(heart);
        }
    }

    // ==========================================
    // STATE TRANSITIONS
    // ==========================================

    hideLoadingScreen() {
        const loader = document.getElementById('loading-screen');
        const appContainer = document.getElementById('app-container');
        
        if (loader) {
            // Fade out
            loader.classList.remove('active');
            
            // Wait for CSS transition, then clear from layout
            setTimeout(() => {
                loader.classList.add('hidden');
                if (appContainer) {
                    appContainer.classList.remove('hidden');
                }
            }, 1200); 
        }
    }

    startJourney() {
        // Automatically start music on first major interaction if not playing
        if (!this.musicPlaying) {
            this.toggleMusic();
        }
        
        // Phase 2 Entry Point
        console.log("Welcome screen complete. Ready for Phase 2.");
    }

    // ==========================================
    // MEDIA CONTROLS
    // ==========================================

    toggleMusic() {
        const icon = document.querySelector('.music-icon');
        if (!this.audioElement) return;

        if (this.musicPlaying) {
            this.audioElement.pause();
            icon.classList.add('sound-off');
        } else {
            // Promise handling for browser autoplay policies
            this.audioElement.play().catch(e => {
                console.warn("Autoplay policy prevented playback. User interaction required.");
            });
            icon.classList.remove('sound-off');
        }
        
        this.musicPlaying = !this.musicPlaying;
    }
}

// Bootstrap Application
document.addEventListener('DOMContentLoaded', () => {
    window.romanceApp = new CinematicRomance();
});