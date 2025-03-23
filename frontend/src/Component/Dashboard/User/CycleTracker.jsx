import React, { useState } from 'react';

const CycleTracker = () => {
  const [periodStartDate, setPeriodStartDate] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [periodDuration, setPeriodDuration] = useState(5);
  const [intercourseDate, setIntercourseDate] = useState("");
  
  const [results, setResults] = useState({
    nextPeriod: null,
    fertileWindow: null,
    ovulationDate: null,
    safeDays: null,
  });
  
  const [genderPrediction, setGenderPrediction] = useState(null);

  const calculateCycle = () => {
    if (!periodStartDate) {
      alert("Please select the start date of your last period");
      return;
    }

    const periodStart = new Date(periodStartDate);
    
    // Calculate next period
    const nextPeriodDate = new Date(periodStart);
    nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);
    
    // Calculate ovulation date (typically midway through cycle)
    const ovulationDate = new Date(periodStart);
    ovulationDate.setDate(ovulationDate.getDate() + Math.floor(cycleLength / 2));
    
    // Calculate fertile window (5 days before ovulation to 1 day after)
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(fertileStart.getDate() - 5);
    
    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(fertileEnd.getDate() + 1);
    
    // Calculate safe days (after period ends to 3 days later)
    const safeStart = new Date(periodStart);
    safeStart.setDate(safeStart.getDate() + periodDuration);
    
    const safeEnd = new Date(safeStart);
    safeEnd.setDate(safeEnd.getDate() + 3);
    
    setResults({
      nextPeriod: formatDate(nextPeriodDate),
      fertileWindow: `${formatDate(fertileStart)} to ${formatDate(fertileEnd)}`,
      ovulationDate: formatDate(ovulationDate),
      safeDays: `${formatDate(safeStart)} to ${formatDate(safeEnd)}`,
      ovulationDateObj: ovulationDate // Store the actual date object for gender prediction
    });
  };

  const predictGender = () => {
    if (!results.ovulationDateObj || !intercourseDate) {
      alert("Please calculate your cycle first and select an intercourse date");
      return;
    }

    const intercourse = new Date(intercourseDate);
    const ovulation = results.ovulationDateObj;
    
    // Calculate days difference
    const timeDiff = ovulation.getTime() - intercourse.getTime();
    const daysDifference = Math.floor(timeDiff / (1000 * 3600 * 24));
    
    let prediction;
    if (0 <= daysDifference && daysDifference <= 1) {
      prediction = "You are more likely to conceive a boy. (75% probability)";
    } else if (2 <= daysDifference && daysDifference <= 5) {
      prediction = "You are more likely to conceive a girl. (80% probability)";
    } else {
      prediction = "Intercourse timing is outside the estimated fertile window.";
    }
    
    setGenderPrediction(prediction);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card mb-4 shadow">
            <div className="card-header bg-pink bg-opacity-25 text-center">
              <h2 className="card-title mb-0">Period Tracker & Pregnancy Gender Predictor</h2>
              {/* <small className="text-muted fst-italic">(SHETTLES METHOD)</small> */}
            </div>
            
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="periodStartDate" className="form-label">Start Date of Last Period:</label>
                <input
                  id="periodStartDate"
                  type="date"
                  className="form-control"
                  value={periodStartDate}
                  onChange={(e) => setPeriodStartDate(e.target.value)}
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="cycleLength" className="form-label">Average Cycle Length (days):</label>
                <input
                  id="cycleLength"
                  type="number"
                  className="form-control"
                  min="20"
                  max="45"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(parseInt(e.target.value))}
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="periodDuration" className="form-label">Period Duration (days):</label>
                <input
                  id="periodDuration"
                  type="number"
                  className="form-control"
                  min="1"
                  max="10"
                  value={periodDuration}
                  onChange={(e) => setPeriodDuration(parseInt(e.target.value))}
                />
              </div>
              
              <button 
                className="btn btn-danger w-100 mb-4"
                onClick={calculateCycle}
              >
                Calculate Cycle
              </button>
              
              {results.nextPeriod && (
                <div className="alert alert-light mb-4">
                  <p className="mb-2">
                    <i className="bi bi-calendar-event text-danger me-2"></i>
                    <strong>Safe Days:</strong> {results.safeDays}
                  </p>
                  <p className="mb-2">
                    <i className="bi bi-calendar-event text-danger me-2"></i>
                    <strong>Estimated Ovulation Date:</strong> {results.ovulationDate}
                  </p>
                  <p className="mb-2">
                    <i className="bi bi-calendar-event text-danger me-2"></i>
                    <strong>Fertile Window:</strong> {results.fertileWindow}
                  </p>
                  <p className="mb-0">
                    <i className="bi bi-calendar-event text-danger me-2"></i>
                    <strong>Next Period:</strong> {results.nextPeriod}
                  </p>
                </div>
              )}
              
              <div className="mb-3">
                <label htmlFor="intercourseDate" className="form-label">Date of Intercourse:</label>
                <input
                  id="intercourseDate"
                  type="date"
                  className="form-control"
                  value={intercourseDate}
                  onChange={(e) => setIntercourseDate(e.target.value)}
                />
              </div>
              
              <button 
                className="btn btn-primary w-100 mb-3"
                onClick={predictGender}
                disabled={!results.ovulationDate}
              >
                Predict Gender
              </button>
              
              {genderPrediction && (
                <div className="alert alert-info">
                  <p className="mb-0">{genderPrediction}</p>
                </div>
              )}
            </div>
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleTracker;