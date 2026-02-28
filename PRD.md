# Project Requirements Document (PRD)
**Tên dự án:** Valentine Gift For My Gurl
**Mô tả:** Một trang web cá nhân hóa được thiết kế như một món quà tình yêu dành tặng bạn gái tên Nary. Trang web tích hợp nhiều tính năng lãng mạn, lưu giữ kỷ niệm và các công cụ tương tác nhỏ giúp giải trí và giảm stress.

---

## 1. Mục tiêu (Objectives)
- **Gắn kết tình cảm:** Tạo ra một không gian số lãng mạn, lưu giữ các kỷ niệm, hình ảnh và quãng thời gian yêu nhau.
- **Thư giãn & Giải trí:** Cung cấp các trò chơi/công cụ nhỏ giúp người nhận giải tỏa căng thẳng.
- **Trải nghiệm người dùng:** Giao diện đẹp mắt mang phong cách Glassmorphism (hiệu ứng kính mờ), thao tác mượt mà và hiển thị trơn tru trên nhiều thiết bị (Responsive).

---

## 2. Đối tượng sử dụng (Target Audience)
- **Người dùng chính:** Nary (Bạn gái của tác giả).
- **Tính chất:** Riêng tư, cá nhân hóa cao với những sở thích riêng biệt của cặp đôi (ví dụ: nhân vật Thorfinn, Lain, Pusheen, Chiikawa).

---

## 3. Các tính năng chính (Core Features)

### 3.1. Trải nghiệm mở đầu (Onboarding & Greeting)
- **Màn hình tải (Loading Screen):** Hiển thị màn hình chờ với biểu tượng trái tim.
- **Trang hỏi "Do you love me?" (Love Question Lock):**
  - Màn hình khóa bắt buộc hỏi người dùng có yêu mình không.
  - Nút **"Yes"**: Cho phép truy cập vào trang chính, kích hoạt hiệu ứng gõ chữ (typing title).
  - Nút **"No"**: Tự động chạy trốn/chuyển vị trí ngẫu nhiên trên màn hình khi người dùng di chuột hoặc chạm vào để không cho phép từ chối.

### 3.2. Hiệu ứng và Giao diện (UI & Visual Effects)
- **Giao diện Tiếng Anh (English UI):** Toàn bộ giao diện người dùng, nút bấm và thông báo được thiết kế bằng Tiếng Anh để tạo cảm giác hiện đại và nhất quán.
- **Tiêu đề gõ chữ động (Typing Effect):** Lời chào "Happy Valentine's Day, Nary" sẽ xuất hiện từ từ như đang được gõ.
- **Theme Ngày/Đêm (Day/Night Toggle):**
  - Nút chuyển đổi (mặt trời/mặt trăng) trên góc màn hình.
  - **Chế độ Ngày:** Trang sáng, hiển thị hiệu ứng "Mưa trái tim" rơi với tần suất và kích thước ngẫu nhiên.
  - **Chế độ Đêm:** Trang tối (Night Mode), ẩn trái tim và thay bằng hiệu ứng "Bầu trời sao" lấp lánh (Stars effect). Giao diện tĩnh (kể cả form mới) được cập nhật màu sắc sang chế độ tối (Dark Mode CSS adjustments).
- **Tiêu đề tab động (Dynamic Browser Title):** Khi người nhận chuyển sang màn hình tab khác, tiêu đề tab sẽ đổi thành "Come back! 🥺💔" để gọi mời quay lại.

### 3.3. Thông tin cá nhân & Kỷ niệm (Profiles & Love Stats)
- **Thẻ hồ sơ (Profile Cards):** Hiển thị các nhân vật yêu thích của cả hai.
  - Nary's Fav: Thorfinn.
  - My Fav: Lain.
- **Đồng hồ tình yêu (Love Timer):** Đếm thời gian thực (Days, Hours, Mins, Secs) kể từ ngày kỷ niệm (14/12/2025).
- **Nhiệm vụ Valentine (Valentine's To-Do List):** Danh sách các hoạt động (Ăn chocolate, Xem phim, v.v.). Người dùng có thể click để đánh dấu đã hoàn thành (gạch ngang chữ).

### 3.4. Âm nhạc và Giải trí (Music & Interaction)
- **Trình phát nhạc nâng cao (Advanced Music Player):** 
  - Giao diện Custom Music Player dạng Glass.
  - Danh sách bài hát (Glue Song, Laufey, LeeHi, v.v.) được nạp qua mảng dữ liệu nội bộ.
  - Các chức năng: Play/Pause, Next/Prev, thanh tiến trình hiển thị ảnh cover dạng đĩa than xoay hoặc ảnh động gif mèo.
- **Nút "Why I Love You?":** Nút bấm sẽ random hiển thị một thông điệp tình cảm nhỏ dạng Toast Notification (popup) ở góc màn hình.

### 3.5. Hỗ trợ Cảm xúc & Tâm lý (Emotional Support)
- **Hộp thư "Open When" (Open When Letters):**
  - Tập hợp các hộp thư tĩnh (Hardcoded) để mở trong các tình huống: Khi buồn, Khi nhớ nhau, Khi lo lắng/gặp bạn bè xấu, và Ngay lúc này.
  - **Thư Động (Dynamic Letters):** Cung cấp Form "Send a New Letter ✍️💌" cho phép lưu trữ và hiển thị ngay lập tức các bức thư mới (lưu trên node `letters` của Firebase RTDB).
  - Sử dụng modal popup hiển thị lời an ủi/chúc mừng tương ứng.
- **Trò chơi "Pop the Stress!":**
  - Mini-game được kích hoạt bằng một nút (hoặc hình biểu tượng gấu), mở ra màn hình overlay toàn bộ với các cục bong bóng giả lập để bóp nổ, giúp xả stress.
- **Hộp trút giận (Vent Box):**
  - Khung văn bản cho phép người dùng viết ra những bực tức.
  - Nút **"Burn It away!"** thực hiện mô phỏng hiệu ứng đốt cháy văn bản và dọn dẹp điềm xui, hiển thị toast thông báo tích cực.

### 3.6. Thư viện Kỷ niệm (Gallery Section)
- **Bộ lọc thư viện (Filterable Gallery Tabs):**
  - Tab lọc ảnh: All Photos, My GF, My Cat, Art & Pusheen.
  - Phân trang hiển thị (Pagination): Lưới ảnh được giới hạn hiển thị tối đa 9 ảnh một lần để tối ưu hóa hiệu suất (Load More logic). Button "Show More 🌸" sẽ xuất hiện nếu vẫn còn ảnh.
- **Modal xem ảnh (Image Lightbox):** Nhấp vào bất kỳ ảnh nào để hiển thị modal phóng to chân thực.
- **Quản lý Hình ảnh (Upload & Lưu trữ mở rộng):**
  - Cung cấp tính năng Upload ảnh tự động thông qua Form (Nhập Ảnh, Chọn Category, Tự đặt Tiêu đề/Caption). Tự động chuyển Active Tab sang khu vực vừa tải ảnh lên.
  - Ảnh tải lên được lưu trữ trên **ImgBB** để tận dụng dung lượng không giới hạn và trả về Direct URL.
  - Direct URL của ảnh cộng với Title/Caption tùy chỉnh được lưu trữ trên **Firebase Realtime Database** để quản lý danh sách ảnh mượt mà, tải nhanh. Lưới ảnh tự động thêm ảnh mới lên đầu mà không cần F5.
  - Cung cấp một script Node.js cục bộ để tự động sao lưu định kỳ tất cả hình ảnh về thư mục Local Backup giúp bảo toàn bộ sưu tập ảnh vĩnh viễn khỏi các biến cố rủi ro.

### 3.7. Sổ lưu bút (Guestbook)
- Tích hợp **Giscus** (chạy nền trên GitHub Discussions) cho phép để lại bình luận, lưu bút trực tiếp lên website.

---

## 4. Công nghệ sử dụng (Tech Stack)
- **Frontend Core:** HTML5, CSS3, JavaScript (Vanilla - Không sử dụng framework để dự án đơn giản, nhẹ nhàng).
- **Phông cách thiết kế:** Glassmorphism UI (Viền mờ, hiệu ứng trong suốt như kính).
- **Công cụ bên thứ 3:** Giscus (quản lý comment bằng repo GitHub `mintrit29/wekii4funk`).
- **Icon / Hình ảnh động:** Có sử dụng các file ảnh đuôi `.gif` để tạo sự dễ thương (Từ Tenor, v.v.).

---

## 5. Cấu trúc thư mục (Directory Structure)
- `index.html`: Cấu trúc và giao diện chính của toàn bộ món quà.
- `css/`:
  - `style.css`: Nơi định nghĩa CSS chính (màu sắc, glass panel, responsive, theme ngày đêm).
  - `pop_game.css`: Định nghĩa giao diện dạng overlay cho Mini-game Pop Stress.
- `js/`:
  - `script.js`: Quy định các logic DOM (hiệu ứng khóa trốn tránh nút "No", nhạc, gõ chữ, thời gian, thư).
  - `pop_game.js`: Logic thao tác click tạo và nổ bóng giải trí.
- `images/`: Chứa các ảnh về GF, mèo, Art/Pusheen dùng vào thẻ Gallery.
- `audio/`: Chứa các bản nhạc định dạng MP3 (`Beabadoobee-Glue-Song.mp3`, v.v.).
