import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Appointments = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:8080/api/patients/dispDoc')
      .then(res => {setDoctors(res.data.doctors)})
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (doctorId && date) {
      axios.post(`http://localhost:8080/api/patients/available_timeslots`, { doctorId,date })
        .then(res => setAvailableSlots(res.data.slotsWithStatus))
        .catch(err => console.error(err));
    }
  }, [doctorId, date]);

  const handleBooking = () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Please log in to book an appointment');

    axios.post('http://localhost:8080/api/patients/appointments', { doctorId, date, timeSlot }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => alert('Appointment booked successfully'))
    .catch(err => alert('Error booking appointment'));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Book an Appointment</h2>
      <div className="mb-3">
        <label className="form-label">Select Doctor</label>
        <select className="form-select" onChange={e => setDoctorId(e.target.value)}>
          <option value="">Choose a doctor</option>
          {doctors.map(doctor => (
            <option key={doctor._id} value={doctor._id}>{doctor.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Select Date</label>
        <input type="date" className="form-control" onChange={e => setDate(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Select Time Slot</label>
        <select className="form-select" onChange={e => setTimeSlot(e.target.value)}>
          <option value="">Choose a time slot</option>
          {availableSlots.map(slot => (
            <option key={slot.timeSlot} value={slot.timeSlot} disabled={slot.status === 'Pending'}>
              {slot.timeSlot} ({slot.status})
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleBooking}>Book Appointment</button>
    </div>
  );
};

export default Appointments;