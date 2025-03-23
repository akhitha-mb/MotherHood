import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import maternal from '../../assets/maternal.jpg';

const Index = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.post('http://localhost:8080/api/admin/fetchDoc');
        // Limit to 4 doctors
        setDoctors(response.data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div style={{ 
      '--primary-color': '#FF69B4',
      '--secondary-color': '#4A90E2',
      '--accent-color': '#FFB6C1',
      '--gradient': 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))'
    }}>
      {/* Hero Section */}
      <section className="min-vh-100 d-flex align-items-center position-relative overflow-hidden" 
        style={{ 
          background: 'var(--gradient)',
          color: 'white'
        }}>
        <div className="position-absolute w-100 h-100" style={{
          background: 'url("/pattern.png")',
          opacity: '0.1',
          zIndex: 1
        }}></div>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center">
            <div className="col-md-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="display-3 fw-bold mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
                  Caring for Two Hearts at Once
                </h1>
                <p className="lead mb-4 fs-4">
                  Expert maternity care and support throughout your pregnancy journey
                </p>
                <button className="btn btn-light btn-lg rounded-pill px-5 py-3 shadow-lg">
                  Book Appointment
                </button>
              </motion.div>
            </div>
            <div className="col-md-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <img 
                  src={maternal} 
                  alt="Mother and Child" 
                  className="img-fluid rounded-3 shadow-lg"
                  style={{ transform: 'rotate(2deg)' }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Updated with new styling */}
      <section className="py-5" style={{ background: '#f8f9fa' }}>
        <div className="container py-5">
          <motion.h2 
            className="text-center display-4 mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Services
          </motion.h2>
          <div className="row g-4">
            {[
              {
                title: 'Prenatal Care',
                description: 'Comprehensive prenatal care and monitoring',
                icon: '👶'
              },
              {
                title: 'Delivery Services',
                description: 'Safe and comfortable delivery experience',
                icon: '🏥'
              },
              {
                title: 'Postnatal Support',
                description: 'Complete postnatal care and guidance',
                icon: '❤️'
              }
            ].map((service, index) => (
              <div className="col-md-4" key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="card h-100 p-4 shadow-sm"
                >
                  <div className="display-4 mb-3 text-center">{service.icon}</div>
                  <h3 className="h5 fw-bold mb-2">{service.title}</h3>
                  <p className="text-muted">{service.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section - Updated with new styling */}
      <section className="py-5" style={{ background: 'var(--gradient)', color: 'white' }}>
        <div className="container py-5">
          <motion.h2 
            className="text-center display-4 mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Meet Our Experts
          </motion.h2>
          <div className="row g-4">
            {doctors.map((doctor, index) => (
              <div className="col-md-3" key={index}>
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                  }}
                  className="card h-100 border-0 shadow-lg"
                  style={{ borderRadius: '15px', overflow: 'hidden' }}
                >
                  <div className="card-body p-4">
                    <div className="text-center mb-3">
                      <div className="rounded-circle bg-light mx-auto mb-3" 
                        style={{ width: '80px', height: '80px', lineHeight: '80px' }}>
                        👩‍⚕️
                      </div>
                      <h3 className="h5 text-dark fw-bold">{doctor.name}</h3>
                      <p className="text-muted mb-2">{doctor.specialization}</p>
                      <p className="small text-muted">{doctor.email}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section - Updated with new styling */}
      <section className="py-5 position-relative" style={{ background: '#f8f9fa' }}>
        <div className="container py-5">
          <motion.h2 
            className="text-center display-4 mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            What Mothers Say
          </motion.h2>
          <div className="row g-4">
            {[
              {
                name: 'Sarah Johnson',
                review: 'Amazing care throughout my pregnancy journey!',
                rating: 5
              },
              {
                name: 'Emily Davis',
                review: 'The doctors and staff are incredibly supportive.',
                rating: 5
              }
            ].map((review, index) => (
              <div className="col-md-6" key={index}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="card h-100 p-4 shadow-sm"
                >
                  <div className="mb-3 text-warning">
                    {'⭐'.repeat(review.rating)}
                  </div>
                  <p className="text-muted mb-3">{review.review}</p>
                  <p className="fw-bold mb-0">{review.name}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Updated with new styling */}
      <section className="py-5" style={{ background: 'var(--gradient)', color: 'white' }}>
        <div className="container py-5">
          <motion.h2 
            className="text-center display-4 mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Why Choose Us
          </motion.h2>
          <div className="row g-4">
            {[
              {
                title: '24/7 Support',
                description: 'Round-the-clock medical assistance'
              },
              {
                title: 'Expert Team',
                description: 'Highly qualified healthcare professionals'
              },
              {
                title: 'Modern Facilities',
                description: 'State-of-the-art medical equipment'
              },
              {
                title: 'Personalized Care',
                description: 'Tailored care plans for each patient'
              }
            ].map((feature, index) => (
              <div className="col-md-3" key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4"
                >
                  <h3 className="h5 fw-bold mb-2">{feature.title}</h3>
                  <p className="text-muted">{feature.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - New Addition */}
      <section className="py-5" style={{ background: '#f8f9fa' }}>
        <div className="container py-5">
          <motion.h2 
            className="text-center display-4 mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contact Us
          </motion.h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card border-0 shadow-lg">
                <div className="card-body p-5">
                  <div className="text-center mb-4">
                    <p className="lead">Have questions? We're here to help!</p>
                  </div>
                  <div className="d-flex justify-content-around">
                    <div className="text-center">
                      <div className="h1 mb-2">📞</div>
                      <h5>Call Us</h5>
                      <p className="text-muted">+1 234 567 890</p>
                    </div>
                    <div className="text-center">
                      <div className="h1 mb-2">✉️</div>
                      <h5>Email Us</h5>
                      <p className="text-muted">contact@motherhood.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;