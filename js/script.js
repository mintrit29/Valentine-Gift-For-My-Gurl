document.addEventListener("DOMContentLoaded", function () {
  
  // === 0. ENHANCEMENTS (Loader, Typing, Cursor, Title) ===
  
  // Loading Screen
  const loader = document.getElementById("loading-screen");
  const questionScreen = document.getElementById("love-question-screen");
  const mainContent = document.querySelector(".hero-section"); // Just select hero to hide initially? No, let's hide via CSS or just overlay
  
  // Initially hide main content logic via the question screen overlaying it
  
  if(loader) {
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => { 
            loader.style.display = "none"; 
            // Question screen is already visible underneath
        }, 500);
    }, 1500); 
  }

  // Love Question Logic
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");

  if (yesBtn) {
      yesBtn.addEventListener("click", () => {
          // Success!
          if (questionScreen) {
              questionScreen.style.opacity = "0";
              setTimeout(() => {
                  questionScreen.style.display = "none";
                  // Start Typing Effect NOW
                  typeWriter();
              }, 500);
          }
      });
  }

  if (noBtn) {
      // Run away logic
      const moveNoBtn = () => {
          const container = document.querySelector(".question-container");
          if (!container) return;
          
          // Get container dimensions to keep button somewhat near, or just viewport
          // Let's use viewport for chaos
          const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
          const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
          
          noBtn.style.position = "fixed"; // Break out of flow completely
          noBtn.style.left = `${x}px`;
          noBtn.style.top = `${y}px`;
      };

      noBtn.addEventListener("mouseover", moveNoBtn);
      noBtn.addEventListener("click", moveNoBtn); // For mobile/fast clicks
      noBtn.addEventListener("touchstart", moveNoBtn); // Mobile touch
  }

  // Typing Effect
  const titleText = "Happy Valentine's Day, Nary";
  const titleElement = document.getElementById("typing-title");
  let charIndex = 0;

  function typeWriter() {
    if (charIndex < titleText.length) {
      titleElement.innerHTML += titleText.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 150);
    }
  }
  // Removed auto-start typing, triggered by Yes button now


  // Dynamic Title
  let docTitle = document.title;
  window.addEventListener("blur", () => {
      document.title = "Come back! 🥺💔";
  });
  window.addEventListener("focus", () => {
      document.title = docTitle;
  });

  // === 1. LOVE TIMER (Count Up) ===
  const startDate = new Date("December 14, 2025 00:00:00").getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = now - startDate;

    if (distance < 0) {
        const ids = ["days", "hours", "minutes", "seconds"];
        ids.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.innerText = "0";
        });
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const ids = ["days", "hours", "minutes", "seconds"];
    const values = [days, hours, minutes, seconds];

    ids.forEach((id, index) => {
        const el = document.getElementById(id);
        if(el) el.innerText = values[index];
    });
  }

  setInterval(updateTimer, 1000);
  updateTimer();

  // === 2. HEART RAIN EFFECT ===
  let heartInterval = null;
  function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    const size = Math.random() * 20 + 10 + "px";
    heart.style.fontSize = size;
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 5000);
  }
  function startHearts() {
    if (!heartInterval) {
      // Mobile optimization: Less frequent hearts
      const interval = window.innerWidth < 768 ? 1500 : 800; // Increased desktop interval slightly for perf
      heartInterval = setInterval(createHeart, interval);
    }
  }
  function stopHearts() {
    if (heartInterval) {
      clearInterval(heartInterval);
      heartInterval = null;
    }
    // Remove existing hearts
    document.querySelectorAll('.heart').forEach(h => h.remove());
  }

  // === 2.5 STAR EFFECT (Night Mode) ===
  let stars = [];
  function createStars() {
    // Mobile optimization: Fewer stars
    const starCount = window.innerWidth < 768 ? 20 : 40;
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.left = Math.random() * 100 + "vw";
      star.style.top = Math.random() * 100 + "vh";
      const size = Math.random() * 3 + 1;
      star.style.width = size + "px";
      star.style.height = size + "px";
      star.style.animationDuration = (Math.random() * 3 + 2) + "s";
      star.style.animationDelay = (Math.random() * 5) + "s";
      document.body.appendChild(star);
      stars.push(star);
    }
  }
  function removeStars() {
    stars.forEach(s => s.remove());
    stars = [];
  }

  // === 2.6 DAY/NIGHT TOGGLE ===
  const themeToggle = document.getElementById("themeToggle");
  const toggleIcon = themeToggle ? themeToggle.querySelector(".toggle-icon") : null;
  let isNightMode = localStorage.getItem("nightMode") === "true";

  function applyTheme(night) {
    if (night) {
      document.body.classList.add("night-mode");
      if (toggleIcon) toggleIcon.textContent = "🌙";
      stopHearts();
      createStars();
    } else {
      document.body.classList.remove("night-mode");
      if (toggleIcon) toggleIcon.textContent = "☀️";
      removeStars();
      startHearts();
    }
  }

  // Apply saved theme on load
  applyTheme(isNightMode);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      isNightMode = !isNightMode;
      localStorage.setItem("nightMode", isNightMode);
      applyTheme(isNightMode);
    });
  }


  // === 3. ADVANCED MUSIC PLAYER ===
  const musicContainer = document.getElementById('musicPlayerContainer');
  const playBtn = document.getElementById('play');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const audio = document.getElementById('audio');
  const progress = document.getElementById('progress');
  const progressContainer = document.getElementById('progress-container');
  const title = document.getElementById('title');
  const artist = document.getElementById('artist');
  const cover = document.getElementById('cover');
  const currTime = document.querySelector('#currTime');
  const durTime = document.querySelector('#durTime');

  // Song titles
  const songs = [
      {
          title: 'Glue Song',
          artist: 'Beabadoobee',
          src: 'Beabadoobee-Glue-Song',
          cover: 'https://media.tenor.com/ZB9kXOjfhasAAAAi/cat-kitty.gif'
      },
      {
          title: 'From The Start',
          artist: 'Laufey',
          src: 'Laufey-From-The-Start',
          cover: 'https://media.tenor.com/ZB9kXOjfhasAAAAi/cat-kitty.gif'
      },
      {
          title: 'ONLY',
          artist: 'LeeHi',
          src: 'ONLY-LeeHi',
          cover: 'https://media.tenor.com/ZB9kXOjfhasAAAAi/cat-kitty.gif'
      },
      {
          title: 'Seasons',
          artist: 'Wave To Earth',
          src: 'Wave-To-Earth-Seasons',
          cover: 'https://media.tenor.com/ZB9kXOjfhasAAAAi/cat-kitty.gif'
      },
      {
          title: 'Blue',
          artist: 'Yung Kai',
          src: 'Yung-Kai-Blue',
          cover: 'https://media.tenor.com/ZB9kXOjfhasAAAAi/cat-kitty.gif'
      }
  ];

  // Keep track of song
  let songIndex = 0;

  // Initially load song details into DOM
  if(songs.length > 0 && title) {
      loadSong(songs[songIndex]);
  }

  // Update song details
  function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    // Assume audio is in 'audio/' and images in 'images/'
    audio.src = `audio/${song.src}.mp3`;
    if (song.cover.startsWith('http')) {
        cover.src = song.cover;
    } else {
        cover.src = `images/${song.cover}.png`;
    }
  }

  // Play song
  function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i').innerText = '⏸'; // Pause icon
    audio.play();
  }

  // Pause song
  function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i').innerText = '▶'; // Play icon
    audio.pause();
  }

  // Previous song
  function prevSong() {
    songIndex--;
    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
  }

  // Next song
  function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
  }

  // Update progress bar
  function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calculate display time
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    currTime.innerText = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;

    if(duration) {
        const durationMinutes = Math.floor(duration / 60);
        const durationSeconds = Math.floor(duration % 60);
        durTime.innerText = `${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
    }
  }

  // Set progress bar
  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
  }

  // Event Listeners for Music Player
  if(playBtn) {
      playBtn.addEventListener('click', () => {
        const isPlaying = musicContainer.classList.contains('play');
        if (isPlaying) {
          pauseSong();
        } else {
          playSong();
        }
      });
  }

  if(prevBtn) prevBtn.addEventListener('click', prevSong);
  if(nextBtn) nextBtn.addEventListener('click', nextSong);
  if(audio) {
      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('ended', nextSong);
  }
  if(progressContainer) progressContainer.addEventListener('click', setProgress);


  // === 4. IMAGE MODAL & GALLERY TAB FILTER ===
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  
  const allImages = document.querySelectorAll(".gallery-item img");

  // Lazy load all gallery images for better performance
  allImages.forEach((img) => {
    img.setAttribute('loading', 'lazy');
    img.addEventListener("click", function () {
      modal.style.display = "block";
      modalImg.src = this.src;
    });
  });

  // Tab Filter & Load More Logic (optimized)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  
  let currentFilter = 'all';
  let currentPage = 1;
  const itemsPerPage = 9;

  function renderGallery() {
    requestAnimationFrame(() => {
      const dynamicGalleryItems = document.querySelectorAll('.gallery-item');
      let matchedItems = [];

      // Determine matching items
      dynamicGalleryItems.forEach(item => {
        const match = currentFilter === 'all' || item.dataset.category === currentFilter;
        if (match) {
          matchedItems.push(item);
        } else {
          item.style.display = 'none';
          item.classList.remove('appearing');
          item.classList.add('hidden'); // Also keep class for fallback/css matches
        }
      });

      // Show items for current page
      const limit = currentPage * itemsPerPage;
      matchedItems.forEach((item, index) => {
        if (index < limit) {
          item.style.display = ''; // Reset display to CSS defined value block/flex/grid
          item.classList.remove('hidden');
          item.classList.remove('appearing');
          void item.offsetWidth; // force reflow
          item.classList.add('appearing');
        } else {
          item.style.display = 'none';
          item.classList.remove('appearing');
          item.classList.add('hidden');
        }
      });

      // Check if Load More should be shown
      if (loadMoreBtn) {
        if (matchedItems.length > limit) {
          loadMoreBtn.classList.remove('hidden');
          loadMoreBtn.style.display = 'inline-block';
        } else {
          loadMoreBtn.classList.add('hidden');
          loadMoreBtn.style.display = 'none';
        }
      }
    });
  }

  // Initial load
  renderGallery();

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentFilter = btn.dataset.filter;
      currentPage = 1; // Reset to page 1

      renderGallery();
    });
  });

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      currentPage++;
      renderGallery();
    });
  }

  // === 6. TO-DO LIST ===
  const todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach(item => {
      item.addEventListener("click", () => {
          item.classList.toggle("completed");
      });
  });
  
  // === 7. REASONS GENERATOR ===
  const reasons = [
      "Because you have the cutest smile 💖",
      "Because you make my days brighter ☀️",
      "Because you are incredibly strong 💪",
      "Because of your kind heart ❤️",
      "Because you are simply YOU ✨",
      "Because every moment with you is a gift 🎁",
      "Because you inspire me to be better 🚀"
  ];

  const reasonBtn = document.getElementById("reasonBtn");
  const toast = document.getElementById("toast");

  let toastTimeout;
  if(reasonBtn) {
      reasonBtn.addEventListener("click", () => {
          const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
          toast.innerText = randomReason;
          
          // Clear existing timeout if any
          if (toastTimeout) {
            clearTimeout(toastTimeout);
          }

          // Reset class to restart animation
          toast.classList.remove("show");
          void toast.offsetWidth; // Trigger reflow
          
          toast.classList.add("show");
          
          toastTimeout = setTimeout(function(){ 
            toast.classList.remove("show"); 
          }, 3000);
      });
  }

});

// === 8. OPEN WHEN LETTERS ===
const letters = {
    'sad': "<h2>When You're Sad...</h2><p>Remember that it's okay not to be okay. Even Thorfinn had his dark days. I'm always here to listen, to hold your hand, or just sit in silence with you. You are loved more than you know. 🌧️🌈</p>",
    'miss': "<h2>When You Miss Me...</h2><p>How lucky I am to have something that makes saying goodbye so hard. Remember that distance means so little when someone means so much. I'll be there by your side before you know it. Sending you a virtual hug! 🤗💖</p>",
    'now': "<h2>Open Right Now!</h2><p>STOP! Look at yourself in the mirror. You are beautiful, you are capable, and you are amazing. Have a wonderful Valentine's Day! Go eat some chocolate! 🍫😘</p>",
    'badFriends': "<h2>When You Encounter Bad Friends...</h2><p>People come and go, but your worth stays. Don't let their toxicity dim your light. You have a heart of gold, and those who don't see it don't deserve a place in it. <br><br>Remember, Thorfinn said: <i>\"I have no enemies.\"</i> Be kind, but protect your peace. I'm always on your team. 🛡️❤️</p>"
};

// ... existing openLetter/closeModal ...

// === 9. VENT BOX LOGIC ===
const burnBtn = document.getElementById("burnBtn");
if (burnBtn) {
    burnBtn.addEventListener("click", () => {
        const input = document.getElementById("ventText");
        if (input.value.trim() !== "") {
            input.classList.add("burning");
            
            // Wait for animation to finish
            setTimeout(() => {
                input.value = "";
                input.classList.remove("burning");
                
                // Show toast
                const toast = document.getElementById("toast");
                if(toast) {
                    toast.innerText = "Negative vibes incinerated! 🔥✨";
                    toast.className = "show";
                    setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
                }
            }, 1500); // Matches animation duration
        } else {
            alert("Write something to burn first! 😠");
        }
    });
}

function openLetter(type) {
    const modal = document.getElementById("letterModal");
    const content = document.getElementById("letterText");
    if(modal && content) {
        content.innerHTML = letters[type];
        modal.style.display = "block";
    }
}

function closeModal(modalId) {
    const m = document.getElementById(modalId);
    if(m) m.style.display = "none";
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}
