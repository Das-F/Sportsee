// Récupérer les informations de l'utilisateur avec l'ID spécifié
async function GetUserId(id) {
  const response = await fetch(`http://localhost:3000/user/${id}`);
  const data = await response.json();

  console.log(data);
  return data;
}
GetUserId(12);
GetUserId(18);

// Récupérer le prénom de l'utilisateur avec l'ID spécifié
async function GetUserName(id) {
  const response = await fetch(`http://localhost:3000/user/${id}`);
  const data = await response.json();
  const firstName = data.data.userInfos.firstName;

  console.log("Prénom :", firstName);
  return firstName;
}
GetUserName(12);

// Récupérer les données d'activité de l'utilisateur avec l'ID spécifié
async function GetUserActivity(id) {
  const response = await fetch(`http://localhost:3000/user/${id}/activity`);
  const data = await response.json();
  console.log("Activité :", data);
  return data;
}
GetUserActivity(12);

// Récupérer les données de session moyenne de l'utilisateur avec l'ID spécifié
async function GetUserAverageSessions(id) {
  const response = await fetch(`http://localhost:3000/user/${id}/average-sessions`);
  const data = await response.json();
  console.log("Sessions Moyennes :", data);
  return data;
}
GetUserAverageSessions(12);

// Récupérer les données de performance de l'utilisateur avec l'ID spécifié
async function GetUserPerformance(id) {
  const response = await fetch(`http://localhost:3000/user/${id}/performance`);
  const data = await response.json();
  console.log("Performance :", data);
  return data;
}
GetUserPerformance(12);

// Récupérer les données de score de l'utilisateur avec l'ID spécifié
async function GetUserScore(id) {
  const response = await fetch(`http://localhost:3000/user/${id}`);
  const data = await response.json();
  console.log("Score :", data);
  return data;
}
GetUserScore(12);

// Récupérer les données de nutrition de l'utilisateur avec l'ID spécifié
async function GetUserNutrition(id) {
  const response = await fetch(`http://localhost:3000/user/${id}`);
  const data = await response.json();
  console.log("Nutrition :", data);
  return data;
}
GetUserNutrition(12);
