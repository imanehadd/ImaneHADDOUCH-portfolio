# Deployment & Email Setup

This document explains how to configure Gmail API and deploy the portfolio so that the contact form actually sends emails to your Gmail address `imanehaddouch06@gmail.com`.

1) Créez un projet Google Cloud Console
   - Allez sur https://console.cloud.google.com/
   - Activez l'API Gmail pour le projet.
   - Créez des identifiants OAuth2 (Client ID et Client Secret) pour une application de type "Desktop".

2) Générez le refresh token OAuth2
   - Placez les identifiants dans vos variables d'environnement :
     - GMAIL_CLIENT_ID
     - GMAIL_CLIENT_SECRET
   - Exécutez le script :
     ```bash
     node server/gmailGetRefreshToken.js
     ```
   - Suivez les instructions pour autoriser l'application et copiez le refresh token généré dans :
     - GMAIL_REFRESH_TOKEN

3) Configurez les variables d'environnement pour le handler serverless
   - GMAIL_CLIENT_ID : votre client ID Google
   - GMAIL_CLIENT_SECRET : votre client secret Google
   - GMAIL_REFRESH_TOKEN : le refresh token généré
   - GMAIL_FROM : l'adresse Gmail expéditrice (ex : imanehaddouch06@gmail.com)
   - GMAIL_TO : l'adresse Gmail destinataire (ex : imanehaddouch06@gmail.com)

Exemple (Vercel environment variables) :
  - Key: GMAIL_CLIENT_ID
    Value: xxxxx.apps.googleusercontent.com
  - Key: GMAIL_CLIENT_SECRET
    Value: xxxxx
  - Key: GMAIL_REFRESH_TOKEN
    Value: xxxxx
  - Key: GMAIL_FROM
    Value: imanehaddouch06@gmail.com
  - Key: GMAIL_TO
    Value: imanehaddouch06@gmail.com

4) Déployez sur Vercel (recommandé)
   - Installez Vercel CLI (optionnel) ou utilisez le dashboard web.
   - Depuis la racine du projet :
     ```bash
     vercel login
     vercel --prod
     ```
   - Ajoutez les variables d'environnement listées ci-dessus dans les paramètres du projet Vercel.

5) Testez le formulaire
   - Ouvrez le site déployé, remplissez le formulaire de contact et soumettez. Vous devriez recevoir un email sur l'adresse configurée dans GMAIL_TO.

6) Test local
   - Installez les dépendances : `npm install`
   - Lancez le test unitaire : `npm test` (pour le helper MIME Gmail)

Notes de sécurité
   - Ne commitez jamais vos identifiants OAuth2 ou refresh token dans le code source.
   - Utilisez la gestion des variables d'environnement de Vercel/Netlify ou des secrets dans votre hébergeur.

Quotas et limites Gmail
   - Les comptes Gmail gratuits ont des limites d'envoi (quelques centaines/jour). Google peut bloquer l'envoi en cas d'abus.
   - Pour des volumes plus importants, utilisez Google Workspace (G Suite) ou un provider transactionnel.

Si vous préférez, je peux configurer Formspree (sans serveur) — dites-moi si vous voulez cette option plus rapide.
