import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/patients/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/patient-dashboard'); // Redirect to dashboard after login
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4 rounded" style={{ width: '400px' }}>
        <h2 className="text-center text-primary fw-bold">Welcome Back</h2>
        <p className="text-center text-muted">Sign in to continue</p>
        
        {error && <div className="alert alert-danger text-center">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold">Login</button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-1">Don't have an account?</p>
          <button className="btn btn-outline-secondary w-100" onClick={() => navigate('/patient-signup')}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
