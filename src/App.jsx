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

  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')
  const [submittedSnapshot, setSubmittedSnapshot] = useState(null)
  const [copiedEmail, setCopiedEmail] = useState(false)

  // Validation functions
  const validateField = (name, value) => {
    switch (name) {
      case 'schoolName':
        if (!value.trim()) return 'School name is required'
        if (value.trim().length < 3) return 'School name must be at least 3 characters'
        return ''
      case 'name':
        if (!value.trim()) return 'Contact person name is required'
        if (value.trim().length < 2) return 'Please enter a valid full name'
        return ''
      case 'contactNumber': {
        if (!value.trim()) return 'Contact number is required'
        const phoneDigits = value.replace(/\D/g, '')
        if (phoneDigits.length < 8 || phoneDigits.length > 15) {
          return 'Please enter a valid phone number (8-15 digits)'
        }
        return ''
      }
      case 'email': {
        if (!value.trim()) return 'Email address is required'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value.trim())) return 'Please enter a valid email address'
        return ''
      }
      case 'message':
        if (value.length > 500) return 'Message cannot exceed 500 characters'
        return ''
      default:
        return ''
    }
  }

  const getErrors = () => {
    return {
      schoolName: validateField('schoolName', formData.schoolName),
      name: validateField('name', formData.name),
      contactNumber: validateField('contactNumber', formData.contactNumber),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message)
    }
  }

  const errors = getErrors()
  const hasErrors = Object.values(errors).some(err => err !== '')

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'message' && value.length > 500) return

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Mark all as touched for validation check
    setTouched({
      schoolName: true,
      name: true,
      contactNumber: true,
      email: true,
      message: true
    })

    if (hasErrors) {
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await axios.post('/api/contact', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 200 || response.data?.success) {
        setSubmittedSnapshot({ ...formData })
        setStatus('success')
        setFormData({
          schoolName: '',
          name: '',
          contactNumber: '',
          email: '',
          message: ''
        })
        setTouched({})
      }
    } catch (error) {
      console.error('Submission Error:', error)
      setStatus('error')
      const detail =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        'Unable to send your enquiry. Please check your internet connection or try again.'
      setErrorMessage(detail)
    }
  }

  const handleResetForm = () => {
    setStatus('idle')
    setSubmittedSnapshot(null)
    setErrorMessage('')
    setTouched({})
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('visionx236@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  return (
    <div className="app-wrapper">
      {/* Background Ambient Glow Orbs */}
      <div className="ambient-glow orb-indigo"></div>
      <div className="ambient-glow orb-purple"></div>
      <div className="ambient-glow orb-cyan"></div>
      <div className="grid-overlay"></div>

      <div className="page-container">
        {/* Navigation Bar */}
        <header className="navbar">
          <div className="brand-badge">
            <div className="logo-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            </div>
            <span className="brand-name">Vision<span className="brand-x">X</span></span>
          </div>

          <div className="nav-status-pill">
            <span className="status-dot"></span>
            <span>2024–2025 School Partnerships Open</span>
          </div>
        </header>

        {/* Main Content Split Grid */}
        <main className="main-grid">
          {/* Left Column: Value Proposition & Information */}
          <section className="hero-section">
            <div className="tag-pill">
              <span className="tag-icon">⚡</span>
              <span>Next-Gen Tech & AI Education</span>
            </div>

            <h1 className="hero-title">
              Empower Your Students with <span className="gradient-text">Future-Ready Skills</span>
            </h1>

            <p className="hero-description">
              Partner with VisionX to bring cutting-edge Robotics, Artificial Intelligence, and Coding programs directly to your school. We provide full-stack training, customized syllabi, and certified industry trainers.
            </p>

            {/* Feature Highlights */}
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon feature-icon-cyan">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                    <circle cx="12" cy="5" r="2"></circle>
                    <path d="M12 7v4"></path>
                    <line x1="8" y1="16" x2="8" y2="16"></line>
                    <line x1="16" y1="16" x2="16" y2="16"></line>
                  </svg>
                </div>
                <div className="feature-text">
                  <h3>Hands-on Robotics & AI</h3>
                  <p>Experiential STEM kits and practical lab setups designed for young innovators.</p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon feature-icon-purple">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="feature-text">
                  <h3>Certified Mentors</h3>
                  <p>Experienced technical instructors dedicated to inspiring and mentoring each student.</p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon feature-icon-indigo">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                </div>
                <div className="feature-text">
                  <h3>Recognized Certifications</h3>
                  <p>Give your students competitive credentials and portfolio-grade project certificates.</p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon feature-icon-emerald">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div className="feature-text">
                  <h3>Custom School Schedules</h3>
                  <p>Flexible workshop durations, weekend bootcamps, or integrated year-round modules.</p>
                </div>
              </div>
            </div>

            {/* Trust Metrics Bar */}
            <div className="trust-stats">
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Partner Schools</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">10k+</span>
                <span className="stat-label">Students Trained</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">99%</span>
                <span className="stat-label">Satisfaction Rate</span>
              </div>
            </div>

            {/* Quick Contact Card */}
            <div className="direct-contact-box">
              <div className="contact-info-left">
                <div className="contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <div className="contact-title">Direct Partnership Desk</div>
                  <div className="contact-email">visionx236@gmail.com</div>
                </div>
              </div>
              <button 
                type="button"
                className="copy-btn" 
                onClick={handleCopyEmail}
                title="Copy email to clipboard"
              >
                {copiedEmail ? '✓ Copied' : 'Copy Email'}
              </button>
            </div>
          </section>

          {/* Right Column: Interactive Form or Success State */}
          <section className="form-column">
            <div className="glass-card">
              {status === 'success' && submittedSnapshot ? (
                /* Success View */
                <div className="success-state" role="alert">
                  <div className="success-icon-wrapper">
                    <div className="success-glow"></div>
                    <svg className="success-svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>

                  <h2 className="success-title">Enquiry Received!</h2>
                  <p className="success-subtitle">
                    Thank you for reaching out, <span className="highlight-text">{submittedSnapshot.name}</span>. We have dispatched a confirmation email to <span className="highlight-text">{submittedSnapshot.email}</span>.
                  </p>

                  <div className="submitted-summary">
                    <div className="summary-row">
                      <span className="summary-label">Institution:</span>
                      <span className="summary-value">{submittedSnapshot.schoolName}</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-label">Contact Number:</span>
                      <span className="summary-value">{submittedSnapshot.contactNumber}</span>
                    </div>
                  </div>

                  <div className="next-steps-card">
                    <h4>What happens next?</h4>
                    <ul>
                      <li>
                        <span className="step-bullet">1</span>
                        <span>Our school partnership lead will review your requirements.</span>
                      </li>
                      <li>
                        <span className="step-bullet">2</span>
                        <span>You will receive a call within 24 business hours to schedule a curriculum demo.</span>
                      </li>
                    </ul>
                  </div>

                  <button 
                    type="button" 
                    className="submit-button reset-button"
                    onClick={handleResetForm}
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                /* Form View */
                <>
                  <div className="card-header">
                    <div className="form-badge">Institutional Enquiry</div>
                    <h2 className="form-title">Partner With VisionX</h2>
                    <p className="form-subtitle">
                      Complete this brief form to discuss workshop dates, syllabus alignment, or on-campus demo sessions.
                    </p>
                  </div>

                  {status === 'error' && errorMessage && (
                    <div className="error-banner" role="alert">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="enquiry-form" noValidate>
                    {/* School Name */}
                    <div className={`input-group ${touched.schoolName && errors.schoolName ? 'has-error' : ''}`}>
                      <label htmlFor="schoolName">
                        School / Institution Name <span className="req-star">*</span>
                      </label>
                      <div className="input-field-wrapper">
                        <span className="field-icon">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 21h18"></path>
                            <path d="M9 8h1"></path>
                            <path d="M9 12h1"></path>
                            <path d="M9 16h1"></path>
                            <path d="M14 8h1"></path>
                            <path d="M14 12h1"></path>
                            <path d="M14 16h1"></path>
                            <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path>
                          </svg>
                        </span>
                        <input
                          type="text"
                          id="schoolName"
                          name="schoolName"
                          autoComplete="organization"
                          placeholder="e.g. St. Xavier's International School"
                          value={formData.schoolName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={status === 'loading'}
                          aria-invalid={touched.schoolName && !!errors.schoolName}
                        />
                      </div>
                      {touched.schoolName && errors.schoolName && (
                        <p className="field-error-text">{errors.schoolName}</p>
                      )}
                    </div>

                    {/* Contact Person Name */}
                    <div className={`input-group ${touched.name && errors.name ? 'has-error' : ''}`}>
                      <label htmlFor="name">
                        Contact Person Name <span className="req-star">*</span>
                      </label>
                      <div className="input-field-wrapper">
                        <span className="field-icon">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </span>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          autoComplete="name"
                          placeholder="e.g. Dr. Priya Sharma / Principal"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={status === 'loading'}
                          aria-invalid={touched.name && !!errors.name}
                        />
                      </div>
                      {touched.name && errors.name && (
                        <p className="field-error-text">{errors.name}</p>
                      )}
                    </div>

                    {/* Phone & Email Row (Grid) */}
                    <div className="input-row">
                      {/* Contact Number */}
                      <div className={`input-group ${touched.contactNumber && errors.contactNumber ? 'has-error' : ''}`}>
                        <label htmlFor="contactNumber">
                          Phone Number <span className="req-star">*</span>
                        </label>
                        <div className="input-field-wrapper">
                          <span className="field-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                          </span>
                          <input
                            type="tel"
                            id="contactNumber"
                            name="contactNumber"
                            inputMode="tel"
                            autoComplete="tel"
                            placeholder="+91 98765 43210"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={status === 'loading'}
                            aria-invalid={touched.contactNumber && !!errors.contactNumber}
                          />
                        </div>
                        {touched.contactNumber && errors.contactNumber && (
                          <p className="field-error-text">{errors.contactNumber}</p>
                        )}
                      </div>

                      {/* Email Address */}
                      <div className={`input-group ${touched.email && errors.email ? 'has-error' : ''}`}>
                        <label htmlFor="email">
                          Email Address <span className="req-star">*</span>
                        </label>
                        <div className="input-field-wrapper">
                          <span className="field-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                              <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                          </span>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            inputMode="email"
                            autoComplete="email"
                            placeholder="principal@school.edu"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={status === 'loading'}
                            aria-invalid={touched.email && !!errors.email}
                          />
                        </div>
                        {touched.email && errors.email && (
                          <p className="field-error-text">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Message / Requirements */}
                    <div className="input-group">
                      <div className="label-with-counter">
                        <label htmlFor="message">Program Requirements / Message <span className="optional-tag">(Optional)</span></label>
                        <span className="char-counter">{formData.message.length}/500</span>
                      </div>
                      <div className="input-field-wrapper textarea-wrapper">
                        <span className="field-icon textarea-icon">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                          </svg>
                        </span>
                        <textarea
                          id="message"
                          name="message"
                          rows="3"
                          placeholder="Tell us about your student grades, preferred dates, or specific technical topics (AI, Robotics, IoT, Web)..."
                          value={formData.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={status === 'loading'}
                        ></textarea>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className={`submit-button ${status === 'loading' ? 'is-loading' : ''}`}
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? (
                        <>
                          <span className="button-spinner"></span>
                          <span>Submitting Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Partnership Enquiry</span>
                          <svg className="btn-arrow-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </>
                      )}
                    </button>

                    <div className="privacy-badge">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      <span>Your information is confidential and will never be shared.</span>
                    </div>
                  </form>
                </>
              )}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="footer-bar">
          <p>© {new Date().getFullYear()} VisionX Technologies. All rights reserved. Driving innovation in school education.</p>
        </footer>
      </div>
    </div>
  )
}

export default App
