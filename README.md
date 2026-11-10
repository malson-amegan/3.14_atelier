# 3.14 Atelier Lomé

Site vitrine statique : aucune dépendance ni commande de compilation n'est nécessaire.

Le menu affiché est une proposition de démonstration non officielle. Les prix fournis sont présentés tels quels ; les autres restent à confirmer par le restaurant.

Le formulaire prépare la réservation (date, heure et nombre de personnes) dans un message WhatsApp destiné au +228 98 46 80 83. Le visiteur doit confirmer l'envoi dans WhatsApp ; aucune réservation n'est enregistrée par le site.

Le menu peut être filtré par catégorie ou recherché par nom et description. Les trois prix fournis sont affichés ; les tarifs absents ne sont pas inventés.

## Déploiement sur GitHub Pages

Le workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml) prépare le site statique et le publie automatiquement sur GitHub Pages lors de chaque push sur `main`. Aucun outil de compilation ni dépendance npm n'est nécessaire.

1. Créer sur GitHub un dépôt pour le site. Pour bénéficier de GitHub Pages avec GitHub Free, le dépôt doit être public ; vérifie qu'aucune donnée privée ne se trouve dans les fichiers avant la publication.
2. Ajouter le contenu de ce dossier au dépôt, puis envoyer le commit sur la branche `main`.
3. Dans les paramètres du dépôt, ouvrir **Settings → Pages**, puis choisir **GitHub Actions** comme source de publication.
4. Consulter **Actions** pour suivre le premier déploiement. L'adresse du site apparaît sous **Settings → Pages** une fois le workflow terminé.

Ensuite, chaque push sur `main` déclenche une nouvelle publication. Le workflow peut aussi être lancé manuellement depuis **Actions**.

Avant la mise en ligne, confirmer auprès du restaurant l'adresse exacte, les horaires, le menu de démonstration et ses prix. Le numéro WhatsApp affiché est celui fourni pour la réservation.

## Informations publiques consultées

- [Instagram de 3.14 Atelier Lomé](https://www.instagram.com/3.14atelierlome/)
- [Résultats TikTok sur 3.14 Atelier à Lomé](https://www.tiktok.com/discover/3-14-atelier-lom%C3%A9-menu?lang=en) — activité café, restaurant et lounge-bar, secteur Tokoin Séminaire et numéro publié pour les réservations.

## Vérification locale

Ouvrir `index.html` dans un navigateur. Le menu filtrable, la recherche, la validation du formulaire de réservation, la préparation du message WhatsApp, le menu mobile et la galerie sont utilisables sans dépendance à installer.
