// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let mongoServer;

// Connect to MongoDB (use in-memory database for development)
if (process.env.NODE_ENV === 'production') {
    mongoose.connect('your_mongodb_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });
} else {
    mongoServer = new MongoMemoryServer();
    mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });
}

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// MongoDB User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

// MongoDB Profile Schema
const profileSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    historyPreferences: { type: [String] }
});

const User = mongoose.model('User', userSchema);
const Profile = mongoose.model('Profile', profileSchema);

// JWT Secret Key (replace 'your_secret_key' with your actual secret key)
const secretKey = 'your_secret_key';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.log(err)
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

// Routes

// Register a new user
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).send('User registered successfully.');
    } catch (error) {
        res.status(500).send('Error registering user.');
    }
});

// Login and generate JWT token
app.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send('Invalid username or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid username or password.');

    const token = jwt.sign({ username: user.username }, secretKey);
    res.json({ token });
});

// Protected route - requires JWT authentication
app.get('/protected', authenticateToken, (req, res) => {
    res.json(req.user);
});

// Protected route - create profile
app.post('/profile', authenticateToken, async (req, res) => {
    try {
        const profile = new Profile({
            user: req.user,
            historyPreferences: JSON.parse(req.body.historyPreferences)
        });

        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error creating profile.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});