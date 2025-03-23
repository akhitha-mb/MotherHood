import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const HealthMetrics = () => {
  const [patientId, setPatientId] = useState("");
  const [healthRecords, setHealthRecords] = useState([]);
  const [currentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear] = useState(new Date().getFullYear());
  const [isEditable, setIsEditable] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    bloodPressure: "",
    bodyTemperature: "",
    weight: "",
    heartRate: "",
    bloodSugar: "",
    comments: "",
  });

  useEffect(() => {
    fetchDoctors();
    checkEditable();
  }, []);

  useEffect(() => {
    if (patientId) {
      fetchHealthRecords();
    }
  }, [patientId]);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/patients/fetch-appoinment-doc", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data.success === "true") {
        setDoctors(response.data.doctors);
      } else {
        console.error("No doctors found:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error.response?.data || error.message);
    }
  };

  const fetchHealthRecords = async () => {
    if (!patientId) return;
    try {
      const response = await axios.post("http://localhost:8080/api/health/health-metrics-patient", { patientId });
      setHealthRecords(response.data.health || []);
    } catch (error) {
      console.error("Error fetching health records:", error);
    }
  };

  const checkEditable = () => {
    const today = new Date();
    setIsEditable(today.getDate() === 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditable) {
      alert("You can only submit data on the 1st of the month.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/health/add-health", {
        ...formData,
        month: currentMonth,
        year: currentYear,
        patientId,
      });

      if (response.status === 200) {
        alert("Health metrics saved successfully!");
        fetchHealthRecords();
        setFormData({
          bloodPressure: "",
          bodyTemperature: "",
          weight: "",
          heartRate: "",
          bloodSugar: "",
          comments: "",
        });
      } else {
        alert("Failed to save health metrics.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <select className="form-control mb-3" onChange={(e) => setPatientId(e.target.value)}>
        <option value="">Select Any Patient</option>
        {doctors.map((doctor) => (
          <option value={doctor._id} key={doctor._id}>
            {doctor.name}
          </option>
        ))}
      </select>

      <div className="card shadow-lg p-4 mt-5">
        <h3 className="text-center mb-4">Health Metrics History</h3>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Month</th>
                <th>Year</th>
                <th>Blood Pressure</th>
                <th>Body Temperature</th>
                <th>Weight</th>
                <th>Heart Rate</th>
                <th>Blood Sugar</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {healthRecords.length > 0 ? (
                healthRecords.map((record, index) => (
                  <tr key={index}>
                    <td>{record.month}</td>
                    <td>{record.year}</td>
                    <td>{record.bloodPressure}</td>
                    <td>{record.bodyTemperature}</td>
                    <td>{record.weight}</td>
                    <td>{record.heartRate}</td>
                    <td>{record.bloodSugar}</td>
                    <td>{record.comments}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">No records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HealthMetrics;
