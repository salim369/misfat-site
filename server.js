const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// TEST ROUTE (باش نتأكدو يخدم)
app.get('/test', (req, res) => {
  res.send('Server is working ✅');
});

// FORM ROUTE
app.post('/api/devis', (req, res) => {
  console.log('Devis reçu:', req.body);
  res.json({ success: true });
});

// DEFAULT
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
