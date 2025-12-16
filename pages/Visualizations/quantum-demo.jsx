import React, { useEffect, useState } from "react";
import QuantumCircuitVis from "../../components/Visualization/QuantumCircuitVis";

export default function QuantumDemoPage() {
  const [problemData, setProblemData] = useState({ openQasm: "// loading…" });
  const [error, setError] = useState("");

  useEffect(() => {
    const base =
      process.env.NEXT_PUBLIC_REDUX_BASE_URL || "http://localhost:27000/";
    const visualization = "DeutschDefaultVisualization";
    const solver = "DeutschQuantumSolver";
    const instance = "(0,1)"; // adjust if needed

    const fetchQasm = async () => {
      try {
        const res = await fetch(
          `${base}ProblemProvider/visualize?visualization=${encodeURIComponent(
            visualization
          )}&solver=${encodeURIComponent(solver)}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(instance),
          }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // The response you saw is an array; pick the first element that has a circuit
        const entry = (Array.isArray(data) ? data : [data]).find(
          (d) => d && d.circuit
        );
        if (!entry || !entry.circuit) throw new Error("No circuit in response");

        setProblemData({ openQasm: entry.circuit });
        setError("");
      } catch (err) {
        console.error("Failed to fetch QASM:", err);
        setError(err.message);
        setProblemData({ openQasm: "// failed to fetch QASM" });
      }
    };

    fetchQasm();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Quantum Circuit Demo (live backend)</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <QuantumCircuitVis problemData={problemData} />
    </div>
  );
}
