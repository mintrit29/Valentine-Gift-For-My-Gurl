
// === 10. HEART POPPING GAME ===
const popOverlay = document.getElementById("popOverlay");
const popGrid = document.getElementById("popGrid");
const popStressBtn = document.getElementById("popStressBtn");
const popExit = document.getElementById("popExit");
const popRefill = document.getElementById("popRefill");

// Sound files
const popSources = [
    "audio/Pop (1).mp3", 
    "audio/Pop (2).mp3", 
    "audio/Pop (3).mp3"
];

// Create pools for each sound to allow polyphony
const audioPools = {};
popSources.forEach(src => {
    audioPools[src] = [];
    for(let i=0; i<3; i++) {
        const audio = new Audio(src);
        audio.volume = 0.6; // Slightly lower volume to not be too loud
        audioPools[src].push(audio);
    }
});

function playPop() {
    // Pick random sound file
    const randomSrc = popSources[Math.floor(Math.random() * popSources.length)];
    const pool = audioPools[randomSrc];
    
    // Find a free player or force use one
    let soundToPlay = pool.find(a => a.paused);
    if (!soundToPlay) {
        soundToPlay = pool[0];
        soundToPlay.currentTime = 0;
    }
    
    soundToPlay.play().catch(e => console.log("Audio play failed", e));
}

function createBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("pop-item");
    bubble.innerHTML = ["❤️", "🎈", "🌸", "✨", "🎀"][Math.floor(Math.random() * 5)];
    
    bubble.addEventListener("click", function(e) {
        // Play Sound
        playPop();
        
        // Visual Explosion
        createParticles(e.clientX, e.clientY);
        
        // Hide Bubble but keep space
        this.classList.add("popped");
        
        // Haptic feedback (mobile)
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    });
    
    return bubble;
}

function fillGrid() {
    if(!popGrid) return;
    
    // Check if grid is initialized
    if(popGrid.children.length === 0) {
        for(let i=0; i<40; i++) {
            popGrid.appendChild(createBubble());
        }
    } else {
        // Just restore popped bubbles
        const popped = popGrid.querySelectorAll(".popped");
        popped.forEach(bubble => {
            bubble.classList.remove("popped");
            bubble.style.transform = ""; // Reset scale transform
             // Randomize content again for fun
             bubble.innerHTML = ["❤️", "🎈", "🌸", "✨", "🎀"][Math.floor(Math.random() * 5)];
        });
    }
}

function createParticles(x, y) {
    // Reduced particles for performance
    for (let i = 0; i < 4; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        document.body.appendChild(particle);

        const destinationX = (Math.random() - 0.5) * 60 + 'px'; // Reduced spread
        const destinationY = (Math.random() - 0.5) * 60 + 'px';

        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        // Pass dynamic values to CSS
        particle.style.setProperty('--tx', destinationX);
        particle.style.setProperty('--ty', destinationY);
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;

        setTimeout(() => particle.remove(), 600);
    }
}

// Event Listeners
if(popStressBtn) {
    popStressBtn.addEventListener("click", () => {
        if(popOverlay) {
            popOverlay.classList.add("active");
            fillGrid(); // Refresh every open
        }
    });
}

if(popExit) {
    popExit.addEventListener("click", () => {
        if(popOverlay) popOverlay.classList.remove("active");
        // Show encouraging toast
        const toast = document.getElementById("toast");
        if(toast) {
            toast.innerText = "You did great! Keep smiling! 💖";
            toast.className = "show";
            setTimeout(() => toast.classList.remove("show"), 3000);
        }
    });
}

if(popRefill) {
    popRefill.addEventListener("click", fillGrid);
}
