import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

const Panalytics = () => {
  const [patientsData, setPatientsData] = useState([]);
  const [doctorsData, setDoctorsData] = useState([]);
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const config = {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };

        // Fetch all required data with authentication
        const [patients, doctors, appointments] = await Promise.all([
          axios.get('http://localhost:8080/api/doctor/fetch-all-patients'),
          axios.post('http://localhost:8080/api/admin/fetchDoc'),
          axios.get('http://localhost:8080/api/doctor/fetch-all-appointments')
        ]);

        // Update state with response data
        if (patients.data.success === "true") {
          setPatientsData(patients.data.patients);
          console.log(patients.data.patients)
        }
        if (doctors.data) {
          setDoctorsData(doctors.data);
        }
        if (appointments.data) {
          setAppointmentsData(appointments.data);
        }
        setLoading(false);
      } catch (err) {
        console.error('Analytics Error:', err);
        setError(err.response?.data?.message || 'Error fetching analytics data');
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Remove calculatePatientGrowth function and add new analytics functions
  const calculateAppointmentTrends = () => {
    const months = {};
    appointmentsData.forEach(apt => {
      const date = new Date(apt.appointmentDate);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      months[monthYear] = (months[monthYear] || 0) + 1;
    });

    return {
      labels: Object.keys(months),
      datasets: [{
        label: 'Appointments per Month',
        data: Object.values(months),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1
      }]
    };
  };

  const calculateDoctorWorkload = () => {
    const workload = {};
    appointmentsData.forEach(apt => {
      const doctorName = apt.doctorDetails?.name || 'Unknown';
      workload[doctorName] = (workload[doctorName] || 0) + 1;
    });

    return {
      labels: Object.keys(workload),
      datasets: [{
        label: 'Appointments per Doctor',
        data: Object.values(workload),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderWidth: 1
      }]
    };
  };

  const appointmentStatus = {
    labels: ['Pending', 'Confirmed', 'Completed'],
    datasets: [{
      data: appointmentsData ? [
        appointmentsData.filter(apt => apt.status === 'Pending').length,
        appointmentsData.filter(apt => apt.status === 'Confirmed').length,
        appointmentsData.filter(apt => apt.status === 'Completed').length
      ] : [0, 0, 0],
      backgroundColor: [
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)'
      ]
    }]
  };

  if (loading) return <div className="text-center mt-5">Loading analytics...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <div className="container-fluid mt-4">
      <h2 className="text-center mb-4">Analytics Dashboard</h2>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Patients</h5>
              <h2 className="card-text">{patientsData.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Doctors</h5>
              <h2 className="card-text">{doctorsData.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Appointments</h5>
              <h2 className="card-text">{appointmentsData.length}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body" style={{ height: '300px' }}>
              <h5 className="card-title">Monthly Appointment Trends</h5>
              <Bar 
                data={calculateAppointmentTrends()} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: { beginAtZero: true }
                  }
                }} 
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body" style={{ height: '300px' }}>
              <h5 className="card-title">Appointment Status Distribution</h5>
              <Doughnut 
                data={appointmentStatus}
                options={{
                  responsive: true,
                  maintainAspectRatio: false
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body" style={{ height: '300px' }}>
              <h5 className="card-title">Doctor Workload Distribution</h5>
              <Bar 
                data={calculateDoctorWorkload()} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: { beginAtZero: true }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Recent Patients</h5>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Expected Delivery</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientsData.slice(0, 5).map((patient, index) => (
                      <tr key={index}>
                        <td>{patient.name}</td>
                        <td>{patient.email}</td>
                        <td>{new Date(patient.expectedDelivery).toLocaleDateString()}</td>
                        <td>
                          <span className="badge bg-success">Active</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panalytics;

