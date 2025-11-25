require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const DBConnect = require('./config/DBConnetct');

console.log('🚀 Starting server...');

// Connect to MongoDB
DBConnect();

const app = express();

// ✅ CORS CONFIGURATION
app.use(cors({
  origin: process.env.CLIENT_URL || 'https://privetschool-front.ohbjmh.easypanel.host',
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','X-Requested-With','Cookie'],
  credentials: true
}));

// ✅ Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// ✅ Routes
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

// ✅ Catch-all for OPTIONS requests (preflight)
app.options('*', (req, res) => {
  res.sendStatus(200);
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ CORS enabled for: ${process.env.CLIENT_URL}`);
});
