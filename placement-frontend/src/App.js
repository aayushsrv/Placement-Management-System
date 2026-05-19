import React from "react";
import PlacementForm from "./components/PlacementForm";
import PlacementList from "./components/PlacementList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        Placement Management System
      </h2>
      <h6 className="text-center mb-4">Placement Module</h6>

      <PlacementForm />
      <PlacementList />
    </div>
  );
}

export default App;