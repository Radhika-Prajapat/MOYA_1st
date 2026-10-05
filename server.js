const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors()); // Frontend se request accept karne ke liye

const PORT = 3000;

// Login Route jahan password check hoga
app.post('/api/login', (req, res) => {
    const { password } = req.body;
    
    // Server .env file se password match karega
    if (password === process.env.CORRECT_PASSWORD) {
        res.json({ success: true, message: "Login successful!" });
    } else {
        res.status(401).json({ success: false, message: "Incorrect password!" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});