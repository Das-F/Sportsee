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
  console.log(data);
  return data?.data?.userInfos?.firstName ?? null;
}

// Get User Activity function for BarChart
export async function GetUserActivity(id) {
  const response = await fetch(`http://localhost:3000/user/${id}/activity`);
  const data = await response.json();
  console.log("Activité:", data);
  return data;
}

// Get User Average Sessions function for LineChart
export async function GetUserAverageSessions(id) {
  const response = await fetch(`http://localhost:3000/user/${id}/average-sessions`);
  const data = await response.json();
  console.log("Sessions Moyennes:", data);
  return data;
}

// Get User Performance function for RadarChart
export async function GetUserPerformance(id) {
  const response = await fetch(`http://localhost:3000/user/${id}/performance`);
  const data = await response.json();
  console.log("Performance:", data);
  return data;
}

// Get User Score function for PieChart
export async function GetUserScore(id) {
  const response = await fetch(`http://localhost:3000/user/${id}`);
  const data = await response.json();
  console.log("Score:", data);
  return data;
}

// Get User Nutrition function for AlimentationBoard
export async function GetUserNutrition(id) {
  const response = await fetch(`http://localhost:3000/user/${id}`);
  const data = await response.json();

  return data;
}
