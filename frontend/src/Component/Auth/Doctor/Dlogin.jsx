import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dlogin = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });    
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
console.log(formData)
        try {
            const response = await fetch('http://localhost:8080/api/doctor/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data.data)
                if(data.data.status === "Approved"){
                    localStorage.setItem('token', data.token); // Store token
                    alert('Login successful');
                    navigate('/doctor-dashboard'); // Redirect to dashboard
                } else{
                    setError('Your account is not yet approved. Please wait for approval')
                }
            } else {
                setError(data.message || 'Invalid login credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Server error. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4 shadow">
                        <h2 className="text-center">Doctor Login</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </form>
                        <p className="mt-3 text-center">
                            Don't have an account? <a href="/doctor-signup">Sign up</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dlogin;



