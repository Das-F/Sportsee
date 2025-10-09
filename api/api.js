import { USE_MOCK } from "./config";

/*
  api.js — helpers to fetch user data

  Conventions:
  - When USE_MOCK is true we fetch static JSON from
    /public/assets/mocksdatas/<id>-*.json to mimic the backend.
  - Each entity exposes two helpers:
      GetUserX(id) -> raw fetch (JSON)
      GetUserXFormatted(id) -> returns model.toJSON() or processed data
*/
import { UserActivity, UserAverageSessions, UserPerformance, UserMainData } from "./models";

const BASE_URL = "http://localhost:3000";

// ===========================================================================
// 🔸 USER NAME
// ===========================================================================
export async function GetUserName(id) {
  const url = USE_MOCK ? `/public/assets/mocksdatas/${id}-user-information.json` : `${BASE_URL}/user/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  const model = new UserMainData(data);
  return model.firstName;
}

// ===========================================================================
// 🔸 USER ACTIVITY
// ===========================================================================
export async function GetUserActivity(id) {
  const url = USE_MOCK ? `/public/assets/mocksdatas/${id}-user-activity.json` : `${BASE_URL}/user/${id}/activity`;
  const response = await fetch(url);
  return await response.json();
}

export async function GetUserActivityFormatted(id) {
  const raw = await GetUserActivity(id);
  const model = new UserActivity(raw);
  return model.toJSON();
}

// ===========================================================================
// 🔸 USER AVERAGE SESSIONS
// ===========================================================================
export async function GetUserAverageSessions(id) {
  const url = USE_MOCK ? `/public/assets/mocksdatas/${id}-user-average-session.json` : `${BASE_URL}/user/${id}/average-sessions`;
  const response = await fetch(url);
  return await response.json();
}

export async function GetUserAverageSessionsFormatted(id) {
  // Delegate to the base function so both mock and real endpoints follow the same flow
  const raw = await GetUserAverageSessions(id);
  const model = new UserAverageSessions(raw);
  return model.toJSON();
}

// ===========================================================================
// 🔸 USER PERFORMANCE
// ===========================================================================
export async function GetUserPerformance(id) {
  const url = USE_MOCK ? `/public/assets/mocksdatas/${id}-user-performance.json` : `${BASE_URL}/user/${id}/performance`;
  const response = await fetch(url);
  return await response.json();
}

export async function GetUserPerformanceFormatted(id) {
  // Keep the formatted function simple: always use the base fetcher.
  const raw = await GetUserPerformance(id);
  const model = new UserPerformance(raw);
  return model.toJSON();
}

// ===========================================================================
// 🔸 USER SCORE
// ===========================================================================
export async function GetUserScore(id) {
  const url = USE_MOCK ? `/public/assets/mocksdatas/${id}-user-information.json` : `${BASE_URL}/user/${id}`;
  const response = await fetch(url);
  return await response.json();
}

export async function GetUserScoreFormatted(id) {
  const raw = await GetUserScore(id);
  const model = new UserMainData(raw);
  return model.score;
}

// ===========================================================================
// 🔸 USER NUTRITION
// ===========================================================================
export async function GetUserNutrition(id) {
  const url = USE_MOCK ? `/public/assets/mocksdatas/${id}-user-information.json` : `${BASE_URL}/user/${id}`;
  const response = await fetch(url);
  return await response.json();
}

export async function GetUserNutritionFormatted(id) {
  const raw = await GetUserNutrition(id);
  const model = new UserMainData(raw);
  const nutrition = model.getNutritionData();
  return nutrition;
}
