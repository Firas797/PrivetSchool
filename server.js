require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const DBConnetct = require('./config/DBConnetct');
const { default: helmet } = require('helmet');

// Connect to MongoDB
DBConnetct();

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: 'https://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    })
);

// Routes
app.get('/', (req, res) => {
    res.json({ msg: 'Welcome Firas' });
});
app.use('/user', require('./routes/userRoutes'));
app.use('/api', require('./routes/coursesRouter'));
app.use('/api', require('./routes/HomeWorkRoutes'));
app.use('/teachers', require('./routes/teacherRoutes'));

// ✅ Add Quiz Routes
app.use('/api/quizzes', require('./routes/quizRoutes'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
