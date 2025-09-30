// Get ID function
export async function GetUserId(id) {
  const response = await fetch(`http://localhost:3000/user/${id}`);
  const data = await response.json();
  console.log(data);
  return data;
}

// Get Name function for title
export async function GetUserName(id) {
  const response = await fetch(`http://localhost:3000/user/${id}`);
  const data = await response.json();
  return data?.data?.userInfos?.firstName ?? null;
}
GetUserName(12).then((name) => console.log("Prénom:", name));

// Get User Activity function for BarChart
export async function GetUserActivity(id) {
  const response = await fetch(`http://localhost:3000/user/${id}/activity`);
  const data = await response.json();
  return data;
}
GetUserActivity(12).then((data) => console.log("Activité:", data));

// Get User Average Sessions function for LineChart
export async function GetUserAverageSessions(id) {
  const response = await fetch(`http://localhost:3000/user/${id}/average-sessions`);
  const data = await response.json();
  return data;
}
GetUserAverageSessions(12).then((data) => console.log("Sessions Moyennes:", data));

// Get User Performance function for RadarChart
export async function GetUserPerformance(id) {
  const response = await fetch(`http://localhost:3000/user/${id}/performance`);
  const data = await response.json();
  return data;
}
GetUserPerformance(12).then((data) => console.log("Performance:", data));

// Get User Score function for PieChart
export async function GetUserScore(id) {
  const response = await fetch(`http://localhost:3000/user/${id}`);
  const data = await response.json();
  return data;
}
GetUserScore(12).then((data) => console.log("Score:", data));

// Get User Nutrition function for AlimentationBoard
export async function GetUserNutrition(id) {
  const response = await fetch(`http://localhost:3000/user/${id}`);
  const data = await response.json();
  return data;
}
GetUserNutrition(12).then((data) => console.log("Nutrition:", data));

export async function GetUserNutritionFormatted(id) {
  const response = await fetch(`http://localhost:3000/user/${id}`);
  const data = await response.json();
  const keyData = data?.data?.keyData ?? {};
  return [
    { type: "Calories", value: keyData.calorieCount ?? 0, unit: "kCal" },
    { type: "Proteines", value: keyData.proteinCount ?? 0, unit: "g" },
    { type: "Glucides", value: keyData.carbohydrateCount ?? 0, unit: "g" },
    { type: "Lipides", value: keyData.lipidCount ?? 0, unit: "g" },
  ];
}
