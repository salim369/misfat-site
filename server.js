const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 10000;

const dataDir = path.join(__dirname, 'data');
const sitePath = path.join(dataDir, 'site.json');
const defaultPath = path.join(dataDir, 'site.default.json');

// middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ensure data folder exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// ✅ GET SITE DATA
app.get('/api/site-data', (req, res) => {
  try {
    if (fs.existsSync(sitePath)) {
      const data = fs.readFileSync(sitePath, 'utf8');
      return res.json(JSON.parse(data));
    }

    if (fs.existsSync(defaultPath)) {
      const data = fs.readFileSync(defaultPath, 'utf8');
      fs.writeFileSync(sitePath, data);
      return res.json(JSON.parse(data));
    }

    return res.status(404).json({ error: 'site.json not found' });
  } catch (err) {
    console.error('GET /api/site-data error:', err);
    res.status(500).json({ error: 'Failed to read site data' });
  }
});

// ✅ SAVE SITE DATA
app.post('/api/site-data', (req, res) => {
  try {
    fs.writeFileSync(sitePath, JSON.stringify(req.body, null, 2), 'utf8');
    res.json({ success: true });
  } catch (err) {
    console.error('POST /api/site-data error:', err);
    res.status(500).json({ error: 'Failed to save site data' });
  }
});

// ✅ RESET SITE DATA
app.post('/api/reset', (req, res) => {
  try {
    if (!fs.existsSync(defaultPath)) {
      return res.status(404).json({ error: 'site.default.json not found' });
    }

    const data = fs.readFileSync(defaultPath, 'utf8');
    fs.writeFileSync(sitePath, data, 'utf8');

    res.json({ success: true });
  } catch (err) {
    console.error('POST /api/reset error:', err);
    res.status(500).json({ error: 'Failed to reset site data' });
  }
});

// ✅ SERVE STATIC
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
