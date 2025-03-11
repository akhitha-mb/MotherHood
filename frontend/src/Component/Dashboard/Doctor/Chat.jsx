import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const ChatApp = () => {
  const [doctors, setDoctors] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.post("http://localhost:8080/api/patients/fetch-appoinment-doc", {token})
        setDoctors(res.data.doctors);
        console.log(res.data.doctors)
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (doctorId) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/patients/loadchat/${doctorId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await response.json();
          setMessages(data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [doctorId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:8080/api/patients/savechat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ receiverId, message })
      });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Chat App</h2>
      <div className="card">
        <div className="card-body">
          <select className="form-control mb-3" onChange={(e) => {
            setDoctorId(e.target.value);
            setReceiverId(e.target.value);
          }}>
            <option value="">Select Any Doctor</option>
            {doctors.map((item) => (
              <option value={item._id} key={item._id}>{item.name}</option>
            ))}
          </select>
          <div className="border p-3 mb-3" style={{ height: '300px', overflowY: 'scroll' }}>
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 p-2 border ${msg.senderId === doctorId ? 'bg-light' : 'bg-primary text-white'}`}>
                {msg.message}
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage}>
            <div className="mb-3">
              <textarea className="form-control" placeholder="Type your message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={!doctorId}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
