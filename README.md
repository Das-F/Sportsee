# SportSee

SportSee est un tableau de bord d’analyse sportive développé en **React (Vite)** avec une API back-end dédiée.  
Ce projet est réalisé dans le cadre d’un exercice pédagogique (formation OpenClassrooms) visant à recréer la page profil d’un utilisateur à partir d’une maquette Figma et d’un backend Node.js.

---

## 🎯 Objectif pédagogique

- Refaire la **page profil utilisateur** avec **React**.
- Implémenter des **graphiques sportifs interactifs** (via Recharts).
- Intégrer les données d’un **backend NodeJS**.
- Utiliser des **mocks** au départ, puis connecter l’API.
- Mettre en place un **service dédié aux appels API** (Fetch ou Axios).
- Standardiser les données reçues (schémas différents selon les utilisateurs).
- Cibler l’**intégration desktop** (≥ 1024 × 780px).

👉 Maquette Figma : [UI Design Sportify](https://www.figma.com/design/BMomGVZqLZb811mDMShpLu/UI-design-Sportify-FR?node-id=0-1&p=f&t=KAkYGxwaWT8Wro53-0)

---

## 📋 User Stories (To do)

- **US3 – Taille d’écran** : consulter la page profil sur un ordinateur ≥ 1024 × 780 px.
- **US4 – Prénom** : afficher le prénom sur le dashboard (via `/user/:id`).
- **US5 – Infos utilisateur** : accéder aux infos utilisateur via `/user/:id`.
- **US6 – Activité quotidienne** : accéder aux données d’activité via `/user/:id/activity`.
- **US7 – Durée sessions** : accéder à la durée moyenne des sessions via `/user/:id/average-sessions`.
- **US8 – Complétion objectif** : accéder à la complétion de l’objectif via `/user/:id`.
- **US9 – Types d’activités** : accéder aux types d’activité via `/user/:id/performance`.
- **US10 – Chiffres clés** : accéder aux chiffres clés via `/user/:id/activity`.
- **US11 – BarChart activité quotidienne** : afficher l’activité quotidienne sous forme de **BarChart**.
- **US12 – LineChart durée sessions** : afficher la durée moyenne des sessions sous forme de **LineChart**.
- **US13 – RadarChart type d’activité** : afficher les types d’activité sous forme de **RadarChart**.
- **US14 – RadialBarChart score moyen** : afficher le score moyen sous forme de **RadialBarChart**.
- **US15 – Cards infos clés** : afficher les informations clés dans des **cards**.

---

## 🧰 Technologies utilisées

- ⚛️ **Frontend** : React, Vite, JavaScript, CSS
- 📊 **Graphiques** : Recharts
- 🖥️ **Backend** : Node.js (micro API fournie par OpenClassrooms)
- 🛠️ **Outils** : Yarn, ESLint
- 📂 **Données** : JSON (`src/data/` + `public/mocks/`)
- 📂 **Données** : JSON (`src/data/`)

---

## 🗂️ Structure du projet

- backend/ → micro API (repo OpenClassrooms)
- public/
  - assets/ → images et icônes
  - mocks/ → (supprimé) les données de test locales ont été retirées ; utilisez l'API backend
- src/
  - components/ → composants réutilisables
  - pages/ → vues principales
  - services/ → services d’appels API (fetch/axios)
  - styles/ → fichiers CSS
  - utils/ → fonctions de transformation de données
  - data/ → fichiers JSON pour les appels API
  - index.jsx
- package.json
- vite.config.js
- README.md

> ⚠️ L’accent du projet est mis sur **les données (API)**.

---

## ⚙️ Installation & Lancement

### 1️⃣ Cloner les dépôts

** Frontend **

```
git clone https://github.com/Das-F/Sportsee.git
cd SportSee
```

** Backend **

```
git clone https://github.com/OpenClassrooms-Student-Center/SportSee.git backend
cd backend
```

2. Lancer le backend
   Sans Docker

```
yarn install
yarn dev
```

➡️ Disponible sur http://localhost:3000

** Avec Docker **

```
docker image build --no-cache -t micro-api .
docker container run --name micro-api -p 3000:3000 -dt micro-api yarn
```

** Lancer le frontend **

```
npm install
npm run dev
```

🔗 Endpoints de l’API

/user/:id → infos utilisateur (id, prénom, score, nutrition, etc.)
/user/:id/activity → activité quotidienne (kg, calories)
/user/:id/average-sessions → durée moyenne des sessions
/user/:id/performance → performances (types d’activités)
⚠️ Deux utilisateurs disponibles : userId 12 et 18.

🌐 Service API avec Fetch

```
src/services/api.js :

const BASE_URL = "http://localhost:3000/user";
// Les mocks locaux ont été retirés : le projet utilise l'API backend (http://localhost:3000)

async function fetchData(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
  return res.json();
}
export async function getUserData(userId) {
  return fetchData(useMock ? `${MOCKS_PATH}user_${userId}.json` : `${BASE_URL}/${userId}`);
}
export async function getUserActivity(userId) {
  return fetchData(useMock ? `${MOCKS_PATH}activity_${userId}.json` : `${BASE_URL}/${userId}/activity`);
}
export async function getUserAverageSessions(userId) {
  return fetchData(useMock ? `${MOCKS_PATH}average-sessions_${userId}.json` : `${BASE_URL}/${userId}/average-sessions`);
}
export async function getUserPerformance(userId) {
  return fetchData(useMock ? `${MOCKS_PATH}performance_${userId}.json` : `${BASE_URL}/${userId}/performance`);
}
```

⚛️ Exemple d’utilisation dans un composant React :

```
import { useEffect, useState } from "react";
import { getUserData } from "../services/api";

export default function Profile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserData(userId).then(setUser).catch(console.error);
  }, [userId]);

  if (!user) return <p>Chargement...</p>;

  return <h1>Bonjour, {user.data.userInfos.firstName} 👋</h1>;
}
```

Organisation des données
Les données de test locales (mocks) ont été retirées du dépôt. Lancez le backend (voir ci-dessus) pour récupérer les endpoints suivants :
/user/:id
/user/:id/activity
/user/:id/average-sessions
/user/:id/performance
⚠️ Deux utilisateurs disponibles : userId 12 et 18.

Projet réalisé dans le cadre de la formation OpenClassrooms.
Développé par : Das-F
