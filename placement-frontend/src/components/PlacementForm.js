import React, { useState } from "react";
import axios from "axios";

function PlacementForm() {
  const [placement, setPlacement] = useState({
    name: "",
    college: "",
    date: "",
    qualification: "",
    year: ""
  });

  const handleChange = (e) => {
    setPlacement({
      ...placement,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8080/api/placements",
        placement
      );

      alert("Placement Added Successfully");

      setPlacement({
        name: "",
        college: "",
        date: "",
        qualification: "",
        year: ""
      });

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Error while adding placement");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 mb-4 shadow">
      <h4>Add Placement</h4>

      <input
        type="text"
        name="name"
        placeholder="Student Name"
        className="form-control mb-2"
        value={placement.name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="college"
        placeholder="College Name"
        className="form-control mb-2"
        value={placement.college}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="date"
        className="form-control mb-2"
        value={placement.date}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="qualification"
        placeholder="Qualification"
        className="form-control mb-2"
        value={placement.qualification}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="year"
        placeholder="Year"
        className="form-control mb-2"
        value={placement.year}
        onChange={handleChange}
        required
      />

      <button className="btn btn-primary">
        Add Placement
      </button>
    </form>
  );
}

export default PlacementForm;