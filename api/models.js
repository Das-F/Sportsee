// Models classes to structure user datas.

export class UserActivity {
  constructor(data) {
    const payload = data?.data ?? data;
    this.userId = payload?.userId ?? payload?.id ?? null;
    this.sessions = (payload?.sessions ?? []).map((s) => ({
      day: this.#formatDay(s.day),
      kilogram: s.kilogram ?? s.weight ?? s.kg ?? 0,
      calories: s.calories ?? s.calorie ?? s.kcal ?? 0,
    }));
  }

  #formatDay(day) {
    if (!day) return "";
    if (typeof day === "string" && day.includes("-")) {
      return new Date(day).getDate();
    }
    return day;
  }

  toJSON() {
    return { userId: this.userId, sessions: this.sessions };
  }
}

export class UserAverageSessions {
  constructor(data) {
    const payload = data?.data ?? data;
    const rawSessions = payload?.sessions ?? [];
    const dayMap = [null, "L", "M", "M", "J", "V", "S", "D"];
    this.userId = payload?.userId ?? null;
    this.sessions = rawSessions.map((s) => {
      const idx = s.day ?? s.weekday ?? s.dayOfWeek ?? 0;
      return {
        name: dayMap[idx] ?? String(idx),
        sessionLength: s.sessionLength ?? s.length ?? s.value ?? 0,
      };
    });
  }

  toJSON() {
    return this.sessions;
  }
}

export class UserPerformance {
  constructor(data) {
    const kind = {
      1: "Cardio",
      2: "Énergie",
      3: "Endurance",
      4: "Force",
      5: "Vitesse",
      6: "Intensité",
    };
    const payload = data?.data ?? data;
    const rawData = payload?.data ?? [];
    this.userId = payload?.userId ?? null;
    this.data = rawData.map((d) => ({
      kind: kind?.[d.kind] ?? d.kind,
      value: d.value,
    }));
  }

  toJSON() {
    return { userId: this.userId, kind: this.kind, data: this.data };
  }
}

export class UserMainData {
  constructor(data) {
    const payload = data?.data ?? data;
    this.userId = payload?.id ?? null;
    this.firstName = payload?.userInfos?.firstName ?? "";
    this.score = payload?.score ?? payload?.todayScore ?? 0;
    this.keyData = payload?.keyData ?? {};
  }

  getNutritionData() {
    const k = this.keyData;
    return [
      { type: "Calories", value: k.calorieCount ?? 0, unit: "kCal" },
      { type: "Proteines", value: k.proteinCount ?? 0, unit: "g" },
      { type: "Glucides", value: k.carbohydrateCount ?? 0, unit: "g" },
      { type: "Lipides", value: k.lipidCount ?? 0, unit: "g" },
    ];
  }

  toJSON() {
    return {
      userId: this.userId,
      firstName: this.firstName,
      score: this.score,
      keyData: this.keyData,
    };
  }
}
