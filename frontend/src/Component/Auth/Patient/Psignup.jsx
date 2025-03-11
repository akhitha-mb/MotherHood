import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Psignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    expectedDelivery: '',
    lifestyleDiseases: '',
    checkupDates: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // List of pregnancy-related lifestyle diseases
  const pregnancyDiseases = [
    "Gestational Diabetes",
    "Preeclampsia",
    "Anemia",
    "Thyroid Disorders",
    "Hypertension",
    "Obesity & Weight-Related Issues",
    "Infections (UTI, BV)",
    "None"
  ];

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:8080/api/patients/signup', formData);
      setSuccess('Signup successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000); // Redirect after 2 sec
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="text-center text-primary">Sign Up</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleSignup}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Date of Birth</label>
                  <input type="date" className="form-control" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Expected Delivery Date</label>
                  <input type="date" className="form-control" name="expectedDelivery" value={formData.expectedDelivery} onChange={handleChange} />
                </div>

                {/* Dropdown for Pregnancy-Related Lifestyle Diseases */}
                <div className="mb-3">
                  <label className="form-label">Pregnancy-Related Lifestyle Diseases</label>
                  <select className="form-select" name="lifestyleDiseases" value={formData.lifestyleDiseases} onChange={handleChange}>
                    <option value="">Select a condition</option>
                    {pregnancyDiseases.map((disease, index) => (
                      <option key={index} value={disease}>{disease}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Checkup Dates</label>
                  <input type="date" className="form-control" name="checkupDates" value={formData.checkupDates} onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
              </form>

              <p className="text-center mt-3">
                Already have an account? <a href="/login" className="text-primary fw-bold">Login here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Psignup;
