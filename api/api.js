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

// Get User Average Sessions formatted for LineChart
export async function GetUserAverageSessionsFormatted(id) {
  const response = await fetch(`http://localhost:3000/user/${id}/average-sessions`);
  const data = await response.json();
  // API may return { data: { sessions: [...] } } or { data: [...] }
  const payload = data?.data ?? data;
  const rawSessions = payload?.sessions ?? payload ?? [];

  const dayMap = [null, "L", "M", "M", "J", "V", "S", "D"];

  const chartData = Array.isArray(rawSessions)
    ? rawSessions.map((s) => {
        const dayIdx = s.day ?? s.weekday ?? s.dayOfWeek ?? 0;
        const name = dayMap[dayIdx] ?? (s.dayLabel || String(dayIdx));
        return { name, sessionLength: s.sessionLength ?? s.length ?? s.value ?? 0 };
      })
    : [];

  return chartData;
}

// Get User Performance function for RadarChart
export async function GetUserPerformance(id) {
  const response = await fetch(`http://localhost:3000/user/${id}/performance`);
  const data = await response.json();
  return data;
}

// Get User Performance formatted for RadarChart
export async function GetUserPerformanceFormatted(id) {
  const response = await fetch(`http://localhost:3000/user/${id}/performance`);
  const data = await response.json();
  // API shape may be:
  // { data: { userId: 18, kind: {1: 'cardio', ...}, data: [{value: 200, kind:1}, ...] } }
  const payload = data?.data ?? data;
  const kindMap = payload?.kind ?? {};
  const rawData = payload?.data ?? [];

  // Map to [{ kind: 'cardio', value: 200 }, ...]
  const chartData = Array.isArray(rawData) ? rawData.map((d) => ({ kind: kindMap?.[d.kind] ?? d.kind, value: d.value })) : [];

  return { userId: payload?.userId, kind: kindMap, data: chartData };
}

// Get User Score function for PieChart
export async function GetUserScore(id) {
  const response = await fetch(`http://localhost:3000/user/${id}`);
  const data = await response.json();
  return data;
}

export async function GetUserScoreFormatted(id) {
  const response = await fetch(`http://localhost:3000/user/${id}`);
  const data = await response.json();
  console.log("Données complètes de l'API :", data);
  const score = data?.data?.score ?? data?.data?.todayScore ?? 0;
  console.log("Score extrait :", score);
  return score;
}

// Get User Nutrition function for AlimentationBoard
export async function GetUserNutrition(id) {
  const response = await fetch(`http://localhost:3000/user/${id}`);
  const data = await response.json();
  return data;
}

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
