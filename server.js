const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// ✅ ROUTE DEVIS (يخدم 100%)
app.post('/api/devis', (req, res) => {
  try {
    const {
      prenom,
      nom,
      email,
      telephone,
      entreprise,
      pays,
      objet,
      message
    } = req.body || {};

    if (!prenom || !nom || !email) {
      return res.status(400).json({
        success: false,
        message: 'Champs obligatoires manquants.'
      });
    }

    console.log('=== NOUVELLE DEMANDE DE DEVIS ===');
    console.log('Prénom   :', prenom);
    console.log('Nom      :', nom);
    console.log('Email    :', email);
    console.log('Entreprise:', entreprise || '—');
    console.log('Téléphone:', telephone || '—');
    console.log('Pays     :', pays || '—');
    console.log('Objet    :', objet || '—');
    console.log('Message  :', message || '—');
    console.log('Date     :', new Date().toISOString());
    console.log('=================================');

    res.json({
      success: true,
      message: 'Votre demande a été envoyée avec succès.'
    });

  } catch (error) {
    console.error('Erreur serveur:', error);

    res.status(500).json({
      success: false,
      message: 'Erreur serveur.'
    });
  }
});

// Catch-all → يرجّع index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
