/* =============================================================================
   BONZINILABS LTD — site behaviour
   Mobile navigation · EN/FR switching · contact form · current year.
   No dependencies, no analytics, no network calls, no cookies.
   The page is fully readable and usable with JavaScript disabled.
   ============================================================================= */

(function () {
  "use strict";

  var CONTACT_EMAIL = "contact@bonzinilabs.com";
  var STORAGE_KEY = "bzl.lang";
  var NBSP = " "; /* French typography: no-break space before : ; ! ? */

  /* ---------------------------------------------------------------------------
     1. FRENCH DICTIONARY
     English lives in the HTML and is captured at load, so it is never duplicated
     here and can never drift out of sync.
     ------------------------------------------------------------------------ */

  var FR = {
    "skip": "Aller au contenu",

    "nav.services": "Services",
    "nav.process": "Notre méthode",
    "nav.engagement": "Modalités",
    "nav.about": "À propos",
    "nav.contact": "Contact",

    "hero.eyebrow": "Éditeur de logiciels IA au Royaume-Uni",
    "hero.title1": "Répondez à chaque client,",
    "hero.title2": "sans recruter.",
    "hero.sub":
      "BONZINILABS LTD conçoit des agents IA sur mesure, des chatbots et des automatisations WhatsApp pour les PME d’Europe et d’Afrique qui veulent répondre plus vite sans agrandir leur équipe.",
    "cta.contact": "Demander une proposition",
    "cta.services": "Voir ce que nous réalisons",

    "proof.1": "Société immatriculée au Royaume-Uni",
    "proof.2": "Prestations B2B uniquement",
    "proof.3": "Anglais et français",
    "proof.4": "Missions à distance",

    "services.label": "Services",
    "services.title": "Ce que nous concevons pour nos clients",
    "services.intro":
      "Quatre offres, vendues au projet ou sous forme de forfait mensuel. Chacune part d’un processus que vous exécutez déjà et aboutit à un logiciel utilisé chaque jour par vos équipes.",

    "svc1.title": "Agents IA sur mesure",
    "svc1.body":
      "Nous concevons un assistant qui lit vos documents, répond aux questions de vos équipes et met à jour vos outils, pour traiter les demandes courantes sans interrompre personne.",
    "svc1.li1": "Entraîné sur vos propres documents",
    "svc1.li2": "Agit directement dans vos outils",
    "svc1.li3": "Passe le relais à un humain",

    "svc2.title": "Chatbots intelligents",
    "svc2.body":
      "Un assistant de support et de vente sur votre site et vos messageries, qui répond aux questions courantes 24h/24 et transmet les vraies opportunités à votre équipe.",
    "svc2.li1": "Réponses issues de vos contenus",
    "svc2.li2": "Fonctionne en plusieurs langues",
    "svc2.li3": "Se connecte à votre CRM ou service client",

    "svc3.title": "Automatisation WhatsApp Business",
    "svc3.body":
      "Nous mettons en place la plateforme WhatsApp Business (Cloud API)" + NBSP +
      ": suivi de commande, rappels de rendez-vous et relances de paiement envoyés automatiquement, sur le canal que vos clients ouvrent déjà.",
    "svc3.li1": "Configuration Cloud API et modèles",
    "svc3.li2": "Scénarios automatisés avec réponses IA",
    "svc3.li3": "Boîte de réception partagée pour votre équipe",

    "svc4.title": "Automatisation des processus",
    "svc4.body":
      "Nous relions les systèmes entre lesquels vos équipes ressaisissent des données — commandes, devis, factures, tableurs, CRM — pour que le relais se fasse seul, sans attendre dans une boîte de réception.",
    "svc4.li1": "Cartographie de votre processus actuel",
    "svc4.li2": "Développement des intégrations entre outils",
    "svc4.li3": "Supervision et corrections après lancement",

    "process.label": "Notre méthode",
    "process.title": "Du premier échange au système en production",
    "step1.title": "Cadrage chiffré",
    "step1.body":
      "Nous analysons le processus, les outils et les volumes concernés, puis nous envoyons une proposition écrite avec un périmètre défini, un prix ferme et une date de livraison.",
    "step2.title": "Développement itératif",
    "step2.body":
      "Nous développons par cycles courts et vous montrons une version fonctionnelle à chaque étape, afin que vous testiez le système sur vos données avant la mise en ligne.",
    "step3.title": "Lancement accompagné",
    "step3.body":
      "Nous déployons le système, formons les personnes qui l’utilisent et restons disponibles ensuite" + NBSP +
      ": supervision, évolutions et améliorations sont assurées par un forfait mensuel.",

    "pricing.label": "Modalités",
    "pricing.title": "Comment nous cadrons et facturons",
    "pricing.body":
      "Chaque projet est chiffré individuellement. Après un échange de cadrage, nous remettons une proposition écrite avec un périmètre et un prix fermes, ou un forfait mensuel de support et d’évolutions" + NBSP +
      "; les travaux démarrent dès l’acceptation de la proposition. Les factures sont émises par BONZINILABS LTD en GBP ou en EUR et réglées par virement bancaire ou par carte.",
    "pricing.note":
      "Nous vendons uniquement des prestations de services à des entreprises. Nous ne vendons ni produits physiques, ni téléchargements, ni abonnements grand public en libre-service.",
    "pricing.secure":
      "Les paiements par carte sont traités par notre prestataire de paiement. BONZINILABS LTD ne voit ni ne conserve vos coordonnées bancaires complètes.",
    "pricing.restrictions":
      "Nous ne fournissons aucune prestation à des personnes ou entités visées par des sanctions du Royaume-Uni, de l’Union européenne, des États-Unis ou de l’ONU, et nous ne livrons pas nos logiciels dans les juridictions sous sanctions.",
    "pricing.facts": "Conditions commerciales",
    "pricing.t1": "Ce que nous vendons",
    "pricing.v1":
      "Prestations de développement logiciel et d’automatisation pour les entreprises",
    "pricing.t2": "Modèle tarifaire",
    "pricing.v2": "Projets à prix ferme, ou forfait mensuel de support",
    "pricing.t3": "Devise",
    "pricing.v3": "GBP (£) ou EUR (€)",
    "aria.home": "BONZINILABS LTD — accueil",
    "aria.nav": "Navigation principale",
    "aria.footerCompany": "Société",
    "aria.footerLegal": "Informations légales",
    "pricing.t4": "Moyens de paiement",
    "pricing.v4": "Virement bancaire ou carte, sur facture",
    "pricing.t5": "Politiques",
    "pricing.v5a": "Remboursements et annulation",
    "pricing.v5b": "Conditions générales",
    "pricing.v5c": "Confidentialité",

    "about.label": "À propos",
    "about.title": "Une société technologique britannique dédiée à l’IA appliquée",
    "about.p1":
      "BONZINILABS LTD est une société technologique immatriculée en Angleterre et au Pays de Galles, dont le siège social est établi à Londres. Nous sommes spécialisés dans l’intelligence artificielle appliquée et l’automatisation pour les entreprises" + NBSP +
      ": agents IA sur mesure, chatbots orientés clients, intégrations de la plateforme WhatsApp Business et connexion des systèmes déjà utilisés au quotidien.",
    "about.p2":
      "Nous travaillons avec des dirigeants et des responsables des opérations de PME" + NBSP +
      ": agences, marques e-commerce, prestataires de services et acteurs locaux, en Europe et en Afrique. Nos interlocuteurs sont rarement techniques" + NBSP +
      "; nous expliquons donc en termes simples ce que fera le système, nous le formalisons par écrit et nous gardons le logiciel compréhensible pour ceux qui l’utilisent.",
    "about.p3":
      "Notre modèle commercial est simple" + NBSP +
      ": nous vendons des prestations de services à des entreprises, et non des produits à des particuliers. Chaque mission prend la forme d’un projet à prix ferme, facturé sur la base d’une proposition écrite, ou d’un forfait mensuel de support et d’évolutions. Les prestations sont réalisées à distance, en anglais et en français, et facturées par BONZINILABS LTD.",
    "about.facts": "Informations sur la société",
    "about.legal": "Dénomination sociale",
    "about.reg": "Immatriculation",
    "about.regval": "Immatriculée en Angleterre et au Pays de Galles",
    "about.office": "Siège social",
    "about.model": "Modèle économique",
    "about.modelval":
      "Développement logiciel et services d’automatisation B2B, facturés au projet ou au mois",
    "about.email": "E-mail",

    "contact.label": "Contact",
    "contact.title": "Dites-nous ce que vous souhaitez automatiser",
    "contact.intro":
      "Décrivez le processus ou les échanges que vous souhaitez automatiser" + NBSP +
      ": nous vous répondons avec les prochaines étapes et, si utile, un échange de cadrage.",
    "contact.emailTitle": "E-mail",
    "contact.addrTitle": "Siège social",
    "contact.hoursTitle": "Horaires",
    "contact.hours": "Du lundi au vendredi, de 9h00 à 18h00 (heure du Royaume-Uni)",
    "contact.replyTitle": "Délai de réponse",
    "contact.reply": "Nous répondons à toute demande commerciale sous deux jours ouvrés.",

    "form.name": "Votre nom",
    "form.email": "Adresse e-mail",
    "form.company": "Entreprise (facultatif)",
    "form.message": "Que souhaitez-vous automatiser" + NBSP + "?",
    "form.submit": "Envoyer le message",
    "form.note":
      "Ce formulaire ouvre votre application e-mail avec le message pré-rempli" + NBSP +
      "; aucune donnée n’est envoyée ni conservée sur ce site. Vous pouvez aussi écrire directement à contact@bonzinilabs.com.",

    "footer.summary":
      "BONZINILABS LTD conçoit des agents IA sur mesure, des chatbots, des intégrations WhatsApp Business et des automatisations de processus pour les entreprises, facturés au projet ou au mois.",
    "footer.company": "Société",
    "footer.legalCol": "Informations légales",
    "footer.terms": "Conditions générales",
    "footer.refunds": "Remboursements et annulation",
    "footer.privacy": "Politique de confidentialité",
    "footer.legal":
      "BONZINILABS LTD, société immatriculée en Angleterre et au Pays de Galles. Siège social" + NBSP +
      ": 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom."
  };

  /* Strings used only from script (never rendered in the HTML source). */
  var UI = {
    en: {
      formError: "Please add your name, a valid email address and a short message.",
      formOpening: "Opening your email application…",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      subject: "Project enquiry",
      fName: "Name",
      fEmail: "Email",
      fCompany: "Company",
      title: "BONZINILABS LTD — AI Automation & AI Agents for Business",
      description:
        "BONZINILABS LTD is a UK company delivering AI automation for business: custom AI agents, chatbots, WhatsApp Business integrations and process automation."
    },
    fr: {
      formError:
        "Merci d’indiquer votre nom, une adresse e-mail valide et un court message.",
      formOpening: "Ouverture de votre application e-mail…",
      menuOpen: "Ouvrir le menu",
      menuClose: "Fermer le menu",
      subject: "Demande de projet",
      fName: "Nom",
      fEmail: "E-mail",
      fCompany: "Entreprise",
      title: "BONZINILABS LTD — Automatisation IA pour les entreprises",
      description:
        "BONZINILABS LTD, société britannique d’automatisation par l’IA" + NBSP +
        ": agents IA sur mesure, chatbots, WhatsApp Business et automatisation des processus métier."
    }
  };

  /* ---------------------------------------------------------------------------
     2. LANGUAGE
     ------------------------------------------------------------------------ */

  var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-i18n]"));
  var ariaNodes = Array.prototype.slice.call(
    document.querySelectorAll("[data-i18n-aria]")
  );
  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("navToggle");
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");

  /* One source of truth for the point the navigation collapses; the same
     value lives in the stylesheet's max-width: 899px query. */
  var compact = window.matchMedia("(max-width: 899px)");
  var langButtons = Array.prototype.slice.call(
    document.querySelectorAll(".lang-switch button")
  );

  /* Only the home page is translated. The legal pages are English — English is
     the governing language of the company's contracts — so they carry no
     switch, and nothing here may touch their title or meta description. */
  var translatable = langButtons.length > 0;
  var EN = {};
  nodes.forEach(function (el) {
    EN[el.getAttribute("data-i18n")] = el.textContent.replace(/\s+/g, " ").trim();
  });
  ariaNodes.forEach(function (el) {
    EN[el.getAttribute("data-i18n-aria")] = el.getAttribute("aria-label");
  });

  var lang = "en";

  function applyLanguage(next) {
    lang = next === "fr" ? "fr" : "en";
    var dict = lang === "fr" ? FR : EN;

    nodes.forEach(function (el) {
      var value = dict[el.getAttribute("data-i18n")];
      if (typeof value === "string") el.textContent = value;
    });

    ariaNodes.forEach(function (el) {
      var value = dict[el.getAttribute("data-i18n-aria")];
      if (typeof value === "string") el.setAttribute("aria-label", value);
    });

    document.documentElement.lang = lang;
    document.title = UI[lang].title;

    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", UI[lang].description);
    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", UI[lang].title);
    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", UI[lang].description);
    var ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute("content", lang === "fr" ? "fr_FR" : "en_GB");
    var ogAlt = document.querySelector('meta[property="og:locale:alternate"]');
    if (ogAlt) ogAlt.setAttribute("content", lang === "fr" ? "en_GB" : "fr_FR");

    langButtons.forEach(function (btn) {
      btn.setAttribute(
        "aria-pressed",
        btn.getAttribute("data-lang") === lang ? "true" : "false"
      );
    });

    if (navToggle) {
      navToggle.setAttribute(
        "aria-label",
        navToggle.getAttribute("aria-expanded") === "true"
          ? UI[lang].menuClose
          : UI[lang].menuOpen
      );
    }

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* private mode: the choice simply resets on reload */
    }
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLanguage(btn.getAttribute("data-lang"));
    });
  });

  /* ---------------------------------------------------------------------------
     3. NAVIGATION
     ------------------------------------------------------------------------ */

  function setNav(open, restoreFocus) {
    if (!nav || !navToggle) return;
    var hadFocus = nav.contains(document.activeElement);

    nav.setAttribute("data-open", open ? "true" : "false");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute(
      "aria-label",
      open ? UI[lang].menuClose : UI[lang].menuOpen
    );

    /* The sheet is display:none when closed, so anything focused inside it
       would otherwise be blurred and the tab sequence would restart at the
       top of the document. */
    if (open) {
      var first = nav.querySelector("a");
      if (first) first.focus();
    } else if (hadFocus && restoreFocus !== false) {
      navToggle.focus();
    }
  }

  if (nav && navToggle) {
    setNav(false);

    navToggle.addEventListener("click", function () {
      setNav(navToggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
      var link = event.target.closest("a");
      if (!link) return;
      setNav(false, false);

      var target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setNav(false);
    });

    /* Leaving the compact range with the sheet open would strand it. */
    if (compact.addEventListener) {
      compact.addEventListener("change", function (event) {
        if (!event.matches) setNav(false);
      });
    }
  }

  /* ---------------------------------------------------------------------------
     4. CONTACT FORM — composes a pre-filled email. Nothing leaves the browser
     until the visitor sends it from their own mail client.
     ------------------------------------------------------------------------ */

  function say(message, state) {
    if (!status) return;
    status.hidden = false; /* re-enter the accessibility tree first */
    status.setAttribute("data-state", state);
    status.textContent = "";
    window.requestAnimationFrame(function () {
      status.textContent = message;
    });
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // form.elements avoids the HTMLFormElement.name / .method name clash,
      // and the guard keeps a renamed field from dead-ending the whole form.
      function value(fieldName) {
        var field = form.elements.namedItem(fieldName);
        return field ? field.value.trim() : "";
      }

      var fields = form.elements;
      var name = value("name");
      var email = value("email");
      var company = value("company");
      var message = value("message");
      var emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

      ["name", "email", "message"].forEach(function (fieldName) {
        var field = fields.namedItem(fieldName);
        if (!field) return;
        field.removeAttribute("aria-invalid");
        field.removeAttribute("aria-describedby");
      });

      if (!name || !emailLooksValid || !message) {
        var invalid = fields.namedItem(
          !name ? "name" : !emailLooksValid ? "email" : "message"
        );
        if (invalid) {
          invalid.setAttribute("aria-invalid", "true");
          invalid.setAttribute("aria-describedby", "formStatus");
        }
        say(UI[lang].formError, "error");
        if (invalid) invalid.focus();
        return;
      }

      var t = UI[lang];
      var subject = t.subject + " — " + name + (company ? " (" + company + ")" : "");
      var body =
        t.fName + ": " + name + "\n" +
        t.fEmail + ": " + email + "\n" +
        t.fCompany + ": " + (company || "—") + "\n\n" +
        message + "\n";

      say(t.formOpening, "ok");
      window.location.href =
        "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
    });
  }

  /* ---------------------------------------------------------------------------
     5. YEAR
     ------------------------------------------------------------------------ */

  Array.prototype.forEach.call(
    document.querySelectorAll("[data-year]"),
    function (el) {
      el.textContent = String(new Date().getFullYear());
    }
  );

  /* ---------------------------------------------------------------------------
     6. NO SCROLL-REVEAL, ON PURPOSE
     An earlier build faded sections in on scroll. Visual QA caught the failure
     mode: if the observer does not fire — a headless crawler, an archived copy,
     a browser that renders before scripts settle — the page shows a hero and
     nothing else. This site exists to be read by reviewers and crawlers, so
     every word is in the document and visible from the first paint. The only
     motion left is hover feedback, which cannot hide anything.
     ------------------------------------------------------------------------ */

  /* ---------------------------------------------------------------------------
     7. RESTORE THE VISITOR'S LANGUAGE
     ------------------------------------------------------------------------ */

  if (translatable) {
    var stored;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }

    var browserLang = (navigator.language || "en").toLowerCase();
    applyLanguage(stored || (browserLang.indexOf("fr") === 0 ? "fr" : "en"));
  }
})();
