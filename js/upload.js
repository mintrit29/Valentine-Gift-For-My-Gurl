import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPuMmSNqiiL5EjSO77f0lrBDV8Xd0CbWk",
  authDomain: "my-gurl-9b0fd.firebaseapp.com",
  databaseURL: "https://my-gurl-9b0fd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-gurl-9b0fd",
  storageBucket: "my-gurl-9b0fd.firebasestorage.app",
  messagingSenderId: "343834398667",
  appId: "1:343834398667:web:bb11738e480b43dad3f04e",
  measurementId: "G-WNW30078KQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ImgBB API Key
const IMGBB_API_KEY = "f2426d279a565b6cacfea4de3f7d0638";

document.addEventListener("DOMContentLoaded", () => {
    // 1. Upload Logic
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('imageInput');
    const fileNameDisplay = document.getElementById('fileNameDisplay');

    if (fileInput && fileNameDisplay) {
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                fileNameDisplay.innerText = e.target.files[0].name;
            } else {
                fileNameDisplay.innerText = "Choose a Photo 📸";
            }
        });
    }

    if (uploadBtn) {
        uploadBtn.addEventListener('click', async () => {
            const categorySelect = document.getElementById('categorySelect');
            const statusEl = document.getElementById('uploadStatus');
            
            if (!fileInput.files[0]) {
                statusEl.innerHTML = "<span style='color: #ff4d6d;'>Oops, you haven't selected a photo yet! 🥺</span>";
                return;
            }

            const file = fileInput.files[0];
            const captionInput = document.getElementById('imageCaption');
            const category = categorySelect.value;
            const caption = captionInput ? captionInput.value.trim() : "";
            const formData = new FormData();
            
            formData.append("image", file);
            statusEl.innerText = "⏳ Uploading to the clouds... Please wait a moment!";

            uploadBtn.disabled = true;

            try {
                // 1. Upload to ImgBB
                const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();
                
                if (data.success) {
                    const directUrl = data.data.url;
                    statusEl.innerText = "🎉 Uploaded! Adding to the Gallery...";
                    
                    // 2. Save URL to Firebase
                    const galleryRef = ref(database, 'gallery');
                    await push(galleryRef, {
                        url: directUrl,
                        category: category,
                        caption: caption,
                        timestamp: Date.now()
                    });

                    statusEl.innerHTML = "<span style='color: #4CAF50;'>💖 Successfully uploaded! Scroll down to see it!</span>";
                    fileInput.value = ""; // Clear input
                    if (captionInput) captionInput.value = "";
                    if (fileNameDisplay) fileNameDisplay.innerText = "Choose a Photo 📸";

                    // Switch to the uploaded category
                    const targetTab = document.querySelector(`.tab-btn[data-filter="${category}"]`);
                    if (targetTab) {
                        targetTab.click();
                    }
                } else {
                    statusEl.innerHTML = "<span style='color: #ff4d6d;'>❌ Error: " + data.error.message + "</span>";
                }
            } catch (error) {
                statusEl.innerHTML = "<span style='color: #ff4d6d;'>❌ Network error, please try again!</span>";
                console.error(error);
            } finally {
                uploadBtn.disabled = false;
                setTimeout(() => {
                    if (statusEl.innerText.includes("Successfully")) {
                       statusEl.innerText = "";
                    }
                }, 5000);
            }
        });
    }

    // 2. Fetch and Render Gallery Logic
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        const galleryRef = ref(database, 'gallery');
        
        // Listen for real-time updates
        onValue(galleryRef, (snapshot) => {
            const data = snapshot.val();
            
            // Clear current dynamic images (keep hardcoded ones if you want, or clear all)
            // Let's clear ONLY the ones we injected to not mess up initial hardcoded if they exist, 
            // OR we can just clear the whole grid and let Firebase handle everything.
            // For this implementation, we will append Firebase images at the BEGINNING.
            
            // First, remove previously fetched images to prevent duplicates on refresh
            document.querySelectorAll('.firebase-fetched').forEach(el => el.remove());

            if (data) {
                const keys = Object.keys(data);
                // Reverse to show newest first
                keys.reverse().forEach(key => {
                    const item = data[key];
                    const category = item.category || 'gf';
                    const customCaption = item.caption || "";
                    
                    const itemDiv = document.createElement('div');
                    itemDiv.className = `gallery-item glass-card firebase-fetched appearing`;
                    itemDiv.setAttribute('data-category', category);
                    
                    let overlayText = customCaption;
                    if (!overlayText) {
                        if(category === 'gf') overlayText = "For Nary 💖";
                        if(category === 'cat') overlayText = "Meow Meow 🐱";
                        if(category === 'art') overlayText = "Art 🎨";
                    }

                    itemDiv.innerHTML = `
                        <img src="${item.url}" alt="${category} photo" loading="lazy">
                        <div class="gallery-overlay">${overlayText}</div>
                    `;

                    // Add click event for modal (same as script.js)
                    const img = itemDiv.querySelector('img');
                    img.addEventListener('click', function() {
                        const modal = document.getElementById("imageModal");
                        const modalImg = document.getElementById("modalImage");
                        if(modal && modalImg) {
                            modal.style.display = "block";
                            modalImg.src = this.src;
                        }
                    });

                    // Insert at beginning
                    galleryGrid.insertBefore(itemDiv, galleryGrid.firstChild);
                });
                
                // Trigger filter reflow if a filter is currently active
                const activeTab = document.querySelector('.tab-btn.active');
                if (activeTab) {
                    activeTab.click(); 
                }
            }
        });
    }

    // 3. Submit New Letter Logic
    const submitLetterBtn = document.getElementById('submitLetterBtn');
    if (submitLetterBtn) {
        submitLetterBtn.addEventListener('click', async () => {
            const titleInput = document.getElementById('letterTitle');
            const contentInput = document.getElementById('letterContent');
            const statusEl = document.getElementById('letterStatus');

            const title = titleInput.value.trim();
            const content = contentInput.value.trim();

            if (!title || !content) {
                statusEl.innerHTML = "<span style='color: #ff4d6d;'>Please fill in both the title and content! 🥺</span>";
                return;
            }

            statusEl.innerText = "⏳ Sealing the envelope... Please wait!";
            submitLetterBtn.disabled = true;

            try {
                const lettersRef = ref(database, 'letters');
                await push(lettersRef, {
                    title: title,
                    content: content,
                    timestamp: Date.now()
                });

                statusEl.innerHTML = "<span style='color: #4CAF50;'>💌 Letter sent successfully! It's in the grid now!</span>";
                titleInput.value = "";
                contentInput.value = "";
            } catch (error) {
                statusEl.innerHTML = "<span style='color: #ff4d6d;'>❌ Network error, couldn't send the letter!</span>";
                console.error(error);
            } finally {
                submitLetterBtn.disabled = false;
                setTimeout(() => {
                    if (statusEl.innerText.includes("successfully")) {
                        statusEl.innerText = "";
                    }
                }, 5000);
            }
        });
    }

    // 4. Fetch and Render Dynamic Letters
    const lettersGrid = document.querySelector('.letters-grid');
    if (lettersGrid && database) {
        const lettersRef = ref(database, 'letters');
        
        onValue(lettersRef, (snapshot) => {
            const data = snapshot.val();
            
            // Remove previously fetched DYNAMIC letters so we don't duplicate them on refresh,
            // but carefully KEEP the hardcoded ones.
            document.querySelectorAll('.dynamic-letter').forEach(el => el.remove());

            if (data) {
                const keys = Object.keys(data);
                keys.forEach(key => {
                    const letterData = data[key];
                    
                    const envelope = document.createElement('div');
                    envelope.className = 'letter-envelope dynamic-letter appearing'; 
                    
                    // Store HTML content in dataset safely
                    envelope.dataset.content = encodeURIComponent(
                        `<h2>${letterData.title}</h2><p>${letterData.content.replace(/\\n/g, '<br>')}</p>`
                    );
                    
                    envelope.innerHTML = `<span class="letter-title">${letterData.title}</span>`;
                    
                    // Add click event for Dynamic Letter Modal (Uses same modal as static)
                    envelope.addEventListener('click', function() {
                        const modal = document.getElementById("letterModal");
                        const contentText = document.getElementById("letterText");
                        if(modal && contentText) {
                            contentText.innerHTML = decodeURIComponent(this.dataset.content);
                            modal.style.display = "block";
                        }
                    });

                    // Append next to the hardcoded ones
                    lettersGrid.appendChild(envelope);
                });
            }
        });
    }
});
