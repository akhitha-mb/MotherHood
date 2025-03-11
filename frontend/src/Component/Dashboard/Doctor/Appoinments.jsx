import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get('http://localhost:8080/api/doctor/viewappointments', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setAppointments(res.data))
    .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const confirmAppointment = (appointmentId) => {
    axios.post('http://localhost:8080/api/doctor/confirmappointment', { appointmentId })
      .then(() => {
        alert('Appointment confirmed');
        fetchAppointments();
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Doctor's Appointments</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.appointmentId}>
              <td>{appointment.patientDetails?.name || 'Unknown'}</td>
              <td>{appointment.appointmentDate}</td>
              <td>{appointment.status}</td>
              <td>
                {appointment.status === 'Pending' && (
                  <button className="btn btn-success" onClick={() => confirmAppointment(appointment.appointmentId)}>
                    Confirm
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorAppointments;
