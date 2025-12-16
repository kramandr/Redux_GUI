import StandardGraphSvgReact from "./StandardGraphSvgReact";
import StandardSATSvgReact from "./StandardSATSvgReact";
import StandardCircuitSvgReact from "./StandardCircuitSvgReact";
import dynamic from "next/dynamic";

const QuantumCircuitVis = dynamic(() => import("../QuantumCircuitVis"), {
  ssr: false,
});

const Visualizations = new Map([
  [
    "Boolean Satisfiability",
    (solve, url, problemData, gadgetMap, gadgetsOn) => (
      <StandardSATSvgReact
        problemData={problemData}
        solve={solve}
        url={url}
        gadgetMap={gadgetMap}
        gadgetsOn={gadgetsOn}
      />
    ),
  ],
  [
    "Graph D3",
    (solve, url, problemData, gadgetMap, gadgetsOn) => (
      <StandardGraphSvgReact
        problemData={problemData}
        solve={solve}
        url={url}
        gadgetMap={gadgetMap}
        gadgetsOn={gadgetsOn}
      />
    ),
  ],
  [
    "Quantum Circuit D3",
    (solve, url, problemData, gadgetMap, gadgetsOn) => (
      <StandardCircuitSvgReact
        problemData={problemData}
        solve={solve}
        url={url}
        gadgetMap={gadgetMap}
        gadgetsOn={gadgetsOn}
      />
    ),
  ],
  [
    "Quantum Circuit Qjs",
    (solve, url, problemData, gadgetMap, gadgetsOn) => (
      <QuantumCircuitVis
        problemData={problemData}
        solve={solve}
        url={url}
        gadgetMap={gadgetMap}
        gadgetsOn={gadgetsOn}
      />
    ),
  ],
  [
    "Quantum Circuit (Q.js)",
    (solve, url, problemData) => <QuantumCircuitVis problemData={problemData} />,
  ],
  [
    "Deutsch Quantum Visualization (Q)",
    (solve, url, problemData) => <QuantumCircuitVis problemData={problemData} />,
  ],
  [
    "Deutsch Quantum (Q.js)",
    (solve, url, problemData) => <QuantumCircuitVis problemData={problemData} />,
  ],
]);

export default Visualizations;
