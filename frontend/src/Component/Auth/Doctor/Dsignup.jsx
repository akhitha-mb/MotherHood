import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dsignup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        specialization: '',
        phone: '',
        address: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const response = await fetch('http://localhost:8080/api/doctor/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                alert('Signup successful!');
                navigate('/doctor-login');
            } else {
                alert(data.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during signup.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Doctor Signup</h2>
            <form onSubmit={handleSubmit}>
                {['name', 'email', 'password', 'specialization', 'phone', 'address'].map((field) => (
                    <div className="mb-3" key={field}>
                        <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        <input
                            type={field === 'password' ? 'password' : 'text'}
                            className="form-control"
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            required
                        />
                    </div>
                ))}
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    );
};

export default Dsignup;
