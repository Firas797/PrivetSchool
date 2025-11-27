require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const DBConnetct = require('./config/DBConnetct');
const { default: helmet } = require('helmet');

console.log('🚀 Starting server with CORS DEBUG...');

// Connect to MongoDB
DBConnetct();

const app = express();

// 🚀 CRITICAL CORS FIX - Add this FIRST
app.use((req, res, next) => {
  console.log('🛬 INCOMING REQUEST:', req.method, req.url, 'Origin:', req.headers.origin);
  
  // Set CORS headers
  res.header('Access-Control-Allow-Origin', 'https://privetschool-front.ohbjmh.easypanel.host');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Cookie');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    console.log('✅ Handling OPTIONS preflight for:', req.url);
    return res.status(200).end();
  }
  
  next();
});

// Basic middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve uploads
app.use('/uploads', express.static('uploads'));

// Security middleware
app.use(helmet());



// ✅ Handle preflight requests
app.options('*', cors());
const fs = require('fs');
const uploadDir = 'uploads/profile-pictures';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
// Routes
app.get('/', (req, res) => {
    res.json({ msg: 'Welcome Firas' });
});
app.use('/user', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/coursesRouter'));
app.use('/api/conclusions', require('./routes/concluRoutes')); // ✅ Changed prefix
app.use('/api/events', require('./routes/eventRoutes'));

app.use('/api/homeworks', require('./routes/HomeWorkRoutes'));
app.use('/teachers', require('./routes/teacherRoutes'));

// ✅ Add Quiz Routes
app.use('/api/quizzes', require('./routes/quizRoutes'));
app.use('/api/culture', require('./routes/cultureRoutes'));

app.use('/api/emplois', require('./routes/emploiRoutes')); // <-- Added this line
app.use('/api/notifications', require('./routes/notificationRoutes'));

app.use('/api/exams', require('./routes/examRoutes'));


// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'PrivetSchool API - CORS DEBUG',
    test: 'Try /user/login - it should work now',
    health: '/health'
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅✅✅ SERVER STARTED - CORS DEBUG VERSION ON PORT ${PORT}`);
  console.log(`✅✅✅ Test login: https://57.131.24.227:${PORT}/user/login`);
});

process.on('SIGTERM', () => {
  console.log('🔄 Shutting down...');
  server.close(() => {
    process.exit(0);
  });
});