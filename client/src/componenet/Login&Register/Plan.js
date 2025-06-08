import { useState } from "react";
import Register from "./Register";

export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState("Niveau 1");

  return (
    <div>
      <h2>Choisissez un plan</h2>
      <button onClick={() => setSelectedPlan("Niveau 1")}>Niveau 1 - 300DT</button>
      <button onClick={() => setSelectedPlan("Niveau 2")}>Niveau 2 - 600DT</button>
      <button onClick={() => setSelectedPlan("Niveau 3")}>Niveau 3 - 800DT</button>
      <button onClick={() => setSelectedPlan("FullStack Js")}>FullStack Js - 3000DT</button>

      
      {/* Formulaire d'inscription */}
      <Register selectedPlan={selectedPlan} />
    </div>
  );
}
