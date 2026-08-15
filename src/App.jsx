import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    schoolName: '',
    name: '',
    contactNumber: '',
    email: '',
    message: ''
  })

  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      // Send to Vercel serverless function
      const response = await axios.post('/api/contact', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 200) {
        setStatus('success')
        setMessage('✅ Thank you! Your enquiry has been submitted successfully. Our team will contact you soon.')
        
        // Reset form
        setFormData({
          schoolName: '',
          name: '',
          contactNumber: '',
          email: '',
          message: ''
        })

        // Clear success message after 5 seconds
        setTimeout(() => {
          setStatus('idle')
          setMessage('')
        }, 5000)
      }
    } catch (error) {
      console.error('Error:', error)
      setStatus('error')
      setMessage('❌ Something went wrong. Please try again.')
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    }
  }

  return (
    <div className="container">
      <header className="header">
        <div className="logo-section">
          <div className="logo">VisionX</div>
          <h1>Partner With VisionX</h1>
        </div>
        <p className="subtitle">Interested in bringing VisionX training to your school? Fill in your details and our team will get in touch with you.</p>
      </header>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="schoolName">School Name *</label>
          <input
            type="text"
            id="schoolName"
            name="schoolName"
            placeholder="Enter your school name"
            value={formData.schoolName}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number *</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            placeholder="Enter your contact number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message (Optional)</label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell us how we can help..."
            value={formData.message}
            onChange={handleChange}
            rows="4"
            disabled={status === 'loading'}
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Sending...' : 'Submit Enquiry'}
        </button>

        {message && (
          <div className={`status-message ${status}`}>
            {message}
          </div>
        )}
      </form>

      <footer className="footer">
        <p>&copy; 2024 VisionX. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
