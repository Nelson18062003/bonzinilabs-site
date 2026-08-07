# BONZINILABS LTD — site vitrine

Site statique de **BONZINILABS LTD**, société immatriculée en Angleterre et au Pays de Galles,
qui développe des agents IA sur mesure, des chatbots, des intégrations WhatsApp Business et des
automatisations de processus pour des clients professionnels.

Le site a deux fonctions : présenter l'offre, et permettre la **vérification du compte Stripe**
de la société. Cette seconde contrainte explique plusieurs choix de conception documentés
ci-dessous.

**Déploiement : voir [`DEPLOY.md`](DEPLOY.md).**

---

## Contenu du dépôt

```
index.html            page unique : hero, services, méthode, modalités, à propos, contact
terms.html            conditions générales
refunds.html          remboursements, annulation et livraison
privacy.html          politique de confidentialité (RGPD-UK)
404.html              page d'erreur (liée aux vraies pages, pas la page par défaut de l'hébergeur)
assets/css/style.css  feuille de style unique
assets/js/main.js     menu mobile, bascule EN/FR, formulaire, année
assets/fonts/         Inter Variable, sous-ensemble latin, auto-hébergé (48 Ko)
assets/img/           marque, favicon, image de partage
tools/build-images.mjs génère og-image.png, apple-touch-icon.png et favicon.ico
robots.txt sitemap.xml netlify.toml vercel.json .vercelignore favicon.ico
```

Aucune dépendance, aucun build, aucune requête vers un tiers. Ouvrir `index.html` dans un
navigateur suffit ; pour un aperçu propre : `npx http-server -p 8123 .`

---

## Choix techniques

- **HTML/CSS/JS natifs.** Le site se déploie tel quel sur Vercel (cible retenue), Netlify,
  IONOS ou n'importe quel hébergement de fichiers. `vercel.json` fixe déjà preset « Other »,
  absence de build, racine servie telle quelle, en-têtes de sécurité et de cache — il n'y a
  aucun réglage à saisir à l'import. Il est validé contre le schéma publié par Vercel.
- **Aucune requête tierce.** La police Inter est auto-hébergée (48 Ko, préchargée) avec une
  police de repli aux métriques ajustées, donc pas de décalage au chargement. Pas de CDN, pas
  d'analytics, pas de cookies.
- **Tout le contenu est dans le document.** Il n'y a délibérément aucune animation
  d'apparition au défilement : un contenu qui dépend d'un script pour devenir visible est un
  contenu qu'un robot d'indexation ou un examinateur peut manquer. Avec JavaScript désactivé,
  la page reste complète et lisible.
- **Bilingue EN/FR.** L'anglais vit dans le HTML, le français dans un dictionnaire au sein de
  `main.js`. La bascule met à jour les textes, l'attribut `lang`, le `<title>` et la
  description. Le choix est mémorisé dans le navigateur (localStorage), ce qui est déclaré
  dans la politique de confidentialité. Les pages légales sont en anglais, langue de référence
  des contrats de la société.
- **Formulaire sans serveur.** Il compose un e-mail pré-rempli dans l'application du visiteur.
  Rien n'est envoyé ni stocké. L'adresse e-mail est **aussi affichée en clair** : Stripe
  demande explicitement un moyen de contact autre qu'un formulaire.
- **Accessibilité vérifiée au test, pas à l'œil.** Chaque contraste a été mesuré
  sur le rendu réel : 18,3:1 pour les titres, 8,5:1 pour le texte, 5,9:1 au plus
  bas, et 3,1:1 minimum pour la bordure des champs — seul élément qui signale un
  contrôle, donc soumise au seuil de 3:1. Le lien d'évitement déplace réellement
  le focus, le menu mobile rend le focus au bouton quand il se ferme, et une
  erreur de formulaire est reliée au champ concerné par `aria-invalid` et
  `aria-describedby`. Rien n'est coupé jusqu'à 320 px (zoom 400 %).
- **Design system strict.** Grille d'espacement de 8 px, huit rôles typographiques fluides en
  `clamp()`, cinq rayons autorisés, points de rupture à 480/640/768/900/1024. Aucune valeur
  hors de ces échelles, à l'exception documentée des cotes imposées par ailleurs (cible
  tactile de 44 px, barre de 56/64 px).

## Régénérer les images

```sh
node tools/build-images.mjs
```

Rasterise `assets/img/og-image.png` (1200×630), `assets/img/apple-touch-icon.png` et
`favicon.ico` avec Chromium, ce qui rend la typographie Inter exactement comme sur le site.
Nécessite Playwright. Les fichiers produits sont versionnés : à relancer uniquement si la
charte change. Le SVG n'est pas utilisé comme `og:image` : aucun robot social majeur ne le
rend.

## Conformité Stripe

Le site répond aux exigences de la
[FAQ Stripe sur le site d'entreprise](https://support.stripe.com/questions/business-website-for-account-activation-faq)
et de la [checklist de la documentation](https://docs.stripe.com/get-started/checklist/website) :

- accessible publiquement, sans mot de passe, sans page de connexion, sans « coming soon » ;
- raison sociale **BONZINILABS LTD** dans le `<title>`, le hero, les informations de société
  et le pied de page de chaque page ;
- description explicite des prestations vendues et de la clientèle visée (entreprises) ;
- e-mail en clair, adresse postale complète, horaires et délai de réponse ;
- modèle commercial et **devise en toutes lettres** (GBP (£) ou EUR (€)) ;
- politiques de remboursement, d'annulation, de livraison et de confidentialité, plus les
  conditions générales, liées depuis la page d'accueil ;
- `robots.txt` ouvert, aucune balise `noindex`, données structurées `Organization` ;
- en-têtes HSTS et CSP, et les fichiers de développement (`README`, `DEPLOY`, `tools/`,
  `netlify.toml`) ne sont pas publiés sur le domaine — `.vercelignore` côté Vercel, règles 404
  côté Netlify.

**À compléter par le dirigeant** (jamais inventé dans le code) : le numéro d'immatriculation
de la société, un numéro de téléphone, le numéro de TVA le cas échéant, et une boîte mail
opérationnelle sur le domaine. Voir la section 9 de `DEPLOY.md`.
