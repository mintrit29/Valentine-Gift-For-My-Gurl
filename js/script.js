document.addEventListener("DOMContentLoaded", function () {
  
  // === 0. ENHANCEMENTS (Loader, Typing, Cursor, Title) ===
  
  // Loading Screen
  const loader = document.getElementById("loading-screen");
  if(loader) {
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => { loader.style.display = "none"; }, 500);
    }, 1500); // Fake load time
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
  // Start typing after loader fades (approx 2s)
  setTimeout(typeWriter, 2000);

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
      heartInterval = setInterval(createHeart, 300);
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
    for (let i = 0; i < 80; i++) {
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


  // === 4. IMAGE MODAL & COLLAPSIBLE ===
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  
  // Update selector to include collapsible images
  const allImages = document.querySelectorAll(".gallery-item img, .collapsible-inner img");

  allImages.forEach((img) => {
    img.addEventListener("click", function () {
      modal.style.display = "block";
      modalImg.src = this.src;
    });
  });
  
  // Collapsible Logic
  const collapsibleBtn = document.querySelector(".collapsible-trigger");
  if (collapsibleBtn) {
    collapsibleBtn.addEventListener("click", function () {
        this.classList.toggle("active");
        const content = this.nextElementSibling;
        
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            this.innerText = "Scroll for My Cat Photos 🐱 ▼";
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            this.innerText = "Show Less ▲";
        }
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

  if(reasonBtn) {
      reasonBtn.addEventListener("click", () => {
          const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
          toast.innerText = randomReason;
          toast.className = "show";
          setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
      });
  }

});

// === 8. OPEN WHEN LETTERS ===
const letters = {
    'sad': "<h2>When You're Sad...</h2><p>Remember that it's okay not to be okay. Even Thorfinn had his dark days. I'm always here to listen, to hold your hand, or just sit in silence with you. You are loved more than you know. 🌧️🌈</p>",
    'miss': "<h2>When You Miss Me...</h2><p>How lucky I am to have something that makes saying goodbye so hard. Remember that distance means so little when someone means so much. I'll be there by your side before you know it. Sending you a virtual hug! 🤗💖</p>",
    'now': "<h2>Open Right Now!</h2><p>STOP! Look at yourself in the mirror. You are beautiful, you are capable, and you are amazing. Have a wonderful Valentine's Day! Go eat some chocolate! 🍫😘</p>"
};

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
