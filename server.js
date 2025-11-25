require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const DBConnetct = require('./config/DBConnetct');
const { default: helmet } = require('helmet');

console.log('🚀 Starting server...');

// Connect to MongoDB
DBConnetct();

const app = express();

// ✅ ENHANCED CORS CONFIGURATION
const allowedOrigins = [
  'https://privetschool-front.ohbjmh.easypanel.host',
  'http://localhost:3000',
  'https://57.131.24.227'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('🚫 Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Cookie'],
  optionsSuccessStatus: 200
}));

// Handle preflight requests for all routes
app.options('*', cors());

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
});

// Serve uploads
app.use('/uploads', express.static('uploads'));

// Security middleware
app.use(helmet());

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
    message: 'PrivetSchool API is running',
    health: '/health'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`✅ CORS enabled for:`, allowedOrigins);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('🔄 Received SIGTERM, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});