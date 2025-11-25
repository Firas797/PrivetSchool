require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const DBConnetct = require('./config/DBConnetct');

console.log('🚀 Starting server with CORS...');

// Connect to MongoDB
DBConnetct();

const app = express();

// ✅ EMERGENCY CORS FIX - Allow everything
app.use(cors({
  origin: true, // Allow ALL origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Cookie']
}));

// Handle preflight requests
app.options('*', cors());

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Log all requests for debugging
app.use((req, res, next) => {
  console.log(`📨 ${new Date().toISOString()} - ${req.method} ${req.originalUrl} - Origin: ${req.headers.origin}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running with CORS',
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
    message: 'PrivetSchool API is running with CORS enabled',
    health: '/health'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`✅ CORS enabled for ALL origins`);
});