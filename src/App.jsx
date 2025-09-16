import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Page A",
    Kcal: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    Kcal: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    Kcal: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    Kcal: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    Kcal: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    Kcal: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    Kcal: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const Example = () => {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884D8" />
          <Bar dataKey="Kcal" fill="#82CA9D" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0);
  // debug: vérifier que le composant se rend
  console.log("App rendered, count =", count);
  // Afficher les infos de l'utilisateur 12 dans la console http://localhost:3000/user/12/activity
  function printUserActivity() {
    fetch("http://localhost:3000/user/12/activity")
      .then((response) => response.json())
      .then((data) => console.log("user activity:", data))
      .catch((err) => console.error("fetch error:", err));
  }
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <button onClick={printUserActivity} style={{ marginLeft: 8 }}>
          Show user activity (console)
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <Example />
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
