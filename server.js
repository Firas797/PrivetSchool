require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const DBConnetct = require('./config/DBConnetct');

console.log('🚀 Starting server with MANUAL CORS...');

// Connect to MongoDB
DBConnetct();

const app = express();

// ✅ MANUAL CORS MIDDLEWARE
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.originalUrl} - Origin: ${req.headers.origin}`);
  
  res.header('Access-Control-Allow-Origin', 'https://privetschool-front.ohbjmh.easypanel.host');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Cookie');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    console.log('🛬 Handling OPTIONS preflight request');
    return res.status(200).end();
  }
  
  next();
});

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server with MANUAL CORS is running',
    timestamp: new Date().toISOString()
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`✅ MANUAL CORS enabled for: https://privetschool-front.ohbjmh.easypanel.host`);
});