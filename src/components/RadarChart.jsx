import "./RadarChart.css";
import { useEffect, useState } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
import { GetUserPerformanceFormatted } from "../../api/api";

const RadarChartComponent = ({ data: propData, userId }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (propData) {
      // propData expected either as already formatted { kind: {...}, data: [...] } or as an array
      if (Array.isArray(propData)) setChartData(propData);
      else if (propData.kind && Array.isArray(propData.data)) setChartData(propData.data.map((d) => ({ kind: propData.kind[d.kind] ?? d.kind, value: d.value })));
      return;
    }

    if (!userId) return;
    setLoading(true);
    GetUserPerformanceFormatted(userId)
      .then((res) => {
        if (!mounted) return;
        const data = res?.data ?? [];
        setChartData(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("RadarChart: erreur GetUserPerformanceFormatted:", err);
        setChartData([]);
      })
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, [propData, userId]);

  if (!userId && !propData) return <p>Utilisateur non spécifié</p>;
  if (loading) return <p>Chargement...</p>;

  const maxValue = chartData.length ? Math.max(...chartData.map((d) => d.value)) : 0;

  return (
    <div className="radar-chart-container">
      <div className="radar-chart-wrapper">
        <ResponsiveContainer className="radar-chart-responsive-container">
          <RadarChart outerRadius={45} width={540} height={220} data={chartData}>
            <PolarGrid radialLines={false} />
            <PolarAngleAxis dataKey="kind" tick={{ fill: "#FFFFFF", fontSize: 10, fontWeight: 500 }} />
            <PolarRadiusAxis angle={30} domain={[0, Math.max(50, maxValue)]} tick={false} axisLine={false} />
            <Radar name="Performance" dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.7} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RadarChartComponent;
