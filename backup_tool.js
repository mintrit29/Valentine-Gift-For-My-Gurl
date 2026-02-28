require('dotenv').config();
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get } = require('firebase/database');

// Firebase Configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Directory for backups
const BACKUP_DIR = path.join(__dirname, 'Local_Backup');

// Ensure backup directories exist
const categories = ['gf', 'cat', 'art'];
if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR);
}
categories.forEach(category => {
    const categoryPath = path.join(BACKUP_DIR, category);
    if (!fs.existsSync(categoryPath)) {
        fs.mkdirSync(categoryPath);
    }
});

// Download Function
async function downloadImage(url, filepath) {
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });
    return new Promise((resolve, reject) => {
        response.data.pipe(fs.createWriteStream(filepath))
            .on('error', reject)
            .once('close', () => resolve(filepath));
    });
}

// Main Backup Logic
async function backupImages() {
    console.log('🔄 Bắt đầu quá trình sao lưu ảnh từ Firebase...');
    const galleryRef = ref(database, 'gallery');
    try {
        const snapshot = await get(galleryRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            const keys = Object.keys(data);
            console.log(`📸 Tìm thấy tổng cộng ${keys.length} ảnh cần kiểm tra.`);

            let downloadedCount = 0;
            let skippedCount = 0;

            for (const key of keys) {
                const item = data[key];
                if (!item || !item.url) continue;

                const category = item.category || 'gf'; // default to gf
                const url = item.url;
                
                // Extract filename from URL (e.g., from https://i.ibb.co/xyz/image.jpg)
                const urlParts = url.split('/');
                const filename = urlParts[urlParts.length - 1];
                const filepath = path.join(BACKUP_DIR, category, filename);

                if (fs.existsSync(filepath)) {
                    // console.log(`⏩ Đã tồn tại: [${category}] ${filename}`);
                    skippedCount++;
                } else {
                    console.log(`📥 Đang tải: [${category}] ${filename}...`);
                    await downloadImage(url, filepath);
                    downloadedCount++;
                    console.log(`✅ Lưu thành công: ${filepath}`);
                }
            }

            console.log('\n=====================================');
            console.log(`🎉 HOÀN TẤT SAO LƯU.`);
            console.log(`📥 Đã tải mới: ${downloadedCount} ảnh.`);
            console.log(`⏩ Đã bỏ qua (đã có sẵn): ${skippedCount} ảnh.`);
            console.log(`📁 Thư mục lưu trữ: ${BACKUP_DIR}`);
            console.log('=====================================\n');

        } else {
            console.log('❌ Không tìm thấy dữ liệu ảnh nào trong Firebase (Node "gallery" trống).');
        }
    } catch (error) {
        console.error('❌ Lỗi quá trình sao lưu:', error);
    }
    
    // Thoát tiến trình Node sau khi xong
    process.exit(0);
}

// Run the script
backupImages();
