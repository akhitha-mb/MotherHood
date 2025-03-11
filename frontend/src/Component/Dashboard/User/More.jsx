import React, { useState, useEffect } from "react";
import axios from "axios";

const More = () => {
  const [daysRemaining, setDaysRemaining] = useState(null);
  const [trimester, setTrimester] = useState("");
  const [doctorVisits, setDoctorVisits] = useState([]);
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState(null);

  useEffect(() => {
    const fetchExpectedDeliveryDate = async () => {
      try {
        const patientId = localStorage.getItem("token");
        const response = await axios.post("http://localhost:8080/api/health/expected-delivery", { patientId });

        if (response.data.patient && response.data.patient[0]?.expectedDelivery) {
          const fetchedDate = new Date(response.data.patient[0].expectedDelivery);
          setExpectedDeliveryDate(fetchedDate);
        }
      } catch (error) {
        console.error("Error fetching expected delivery date:", error);
      }
    };

    fetchExpectedDeliveryDate();
  }, []);

  useEffect(() => {
    if (!expectedDeliveryDate) return; // Only run calculations when date is fetched correctly

    const today = new Date();
    const diffTime = expectedDeliveryDate - today;
    const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysRemaining(remainingDays);

    // Calculate trimester based on 40 weeks pregnancy
    const totalWeeks = 40;
    const weeksPassed = ((totalWeeks * (1 - remainingDays / 280)).toFixed(1));

    if (weeksPassed < 13) {
      setTrimester("First Trimester");
    } else if (weeksPassed < 27) {
      setTrimester("Second Trimester");
    } else {
      setTrimester("Third Trimester");
    }

    // Generate doctor visit dates (every month until delivery)
    const visits = [];
    let visitDate = new Date(today);
    visitDate.setDate(1); // Start from the first of the month
    while (visitDate < expectedDeliveryDate) {
      visits.push(new Date(visitDate));
      visitDate.setMonth(visitDate.getMonth() + 1);
    }
    setDoctorVisits(visits);

  }, [expectedDeliveryDate]);

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h3 className="text-center mb-4">Trimester & Doctor Visit Tracker</h3>
        {expectedDeliveryDate ? (
          <>
            <p><strong>Trimester:</strong> {trimester}</p>
            <p><strong>Days Remaining Until Delivery:</strong> {daysRemaining} days</p>
            <h5>Doctor Visit Dates:</h5>
            <ul>
              {doctorVisits.map((date, index) => (
                <li key={index}>{date.toDateString()}</li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-center text-muted">Loading expected delivery date...</p>
        )}
      </div>
    </div>
  );
};

export default More;
