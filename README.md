# MISFAT Full Admin CMS

## Ce que fait cette version
- tu peux modifier presque tout depuis l'admin
- nom de marque
- logo texte ou image URL
- couleurs principales
- hero
- pages du menu
- contenu des pages
- partenaires
- contact
- produits

## Important
Les modifications sont enregistrées dans `data/site.json`.
Donc elles deviennent visibles depuis un autre navigateur dès que le site recharge les données du serveur.

## Lancer le projet
```bash
cd misfat-full-admin-cms
node server.js
```

Puis ouvre:
- http://localhost:3000

## Connexion admin
- admin@misfat.tn
- admin123

## Pour que ça marche sur un autre navigateur
Il faut que les deux navigateurs ouvrent le même serveur.
Exemple:
- même PC: `http://localhost:3000`
- autre appareil sur le même réseau: `http://ADRESSE_IP_DU_PC:3000`

## Limite honnête
Ce projet est un CMS local simple avec fichier JSON.
Pour un vrai site en production avec comptes sécurisés, upload d'images, rôles et base de données, il faudrait une vraie app full-stack avec base SQL ou MongoDB.
