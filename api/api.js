// sportsee-front/api/api.js
import { USE_MOCK } from "./config";

// 🔹 Import des JSON mockés
import mockUserInfo from "/public/assets/mocksdatas/20-user-information.json";
import mockUserActivity from "/public/assets/mocksdatas/20-user-activity.json";
import mockUserAverageSession from "/public/assets/mocksdatas/20-user-average-session.json";
import mockUserPerformance from "/public/assets/mocksdatas/20-user-performance.json";

const BASE_URL = "http://localhost:3000";

// ---------------------------------------------------------------------------
// 🔸 USER NAME
// ---------------------------------------------------------------------------
export async function GetUserName(id) {
  if (USE_MOCK) {
    return mockUserInfo.data.userInfos.firstName;
  }
  const response = await fetch(`${BASE_URL}/user/${id}`);
  const data = await response.json();
  return data?.data?.userInfos?.firstName ?? null;
}

// ---------------------------------------------------------------------------
// 🔸 USER ACTIVITY
// ---------------------------------------------------------------------------
export async function GetUserActivity(id) {
  if (USE_MOCK) return mockUserActivity;
  const response = await fetch(`${BASE_URL}/user/${id}/activity`);
  const data = await response.json();
  return data;
}

export async function GetUserActivityFormatted(id) {
  const data = USE_MOCK ? mockUserActivity : await (await fetch(`${BASE_URL}/user/${id}/activity`)).json();
  const payload = data?.data ?? data;
  const sessions = payload?.sessions ?? payload ?? [];
  const normalized = Array.isArray(sessions)
    ? sessions.map((s) => ({
        day: s.day ?? s.date ?? s.label ?? "",
        kilogram: s.kilogram ?? s.weight ?? s.kg ?? null,
        calories: s.calories ?? s.calorie ?? s.kcal ?? null,
      }))
    : [];
  const result = { userId: payload?.userId ?? payload?.id ?? id, sessions: normalized };
  if (typeof window !== "undefined") console.debug("[api] GetUserActivityFormatted ->", result);
  return result;
}

// ---------------------------------------------------------------------------
// 🔸 USER AVERAGE SESSIONS
// ---------------------------------------------------------------------------
export async function GetUserAverageSessions(id) {
  if (USE_MOCK) return mockUserAverageSession;
  const response = await fetch(`${BASE_URL}/user/${id}/average-sessions`);
  return await response.json();
}

export async function GetUserAverageSessionsFormatted(id) {
  const data = USE_MOCK ? mockUserAverageSession : await (await fetch(`${BASE_URL}/user/${id}/average-sessions`)).json();
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

  if (typeof window !== "undefined") console.debug("[api] GetUserAverageSessionsFormatted ->", chartData);
  return chartData;
}

// ---------------------------------------------------------------------------
// 🔸 USER PERFORMANCE
// ---------------------------------------------------------------------------
export async function GetUserPerformance(id) {
  if (USE_MOCK) return mockUserPerformance;
  const response = await fetch(`${BASE_URL}/user/${id}/performance`);
  return await response.json();
}

export async function GetUserPerformanceFormatted(id) {
  const data = USE_MOCK ? mockUserPerformance : await (await fetch(`${BASE_URL}/user/${id}/performance`)).json();
  const payload = data?.data ?? data;
  const kindMap = payload?.kind ?? {};
  const rawData = payload?.data ?? [];

  const chartData = Array.isArray(rawData)
    ? rawData.map((d) => ({
        kind: kindMap?.[d.kind] ?? d.kind,
        value: d.value,
      }))
    : [];

  const result = { userId: payload?.userId, kind: kindMap, data: chartData };
  if (typeof window !== "undefined") console.debug("[api] GetUserPerformanceFormatted ->", result);
  return result;
}

// ---------------------------------------------------------------------------
// 🔸 USER SCORE
// ---------------------------------------------------------------------------
export async function GetUserScore(id) {
  if (USE_MOCK) return mockUserInfo;
  const response = await fetch(`${BASE_URL}/user/${id}`);
  return await response.json();
}

export async function GetUserScoreFormatted(id) {
  const data = USE_MOCK ? mockUserInfo : await (await fetch(`${BASE_URL}/user/${id}`)).json();
  const score = data?.data?.score ?? data?.data?.todayScore ?? 0;
  if (typeof window !== "undefined") console.debug("[api] GetUserScoreFormatted ->", score);
  return score;
}

// ---------------------------------------------------------------------------
// 🔸 USER NUTRITION
// ---------------------------------------------------------------------------
export async function GetUserNutrition(id) {
  if (USE_MOCK) return mockUserInfo;
  const response = await fetch(`${BASE_URL}/user/${id}`);
  return await response.json();
}

export async function GetUserNutritionFormatted(id) {
  const data = USE_MOCK ? mockUserInfo : await (await fetch(`${BASE_URL}/user/${id}`)).json();
  const keyData = data?.data?.keyData ?? {};
  return [
    { type: "Calories", value: keyData.calorieCount ?? 0, unit: "kCal" },
    { type: "Proteines", value: keyData.proteinCount ?? 0, unit: "g" },
    { type: "Glucides", value: keyData.carbohydrateCount ?? 0, unit: "g" },
    { type: "Lipides", value: keyData.lipidCount ?? 0, unit: "g" },
  ];
}
