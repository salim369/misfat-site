app.post('/api/devis', (req, res) => {
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
    return res.status(400).json({ error: 'Champs obligatoires manquants.' });
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

  res.json({ success: true });
});
