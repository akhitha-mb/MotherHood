import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'

const HealthMetrics = () => {
    const [formData, setFormData] = useState({
        patientId: localStorage.getItem('token'),
        bloodPressure: "",
        bodyTemperature: "",
        weight: "",
        heartRate: "",
        bloodSugar: "",
        comments: "",
    });

    const [healthRecords, setHealthRecords] = useState([]);
    const [expectedDeliveryDate, setExpectedDeliveryDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {
        fetchExpectedDeliveryDate();
        checkEditable();
        fetchHealthRecords();
    }, []);

    const fetchExpectedDeliveryDate = async () => {
        try {
            const patientId = localStorage.getItem('token')
            // console.log(patientId)
            const response = await axios.post("http://localhost:8080/api/health/expected-delivery", {patientId});
            // console.log(response.data.patient[0].expectedDelivery)
            setExpectedDeliveryDate(new Date(response.data.patient[0].expectedDelivery));
        } catch (error) {
            console.error("Error fetching expected delivery date:", error);
        }
    };

    const fetchHealthRecords = async () => {
        try {
            const patientId = localStorage.getItem('token')
            const response = await axios.post("http://localhost:8080/api/health/health-metrics", {patientId});
            // const data = await response.json();
            // console.log(response.data.health)
            setHealthRecords(response.data.health);
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
            const response = await fetch("http://localhost:8080/api/health/add-health", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, month: currentMonth, year: currentYear })
            });

            if (response.ok) {
                alert("Health metrics saved successfully!");
                fetchHealthRecords(); // Refresh table
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
            <div className="card shadow-lg p-4">
                <h3 className="text-center mb-4">Health Metrics Form</h3>
                {expectedDeliveryDate && (
                    <p className="text-center text-muted">
                        Expected Delivery Date: {expectedDeliveryDate.toDateString()}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Blood Pressure (mmHg)</label>
                        <input type="text" className="form-control" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} required disabled={!isEditable} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Body Temperature (°C)</label>
                        <input type="number" className="form-control" name="bodyTemperature" value={formData.bodyTemperature} onChange={handleChange} required disabled={!isEditable} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Weight (kg)</label>
                        <input type="number" className="form-control" name="weight" value={formData.weight} onChange={handleChange} required disabled={!isEditable} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Heart Rate (bpm)</label>
                        <input type="number" className="form-control" name="heartRate" value={formData.heartRate} onChange={handleChange} required disabled={!isEditable} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Blood Sugar (mg/dL)</label>
                        <input type="number" className="form-control" name="bloodSugar" value={formData.bloodSugar} onChange={handleChange} required disabled={!isEditable} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Additional Comments</label>
                        <textarea className="form-control" name="comments" rows="3" value={formData.comments} onChange={handleChange} disabled={!isEditable}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={!isEditable}>
                        {isEditable ? "Submit" : "Disabled (Only on 1st of the Month)"}
                    </button>
                </form>
            </div>

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