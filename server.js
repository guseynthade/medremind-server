const express = require('express');
const cors = require('cors');

const app = express();

// CORS təhlükəsiz şəkildə frontend-dən gələn sorğulara icazə verir
app.use(cors({
  origin: "https://medremind-app.vercel.app", // Təhlükəsiz mənbə
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// Sadə storage (gələcəkdə Firebase olacaq)
let meds = [];

// Dərman əlavə et
app.post('/api/meds', (req, res) => {
  const med = req.body;
  meds.push(med);
  console.log("Yeni dərman əlavə edildi:", med);
  res.json({ success: true });
});

// Dərmanları istifadəçi ID-ə görə götür
app.get('/api/meds/:userId', (req, res) => {
  const userMeds = meds.filter(m => m.userId === req.params.userId);
  res.json(userMeds);
});

// Test üçün kök endpoint
app.get('/', (req, res) => {
  res.send(`
    <h1>💊 MedRemind Server</h1>
    <p>Backend uğurla işləyir!</p>
    <p><a href="/api/meds/test123">Test məlumatları gör</a></p>
  `);
});

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server ${PORT} portunda başladı`);
  console.log(`🔗 İstifadə: https://medremind-server.onrender.com`);
});
