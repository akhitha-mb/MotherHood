import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dconfirm() {
  const [pendingDoctors, setPendingDoctors] = useState([]);

  useEffect(() => {
    fetchPendingDoctors();
  }, []);

  const fetchPendingDoctors = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/admin/fetchDoc');
      const pendingDocs = response.data.filter(doctor => doctor.status === 'Pending');
      setPendingDoctors(pendingDocs);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleApprove = async (doctorId) => {
    try {
      await axios.put(`http://localhost:8080/api/admin/updateDoc/${doctorId}`, {
        status: 'Approved'
      });
      // Refresh the list after approval
      fetchPendingDoctors();
    } catch (error) {
      console.error('Error approving doctor:', error);
    }
  };

  const handleReject = async (doctorId) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/delDoc/${doctorId}`);
      // Refresh the list after rejection
      fetchPendingDoctors();
    } catch (error) {
      console.error('Error rejecting doctor:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Doctor Approval Requests</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialization</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingDoctors.map((doctor) => (
              <tr key={doctor._id}>
                <td>{doctor.name}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.email}</td>
                <td>{doctor.phone}</td>
                <td>
                  <button
                    className="btn btn-success me-2"
                    onClick={() => handleApprove(doctor._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleReject(doctor._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {pendingDoctors.length === 0 && (
          <div className="text-center p-3">
            No pending doctor approval requests
          </div>
        )}
      </div>
    </div>
  );
}
