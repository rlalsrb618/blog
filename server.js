// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/noticeApp', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// 공지사항 스키마 정의
const noticeSchema = new mongoose.Schema({
    type: String, // general or class
    className: String, // 수행평가용
    date: String,
    title: String,
    description: String,
    fileName: String,
    fileData: String,
    fileType: String,
    createdAt: { type: Date, default: Date.now }
});
const Notice = mongoose.model('Notice', noticeSchema);

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '10mb' }));

// 업로드 폴더
const upload = multer({ storage: multer.memoryStorage() });

// 클라이언트 연결
io.on('connection', (socket) => {
    console.log('사용자 연결됨');

    // 공지사항 불러오기
    Notice.find().sort({ createdAt: -1 }).then(notices => {
        socket.emit('loadNotices', notices);
    });

    // 새로운 공지사항 추가
    socket.on('addNotice', async (data) => {
        try {
            const notice = new Notice(data);
            const saved = await notice.save();
            io.emit('newNotice', saved); // 모두에게 실시간 전송
        } catch (err) {
            socket.emit('error', { message: '공지 등록 실패', error: err });
        }
    });

    socket.on('disconnect', () => {
        console.log('사용자 연결 종료');
    });
});

// 서버 실행
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
