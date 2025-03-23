import React, { useState, useEffect } from "react";
import axios from "axios";
import fourWeek from '../../../assets/fourWeek.jpeg'
import eight from '../../../assets/eightweek (1).jpeg'
import twelve from '../../../assets/twelvemonth.jpeg'
import sixteen from '../../../assets/sixteenweek.jpeg'
import twenty from '../../../assets/twentyweek.jpeg'
import twentyfour from '../../../assets/twentyfour.jpeg'
import twentyeight from '../../../assets/twentyeight.jpeg'
import thirtytwo from '../../../assets/thirtytwo.jpeg'
import thirtysix from '../../../assets/thirtysix.jpeg'
import fourty from '../../../assets/fourtyweek.jpeg'
const More = () => {
  const [daysRemaining, setDaysRemaining] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(null);
  const [trimester, setTrimester] = useState("");
  const [doctorVisits, setDoctorVisits] = useState([]);
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState(null);
  const [fetalDevelopment, setFetalDevelopment] = useState({});

  // Fetal development information by week
  const fetalDevelopmentInfo = {
    4: {
      image: fourWeek,
      description: "Your baby is about the size of a poppy seed. The neural tube is forming, which will develop into the brain and spinal cord."
    },
    8: {
      image: eight,
      description: "Your baby is about the size of a kidney bean. All essential organs have begun to form."
    },
    12: {
      image: twelve,
      description: "Your baby is about the size of a lime. The baby's reflexes are developing, and they may start to move."
    },
    16: {
      image: sixteen,
      description: "Your baby is about the size of an avocado. The baby's eyes can make small movements, and the ears are in their final position."
    },
    20: {
      image: twenty,
      description: "Your baby is about the size of a banana. You might feel the baby move, and the gender can typically be determined."
    },
    24: {
      image: twentyfour,
      description: "Your baby is about the size of an ear of corn. The baby's face is fully formed, and they're starting to gain weight rapidly."
    },
    28: {
      image: twentyeight,
      description: "Your baby is about the size of an eggplant. Their eyes can open and close, and they can recognize your voice."
    },
    32: {
      image: thirtytwo,
      description: "Your baby is about the size of a squash. They're practicing breathing movements and can turn toward light sources."
    },
    36: {
      image: thirtysix,
      description: "Your baby is about the size of a head of romaine lettuce. They're getting ready for birth by moving into a head-down position."
    },
    40: {
      image: fourty,
      description: "Your baby is about the size of a small pumpkin. They're fully developed and ready to meet you!"
    }
  };

  useEffect(() => {
    const fetchExpectedDeliveryDate = async () => {
      try {
        const patientId = localStorage.getItem("token");
        const response = await axios.post("http://localhost:8080/api/health/expected-delivery", { patientId });

        if (response.data.patient && response.data.patient[0]?.expectedDelivery) {
          const fetchedDate = new Date(response.data.patient[0].expectedDelivery);
          setExpectedDeliveryDate(fetchedDate);
        }
      } catch (error) {
        console.error("Error fetching expected delivery date:", error);
      }
    };

    fetchExpectedDeliveryDate();
  }, []);

  useEffect(() => {
    if (!expectedDeliveryDate) return; // Only run calculations when date is fetched correctly

    const today = new Date();
    const diffTime = expectedDeliveryDate - today;
    const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysRemaining(remainingDays);

    // Calculate weeks of pregnancy (based on 40 weeks total)
    const totalDays = 280; // 40 weeks * 7 days
    const daysPassed = totalDays - remainingDays;
    const weeksPassed = Math.floor(daysPassed / 7);
    setCurrentWeek(weeksPassed);

    // Calculate trimester based on weeks
    if (weeksPassed < 13) {
      setTrimester("First Trimester");
    } else if (weeksPassed < 27) {
      setTrimester("Second Trimester");
    } else {
      setTrimester("Third Trimester");
    }

    // Get the appropriate fetal development information
    // Find the closest week in our fetalDevelopmentInfo object
    const availableWeeks = Object.keys(fetalDevelopmentInfo).map(Number);
    const closestWeek = availableWeeks.reduce((prev, curr) => {
      return (Math.abs(curr - weeksPassed) < Math.abs(prev - weeksPassed) ? curr : prev);
    });
    
    setFetalDevelopment({
      ...fetalDevelopmentInfo[closestWeek],
      week: closestWeek
    });

    // Generate doctor visit dates (every month until delivery)
    const visits = [];
    let visitDate = new Date(today);
    visitDate.setDate(1); // Start from the first of the month
    while (visitDate < expectedDeliveryDate) {
      visits.push(new Date(visitDate));
      visitDate.setMonth(visitDate.getMonth() + 1);
    }
    setDoctorVisits(visits);

  }, [expectedDeliveryDate]);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg mb-4">
        <div className="card-header bg-primary text-white">
          <h3 className="text-center mb-0">Pregnancy Tracker</h3>
        </div>
        <div className="card-body">
          {expectedDeliveryDate ? (
            <div className="row">
              <div className="col-md-6">
                <div className="mb-4">
                  <h4 className="mb-3">Your Pregnancy Status</h4>
                  <p><strong>Current Week:</strong> Week {currentWeek} of pregnancy</p>
                  <p><strong>Trimester:</strong> {trimester}</p>
                  <p><strong>Expected Delivery Date:</strong> {formatDate(expectedDeliveryDate)}</p>
                  <p><strong>Days Remaining Until Delivery:</strong> {daysRemaining} days</p>
                </div>

                <div className="mb-4">
                  <h4 className="mb-3">Upcoming Doctor Visits</h4>
                  {doctorVisits.length > 0 ? (
                    <ul className="list-group">
                      {doctorVisits.map((date, index) => (
                        <li key={index} className="list-group-item">
                          {formatDate(date)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No upcoming doctor visits scheduled.</p>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="text-center mb-3">
                  <h4>Fetal Development: Week {fetalDevelopment.week}</h4>
                  <img 
                    src={fetalDevelopment.image} 
                    alt={`Fetal development at week ${fetalDevelopment.week}`} 
                    className="img-fluid rounded mb-3 mt-3"
                  />
                  <div className="card bg-light">
                    <div className="card-body">
                      <p className="mb-0">{fetalDevelopment.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading your pregnancy information...</p>
            </div>
          )}
        </div>
      </div>

      <div className="card shadow-lg">
        <div className="card-header bg-info text-white">
          <h4 className="mb-0">Pregnancy Timeline</h4>
        </div>
        <div className="card-body">
          <div className="progress" style={{ height: '2rem' }}>
            {currentWeek && (
              <>
                <div 
                  className="progress-bar bg-success" 
                  role="progressbar" 
                  style={{ width: `${(currentWeek / 40) * 100}%` }}
                  aria-valuenow={currentWeek} 
                  aria-valuemin="0" 
                  aria-valuemax="40"
                >
                  Week {currentWeek}
                </div>
                <div 
                  className="progress-bar bg-light text-dark" 
                  role="progressbar" 
                  style={{ width: `${((40 - currentWeek) / 40) * 100}%` }}
                  aria-valuenow={40 - currentWeek} 
                  aria-valuemin="0" 
                  aria-valuemax="40"
                >
                  {40 - currentWeek} weeks to go
                </div>
              </>
            )}
          </div>
          
          <div className="row mt-4">
            <div className="col-md-4 text-center">
              <div className={`card ${currentWeek < 13 ? 'border-primary' : ''}`}>
                <div className="card-body">
                  <h5 className="card-title">First Trimester</h5>
                  <p className="card-text">Weeks 1-12</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className={`card ${currentWeek >= 13 && currentWeek < 27 ? 'border-primary' : ''}`}>
                <div className="card-body">
                  <h5 className="card-title">Second Trimester</h5>
                  <p className="card-text">Weeks 13-26</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className={`card ${currentWeek >= 27 ? 'border-primary' : ''}`}>
                <div className="card-body">
                  <h5 className="card-title">Third Trimester</h5>
                  <p className="card-text">Weeks 27-40</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default More;