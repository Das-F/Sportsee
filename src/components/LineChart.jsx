import "./LineChart.css";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { GetUserAverageSessionsFormatted } from "../../api/api";

const CustomLegend = () => (
  <div className="custom-legend-linechart">
    <h2>
      Durée moyenne des <br /> sessions
    </h2>
  </div>
);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip-linechart">
        <p>{`${payload[0].value} min`}</p>
      </div>
    );
  }
  return null;
};

const LineChartComponent = ({ data, userId }) => {
  const [chartData, setChartData] = useState(Array.isArray(data) && data.length ? data : []);
  const [loading, setLoading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (Array.isArray(data) && data.length) {
      setChartData(data);
      return;
    }
    if (!userId) return;
    setLoading(true);
    GetUserAverageSessionsFormatted(userId)
      .then((d) => {
        if (!mounted) return;
        setChartData(Array.isArray(d) && d.length ? d : []);
      })
      .catch((err) => {
        console.error("LineChart: erreur GetUserAverageSessionsFormatted:", err);
        setChartData([]);
      })
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, [data, userId]);

  if (loading) return <p>Chargement...</p>;
  if ((!userId && (!data || !data.length)) || (Array.isArray(chartData) && chartData.length === 0)) return <p>Aucune donnée disponible</p>;

  return (
    <div className="line-chart-container">
      <div className="line-chart-responsive-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} onMouseMove={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            {isHovering && <Legend verticalAlign="top" align="left" content={<CustomLegend />} />}

            <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} />
            <XAxis dataKey="name" stroke="#ffffff" tickLine={false} axisLine={false} padding={{ left: 10, right: 10 }} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Line type="monotone" dataKey="sessionLength" stroke="#ffffff" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartComponent;
