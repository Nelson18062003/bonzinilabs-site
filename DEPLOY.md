# Mettre le site BONZINILABS LTD en ligne sur Vercel

Objectif : obtenir une **adresse web publique**, qui s'ouvre **sans mot de passe et sans
connexion**, à coller dans le champ « Business website » de Stripe.

Le site est statique : `index.html`, trois pages légales, une page 404 et un dossier `assets/`.
Rien à compiler, aucune base de données, aucun serveur. Le fichier `vercel.json` du dépôt règle
déjà tout : preset « Other », aucune commande de build, racine du dépôt servie telle quelle,
en-têtes de sécurité et de cache. **Vous n'aurez aucun réglage de build à saisir.**

> **Une note factuelle, une seule fois.** Les conditions de Vercel disent :
> *« Hobby teams are restricted to non-commercial personal use only. All commercial usage of the
> platform requires either a Pro or Enterprise plan »*, et la liste des usages commerciaux inclut
> explicitement « **advertising the sale of a product or service** ». Ce site fait la promotion de
> prestations vendues. Le plan **Pro** est à 20 $ par utilisateur et par mois. C'est votre
> décision ; la section 8 garde Netlify en solution de repli si vous changez d'avis.

---

## 1. La branche de production : rien à faire

Quand Vercel importe un dépôt, il choisit la branche de production dans cet ordre : `main`,
sinon `master`, sinon la branche par défaut.

Ce dépôt **n'a qu'une seule branche, `main`**, et elle contient le site BONZINILABS LTD.
Vercel la prendra donc automatiquement en production à l'import : aucune fusion, aucun
changement de branche, aucun réglage de **Branch Tracking** à faire. Vos futures modifications
poussées sur `main` partiront elles aussi directement en production.

Passez directement à la section 2.

---

## 2. Importer le dépôt dans Vercel

1. Ouvrez `https://vercel.com` → **Sign Up** (ou **Log In**).
2. Cliquez **Continue with GitHub** et connectez-vous avec le compte `Nelson18062003`.
3. Cliquez **Authorize Vercel**.
4. Sur le tableau de bord, cliquez **Add New…** → **Project**.
5. Trouvez `bonzinilabs-site` et cliquez **Import**.
   *Si le dépôt n'apparaît pas :* **Adjust GitHub App Permissions**, cochez le dépôt,
   enregistrez, revenez en arrière.
6. Dans **Project Name**, effacez ce qui est proposé et tapez : `bonzinilabs`.
7. **Framework Preset**, **Build Command**, **Output Directory**, **Install Command** :
   **n'y touchez pas**. `vercel.json` les impose déjà. Si l'interface affiche une valeur, laissez
   la case *Override* décochée.
8. **Root Directory** : laissez `./`.
9. **Environment Variables** : aucune.
10. Cliquez **Deploy** et attendez environ une minute.

Le dépôt est public et appartient à un compte personnel : aucune restriction de déploiement ne
s'applique.

---

## 3. Production ou preview — la distinction qui décide de tout

Sur le plan Hobby, Vercel propose **Vercel Authentication** avec la portée **Standard
Protection**, qui protège tous les déploiements **sauf les domaines de production**. Autrement
dit : **une adresse preview affiche un écran de connexion, la production reste publique.**
Protéger aussi la production (« All Deployments ») n'existe que sur Pro et Enterprise.

Conclusion pratique : **ne donnez jamais une adresse preview à Stripe.**

- **Adresse de production** — nom court et propre : `bonzinilabs.vercel.app`. C'est celle
  affichée dans le cadre **Domains** de la page du projet.
- **Adresse preview** — contient un identifiant aléatoire ou le nom d'une autre branche :
  `bonzinilabs-git-xxxx.vercel.app`. Dans l'onglet **Deployments**, la ligne porte l'étiquette
  **Preview** et non **Production**.

Vérifiez quand même le réglage : projet → **Settings** → **Deployment Protection**. La portée
doit être **Standard Protection** ou **None**, jamais **All Deployments**. Une équipe peut avoir
un réglage par défaut appliqué aux nouveaux projets — c'est le cas à contrôler.

---

## 4. Une adresse propre

Si vous n'avez pas nommé le projet `bonzinilabs` à l'étape 2.6 : **Settings** → **General** →
champ **Project Name** → `bonzinilabs` → **Save**.

Faites-le **avant** de coller l'adresse dans Stripe : Vercel ne garantit pas que l'ancienne
adresse reste accessible après un renommage.

---

## 5. Vérification obligatoire avant de coller l'adresse dans Stripe

Stripe l'écrit noir sur blanc : *« The webpage must be accessible without a password. »*

1. **Fenêtre de navigation privée** (`Ctrl+Maj+N`) : collez l'adresse de production. Le site doit
   s'afficher immédiatement, sans écran de connexion.
2. **Téléphone, Wi-Fi coupé** (données mobiles) : la même adresse doit s'ouvrir. Ce test prouve
   qu'aucun cookie de votre ordinateur ne masque une protection.
3. L'onglet du navigateur doit afficher
   **« BONZINILABS LTD — AI Automation & AI Agents for Business »**.
4. `Ctrl+F` sur la page : vérifiez `BONZINILABS LTD`, `71-75 Shelton Street`, `England & Wales`,
   `contact@bonzinilabs.com`, `GBP`.
5. Tapez à la main dans la barre d'adresse : `/terms.html`, `/refunds.html`, `/privacy.html`.
   Aucune erreur 404. Tapez aussi `/nimportequoi` : vous devez voir la page 404 du site, pas
   celle de Vercel.
6. `F12` → onglet **Network** → `Ctrl+R` : aucune ligne rouge.
7. Envoyez un e-mail de test à `contact@bonzinilabs.com` depuis une autre adresse et
   **vérifiez qu'il arrive**. Une adresse qui rebondit est une cause de refus invisible.
8. Confirmez que l'adresse est bien celle de **production** (section 3), puis collez-la dans
   Stripe avec `https://`.
9. **Ne remettez aucune protection après l'activation.** Stripe exige que le site reste
   accessible en permanence et le revérifie régulièrement.

---

## 6. Brancher le sous-domaine `agency.bonzinilabs.com`

Le domaine `bonzinilabs.com` a été **acheté directement chez Vercel** : Vercel gère déjà ses
serveurs de noms. Il n'y a donc **aucun registrar externe à configurer** — tout se passe dans le
tableau de bord Vercel, et le domaine racine peut continuer à servir un autre site : un
sous-domaine est indépendant et gratuit.

1. Projet → **Settings** → **Domains** → **Add Domain**.
2. Tapez `agency.bonzinilabs.com` et validez.
3. C'est tout : le domaine étant géré par Vercel, l'enregistrement DNS et le certificat HTTPS
   sont créés automatiquement, en général en une à deux minutes.
4. Vérifiez que la ligne `agency.bonzinilabs.com` du cadre **Domains** affiche
   **Valid Configuration**, puis ouvrez `https://agency.bonzinilabs.com` en navigation privée.
5. Une fois le domaine actif, remplacez l'adresse `.vercel.app` par
   `https://agency.bonzinilabs.com` dans Stripe.

### Recevoir le courrier sur `contact@bonzinilabs.com`

Vercel vend des domaines mais **ne fournit aucun service e-mail** : sans configuration, un
message envoyé à `contact@bonzinilabs.com` **rebondit**. C'est une cause de refus invisible,
pour Stripe comme pour la vérification d'entreprise Meta (qui envoie son code à une adresse
sur le domaine — une adresse Gmail est refusée).

Redirection gratuite via ImprovMX :

1. Créez un compte sur `https://improvmx.com` (plan gratuit) et ajoutez le domaine
   `bonzinilabs.com`.
2. Configurez la redirection `contact@bonzinilabs.com` → votre boîte personnelle.
3. Dans Vercel : tableau de bord → **Domains** → `bonzinilabs.com` → **DNS Records** →
   ajoutez les enregistrements **MX** (et le **TXT** SPF) indiqués par ImprovMX. Vercel propose
   des **DNS Presets** qui préremplissent ces valeurs pour les services courants.
4. Testez : envoyez un e-mail depuis une autre adresse et **vérifiez qu'il arrive**.

### Vérification du domaine chez Meta

Dans le Business Manager, vérifiez le **domaine racine** `bonzinilabs.com` (sans `www` ni
`https://`) : cette vérification couvre automatiquement tous les sous-domaines, dont
`agency.bonzinilabs.com`. Méthode la plus simple : Meta fournit un enregistrement **TXT** à
ajouter dans Vercel → **Domains** → `bonzinilabs.com` → **DNS Records**. Pour la vérification
d'entreprise, donnez l'adresse `contact@bonzinilabs.com` (le domaine racine correspond au site,
c'est la configuration attendue).

---

## 7. Modifier le site plus tard

- Chaque `git push` sur `main` redéclenche un déploiement en 30 à 60 secondes.
  Vous pouvez aussi éditer un fichier directement sur GitHub (crayon **Edit** → **Commit
  changes**).
- Forcer un redéploiement : onglet **Deployments** → menu **⋯** sur la ligne la plus récente →
  **Redeploy** → confirmer.
- Les fichiers `README.md`, `DEPLOY.md`, `tools/` et `netlify.toml` sont listés dans
  `.vercelignore` : ils restent dans le dépôt mais ne sont jamais publiés sur le domaine.

---

## 8. Solutions de repli

### Netlify (gratuit, usage commercial autorisé)

Le plan gratuit de Netlify autorise les sites commerciaux ; seule la revente d'hébergement est
interdite. Le dépôt contient déjà `netlify.toml`.

1. `app.netlify.com` → **Add new project** → **Import an existing project** → **GitHub**.
2. Choisissez `bonzinilabs-site`, **Branch to deploy** : `main`.
3. **Build command** vide, **Publish directory** `.` — `netlify.toml` s'en charge.
4. **Rendez le site public** : **Project configuration** → **General** → **Visitor access** →
   **Project visibility** → **Public**. Depuis le 28 juillet 2026, les nouvelles équipes
   démarrent en « Private » et le site est alors derrière une connexion.

### Hébergement classique IONOS

1. `my.ionos.fr` → **Hébergement** → **FTP/SFTP**, créez le mot de passe.
2. Connectez-vous avec **FileZilla** en **SFTP** (port 22).
3. La racine web est `/` (chemin absolu du type `/kunden/homepages/…/htdocs/`, ou `/home/www/`
   pour les contrats à partir du 21/07/2026).
4. Déposez `index.html`, `terms.html`, `privacy.html`, `refunds.html`, `404.html`, `favicon.ico`,
   `robots.txt`, `sitemap.xml` et le dossier `assets/`. Ne déposez pas `tools/`, `README.md` ni
   `DEPLOY.md`.
5. `index.html` doit être **à la racine liée au domaine**, jamais dans un sous-dossier.
6. Supprimez toute page « en construction » d'IONOS qui prendrait le dessus.

---

## 9. À compléter dès que vous avez l'information

Rien de tout cela n'est inventé dans le code — un numéro fictif serait pire qu'une absence.

| Élément | Où | Pourquoi |
|---|---|---|
| Numéro d'immatriculation (company number) | `index.html`, bloc « Company details » (un commentaire marque l'endroit exact) et pied de page des quatre pages | Obligatoire sur le site d'une société britannique (Companies Act 2006), et c'est le champ qui permet à Stripe de rapprocher le site de l'entité déclarée |
| Numéro de téléphone | section Contact | Stripe demande « something besides contact forms » et cite le téléphone |
| Numéro de TVA | pied de page | Uniquement si la société est assujettie |
| Boîte `contact@bonzinilabs.com` opérationnelle | redirection ImprovMX + enregistrements MX dans les DNS Vercel (section 6) | Une adresse qui rebondit fait échouer la vérification sans explication |

Pour changer l'adresse e-mail partout d'un coup :

```sh
grep -rl 'contact@bonzinilabs.com' . --exclude-dir=.git \
  | xargs sed -i 's/contact@bonzinilabs\.com/votre@adresse.com/g'
```
