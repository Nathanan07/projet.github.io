# Brawlhalla — site de présentation

Projet statique versionné avec Git et publié sur GitHub Pages.

## Pages

| Fichier | Contenu |
|---|---|
| `index.html` | Le principe du jeu, démo interactive du ring-out, carte d'identité |
| `legendes.html` | Les légendes, filtre par arme, tableau des armes |
| `competition.html` | Modes de jeu, commandes, progression, scène e-sport |

## Structure

    .
    ├── index.html
    ├── legendes.html
    ├── competition.html
    ├── style.css
    ├── script.js
    └── README.md

Aucune dépendance à installer : ouvrez `index.html` dans un navigateur.
Seules les polices viennent de Google Fonts.

## Publier sur GitHub Pages

    git add .
    git commit -m "Refonte du site"
    git push

Puis dans le dépôt : Settings → Pages → Source : branche `main`, dossier `/ (root)`.

## Formulaire de contact

GitHub Pages ne sert que des fichiers statiques, donc aucun envoi côté serveur.
Pour recevoir les messages, branchez un service externe (Formspree, Netlify Forms)
sur l'attribut `action` du formulaire dans `index.html`.

## Note

Site non officiel, réalisé à but pédagogique. Sans lien avec Blue Mammoth Games ni Ubisoft.
