require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const DBConnetct = require('./config/DBConnetct');
const { default: helmet } = require('helmet');

console.log('🚀 Starting server with CORS FIX...');

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
    console.log('✅ Handling OPTIONS preflight');
    return res.status(200).end();
  }
  
  next();
});

// Also use cors package as backup
app.use(cors({
  origin: 'https://privetschool-front.ohbjmh.easypanel.host',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));

app.options('*', cors());

// Basic middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve uploads
app.use('/uploads', express.static('uploads'));

// Security middleware
app.use(helmet());

// Ensure upload directory exists
const fs = require('fs');
const uploadDir = 'uploads/profile-pictures';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Health check endpoint (MUST BE FIRST ROUTE)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server with CORS FIX is running',
    timestamp: new Date().toISOString(),
    cors: 'enabled'
  });
});

// Routes
app.use('/user', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/coursesRouter'));
app.use('/api/conclusions', require('./routes/concluRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/homeworks', require('./routes/HomeWorkRoutes'));
app.use('/teachers', require('./routes/teacherRoutes'));
app.use('/api/quizzes', require('./routes/quizRoutes'));
app.use('/api/culture', require('./routes/cultureRoutes'));
app.use('/api/emplois', require('./routes/emploiRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/exams', require('./routes/examRoutes'));

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'PrivetSchool API is running with CORS FIX',
    health: '/health',
    endpoints: {
      auth: '/user/login, /user/register',
      courses: '/api/courses',
      exams: '/api/exams',
      homeworks: '/api/homeworks',
      quizzes: '/api/quizzes',
      events: '/api/events',
      teachers: '/teachers'
    }
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  console.log('❌ 404 - API route not found:', req.originalUrl);
  res.status(404).json({ 
    error: 'API route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅✅✅ SERVER STARTED - CORS FIX VERSION RUNNING ON PORT ${PORT}`);
  console.log(`✅✅✅ CORS ENABLED FOR: https://privetschool-front.ohbjmh.easypanel.host`);
  console.log(`✅✅✅ Health check: https://57.131.24.227:${PORT}/health`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('🔄 Received SIGTERM, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🔄 Received SIGINT, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});