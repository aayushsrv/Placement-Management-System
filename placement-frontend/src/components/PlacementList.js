import React, { useEffect, useState } from "react";
import axios from "axios";

function PlacementList() {
  const [placements, setPlacements] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    college: "",
    date: "",
    qualification: "",
    year: ""
  });

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/placements"
      );
      setPlacements(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePlacement = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/placements/${id}`
      );
      fetchPlacements();
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (placement) => {
    setEditingId(placement.id);
    setEditData({
      name: placement.name,
      college: placement.college,
      date: placement.date,
      qualification: placement.qualification,
      year: placement.year
    });
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/placements/${id}`,
        editData
      );

      setEditingId(null);
      fetchPlacements();
      alert("Placement Updated Successfully");
    } catch (error) {
      console.error(error);
      alert("Error while updating placement");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="card p-4 shadow">
      <h4>Placement List</h4>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>College</th>
            <th>Date</th>
            <th>Qualification</th>
            <th>Year</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {placements.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>

              {editingId === p.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleEditChange}
                      className="form-control"
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      name="college"
                      value={editData.college}
                      onChange={handleEditChange}
                      className="form-control"
                    />
                  </td>

                  <td>
                    <input
                      type="date"
                      name="date"
                      value={editData.date}
                      onChange={handleEditChange}
                      className="form-control"
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      name="qualification"
                      value={editData.qualification}
                      onChange={handleEditChange}
                      className="form-control"
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      name="year"
                      value={editData.year}
                      onChange={handleEditChange}
                      className="form-control"
                    />
                  </td>

                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => saveEdit(p.id)}
                    >
                      Save
                    </button>

                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{p.name}</td>
                  <td>{p.college}</td>
                  <td>{p.date}</td>
                  <td>{p.qualification}</td>
                  <td>{p.year}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => startEdit(p)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deletePlacement(p.id)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlacementList;