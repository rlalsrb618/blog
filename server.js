// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const upload = multer({ storage: multer.memoryStorage() });
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/noticeApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// 공지 스키마
const noticeSchema = new mongoose.Schema({
  type: String, // general or class
  className: String,
  date: String,
  title: String,
  description: String,
  fileData: String,
  fileName: String,
  fileType: String,
  createdAt: { type: Date, default: Date.now }
});
const Notice = mongoose.model('Notice', noticeSchema);

// Socket.IO 연결
io.on('connection', socket => {
  console.log('사용자 연결');

  // 공지 초기 로드
  Notice.find().sort({ createdAt: -1 }).then(notices => {
    socket.emit('loadNotices', notices);
  });

  // 새로운 공지
  socket.on('addNotice', async (data) => {
    try {
      const notice = new Notice(data);
      const saved = await notice.save();
      io.emit('newNotice', saved);
    } catch (err) {
      socket.emit('error', { message: '공지 등록 실패', error: err });
    }
  });

  socket.on('disconnect', () => console.log('사용자 연결 종료'));
});

// 서버 실행
const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

