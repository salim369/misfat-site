const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ SERVE STATIC (video fix included)
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.mp4')) {
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Accept-Ranges', 'bytes');
    }
  }
}));

// ✅ ROUTE DEVIS
app.post('/api/devis', (req, res) => {
  const { name, email, company, phone, country, refs, message } = req.body || {};

  if (!name || !email || !refs) {
    return res.status(400).json({ error: 'Champs obligatoires manquants.' });
  }

  console.log('=== NOUVELLE DEMANDE DE DEVIS ===');
  console.log('Nom      :', name);
  console.log('Email    :', email);
  console.log('Société  :', company || '—');
  console.log('Téléphone:', phone || '—');
  console.log('Pays     :', country || '—');
  console.log('Références:', refs);
  console.log('Message  :', message || '—');
  console.log('Date     :', new Date().toISOString());
  console.log('=================================');

  res.json({ success: true });
});

// ✅ DEFAULT ROUTE
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
