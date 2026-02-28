<div align="center">
  <img src="https://media.tenor.com/ZB9kXOjfhasAAAAi/cat-kitty.gif" width="150" alt="Cute Cat"/>
  <h1>💖 Valentine Gift For My Gurl 💖</h1>
  <p>A highly personalized, interactive digital love letter & memory vault built specifically for Nary.</p>
  
  [![Made with Love](https://img.shields.io/badge/Made%20with-Love%20%E2%9D%A4%EF%B8%8F-ff4d6d.svg)](https://github.com/mintrit29)
  [![UI](https://img.shields.io/badge/UI-Glassmorphism-9b59b6.svg)]()
  [![Tech](https://img.shields.io/badge/Tech-Vanilla%20JS-F7DF1E.svg)]()
  [![Database](https://img.shields.io/badge/Database-Firebase-FFCA28.svg)]()
</div>

---

## ✨ Overview

**Valentine Gift For My Gurl** is not just a static webpage; it's a living, breathing digital scrapbook and emotional support platform. Designed with a modern, smooth **Glassmorphism** UI, it creates a cozy space to store memories, listen to shared favorite songs, and interact with cute mini-games.

This project goes beyond a simple greeting card by integrating real-time databases and unlimited cloud image hosting, allowing the recipient to actively participate in building the memory vault.

## 🌟 Key Features

### 💌 Emotional Connection
- **Dynamic "Open When" Letters:** A digital letterbox. Read pre-written comforting letters or write/seal **new letters** directly from the UI, saved instantly to Firebase.
- **Why I Love You:** A magic button that pops up random affectionate reasons.
- **Love Timer:** A live counter tracking the days, hours, minutes, and seconds since our special day (Dec 14, 2025).

### 📸 Unlimited Cloud Gallery
- **Tabbed Gallery:** Filter memories by categories (Nary's Corner, My Cat, Art & Pusheen).
- **Direct Image Uploads:** A beautiful UI for Nary to upload her own photos. Images bypass standard host limits by uploading directly to **ImgBB** (unlimited storage).
- **Real-time Sync:** Uploaded images and custom captions are saved to **Firebase Realtime Database** and instantly rendered on the grid without reloading the page.
- **Smart Pagination:** Lazy loads 9 images at a time with a "Show More" feature to keep the site lightning fast.

### 🎵 Entertainment & Comfort
- **Advanced Music Player:** A fully functional, custom-styled glass music player loaded with our favorite tracks (Beabadoobee, Laufey, Wave To Earth, etc.). Features an animated spinning vinyl record.
- **Pop Stress Mini-game:** Feeling overwhelmed? Click the floating bear 🐻 to overlay a bubble-wrap popping mini-game.
- **Vent Box:** A secure place to type out frustrations and digitally **"Burn It Away"** with a satisfying fiery animation.

### 🎨 Aesthetic & UX
- **Day/Night Cycle:** Toggle between a bright daytime theme with falling hearts 💖, or a soothing Night Mode with twinkling stars ✨. The entire UI smoothly adapts.
- **Typing & Tab Animations:** Dynamic greeting text and cheeky browser tab titles when the user switches away.
- **Guestbook:** Integrated with Giscus, allowing comments and reactions directly via GitHub Discussions.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (No heavy frameworks, blazing fast).
- **Design:** Glassmorphism, CSS Variables, CSS Animations.
- **Backend/BaaS:** Firebase Realtime Database (Data storage for gallery and letters).
- **Image Hosting:** ImgBB API.
- **Comments:** Giscus (GitHub Discussions).
- **Local Scripts:** Node.js (for the automated backup tool).

---

## 💾 Local Backup System

To ensure our precious memories are never lost to the cloud, this project includes a custom **Node.js Backup Tool**. It scans the Firebase database and downloads all new, unbacked-up high-resolution images straight to the local hard drive.

### How to run the backup:
1. Open your terminal in the project directory.
2. Install dependencies (only needed the first time):
   ```bash
   npm install
   ```
3. Run the backup script:
   ```bash
   npm run backup
   ```
*The script will automatically organize downloaded images into `./Local_Backup/gf/`, `./Local_Backup/cat/`, and `./Local_Backup/art/` folders based on their tags.*

---

## 🔒 Environment Setup

If you are cloning this repository, you will need to set up your own Firebase and ImgBB credentials.

1. Create a `.env` file in the root directory for the Node.js backup script:
   ```env
   FIREBASE_API_KEY=your_key
   FIREBASE_AUTH_DOMAIN=your_domain
   FIREBASE_DATABASE_URL=your_url
   FIREBASE_PROJECT_ID=your_id
   FIREBASE_STORAGE_BUCKET=your_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   FIREBASE_APP_ID=your_app_id
   FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```
2. Update the credentials in `js/upload.js` for the frontend to connect correctly.

---
<div align="center">
  <i>"I have no enemies." - Thorfinn</i><br>
  Built with ❤️ for a very special someone.
</div>
