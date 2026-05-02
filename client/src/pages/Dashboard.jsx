import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import ChartBox from "../components/ChartBox";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/dashboard").then((res) => setData(res.data));
  }, []);

  if (!data) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Card label="Total" value={data.total} />
        <Card label="Todo" value={data.todo} />
        <Card label="In Progress" value={data.inProgress} />
        <Card label="Done" value={data.done} />
        <Card label="Overdue" value={data.overdue} />
      </div>

      <ChartBox data={data} />
    </Layout>
  );
}

function Card({ label, value, danger }) {
  return (
    <div
      className={`bg-white p-4 rounded-xl border shadow-sm text-center ${danger && "border-red-300"}`}
    >
      <p className="text-sm text-gray-500">{label}</p>
      <h2 className="text-xl font-semibold mt-1">{value}</h2>
    </div>
  );
}
