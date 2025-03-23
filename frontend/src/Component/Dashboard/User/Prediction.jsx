import { useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

const validRanges = {
  Age: { min: 15, max: 50, label: 'Age (years)' },
  SystolicBP: { min: 80, max: 180, label: 'Systolic Blood Pressure (mmHg)' },
  DiastolicBP: { min: 50, max: 120, label: 'Diastolic Blood Pressure (mmHg)' },
  BS: { min: 0, max: 200, label: 'Blood Sugar (mg/dL)' },
  BodyTemp: { min: 35.0, max: 42.0, label: 'Body Temperature (°C)' },
  HeartRate: { min: 40, max: 140, label: 'Heart Rate (bpm)' }
}

function Prediction() {
  const [formData, setFormData] = useState({
    Age: '',
    SystolicBP: '',
    DiastolicBP: '',
    BS: '',
    BodyTemp: '',
    HeartRate: ''
  })
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const validateField = (name, value) => {
    const range = validRanges[name]
    const numValue = parseFloat(value)
    if (isNaN(numValue)) return `Please enter a valid number`
    if (numValue < range.min || numValue > range.max) {
      return `${range.label} must be between ${range.min} and ${range.max}`
    }
    return null
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError(validateField(name, value))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validate all fields before submission
    for (const [name, value] of Object.entries(formData)) {
      const fieldError = validateField(name, value)
      if (fieldError) {
        setError(fieldError)
        setLoading(false)
        return
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/predict', formData)
      setPrediction(response.data)
    } catch (err) {
      setError(err.response?.data?.details?.[0] || err.response?.data?.error || 'Something went wrong')
    }
    setLoading(false)
  }

  const getRiskColor = (riskLevel) => {
    const colors = {
      'low risk': 'success',
      'mid risk': 'warning',
      'high risk': 'danger'
    }
    return colors[riskLevel] || 'primary'
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Pregnancy Risk Prediction</h2>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {Object.keys(formData).map((field) => (
                    <div key={field} className="col-md-6 mb-3">
                      <label className="form-label" htmlFor={field}>
                        {validRanges[field].label}
                      </label>
                      <input
                        type="number"
                        step="any"
                        className="form-control"
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                        min={validRanges[field].min}
                        max={validRanges[field].max}
                      />
                      <small className="form-text text-muted">
                        Range: {validRanges[field].min} - {validRanges[field].max}
                      </small>
                    </div>
                  ))}
                </div>
                
                {error && (
                  <div className="alert alert-danger mt-3">{error}</div>
                )}

                <div className="text-center mt-4">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg px-5"
                    disabled={loading}
                  >
                    {loading ? 'Analyzing...' : 'Predict Risk'}
                  </button>
                </div>
              </form>

              {prediction && (
                <div className={`alert alert-${getRiskColor(prediction.risk_level)} mt-4`}>
                  <h4 className="alert-heading">Prediction Result</h4>
                  <p className="mb-0">Risk Level: {prediction.risk_level}</p>
                  <p className="mb-0">Confidence: {prediction.confidence}%</p>
                  <hr />
                  <p className="mb-0">Probability Distribution:</p>
                  <ul className="list-unstyled">
                    <li>Low Risk: {prediction.probabilities.low_risk}%</li>
                    <li>Medium Risk: {prediction.probabilities.mid_risk}%</li>
                    <li>High Risk: {prediction.probabilities.high_risk}%</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prediction