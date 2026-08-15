import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
  const [formData, setFormData] = useState({
    schoolName: '',
    name: '',
    contactNumber: '',
    email: '',
    message: ''
  });

  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  // Validate individual field
  const validate = (field, value) => {
    switch (field) {
      case 'schoolName':
        if (!value.trim()) return 'School / Institution name is required';
        if (value.trim().length < 2) return 'Please enter a valid institution name';
        return '';
      case 'name':
        if (!value.trim()) return 'Contact person name is required';
        if (value.trim().length < 2) return 'Please enter a full name';
        return '';
      case 'contactNumber':
        if (!value.trim()) return 'Phone number is required';
        if (!/^[+]?[\d\s-]{8,15}$/.test(value.trim())) {
          return 'Please enter a valid phone number (8-15 digits)';
        }
        return '';
      case 'email':
        if (!value.trim()) return 'Email address is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Please enter a valid email address';
        }
        return '';
      case 'message':
        if (value.length > 500) return 'Message cannot exceed 500 characters';
        return '';
      default:
        return '';
    }
  };

  const errors = {
    schoolName: validate('schoolName', formData.schoolName),
    name: validate('name', formData.name),
    contactNumber: validate('contactNumber', formData.contactNumber),
    email: validate('email', formData.email),
    message: validate('message', formData.message)
  };

  const hasErrors = Object.values(errors).some((err) => err !== '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > 500) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      schoolName: true,
      name: true,
      contactNumber: true,
      email: true,
      message: true
    });

    if (hasErrors) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await axios.post('/api/contact', formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200 || response.data?.success) {
        setSubmittedData({ ...formData });
        setStatus('success');
        setFormData({
          schoolName: '',
          name: '',
          contactNumber: '',
          email: '',
          message: ''
        });
        setTouched({});
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Unable to send enquiry. Please check your network and try again.';
      setErrorMessage(message);
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setSubmittedData(null);
    setErrorMessage('');
    setTouched({});
  };

  return (
    <div className="page-wrapper">
      <main className="form-container">
        <div className="form-card">
          {status === 'success' && submittedData ? (
            /* Success Feedback View */
            <div className="success-view">
              <div className="success-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h2 className="success-title">Enquiry Submitted!</h2>
              <p className="success-desc">
                Thank you, <strong>{submittedData.name}</strong>. We've sent a confirmation email to <strong>{submittedData.email}</strong>.
              </p>

              <div className="summary-box">
                <div className="summary-item">
                  <span className="summary-label">Institution:</span>
                  <span className="summary-value">{submittedData.schoolName}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Phone:</span>
                  <span className="summary-value">{submittedData.contactNumber}</span>
                </div>
              </div>

              <div className="next-steps">
                <p className="next-steps-title">What's Next?</p>
                <p className="next-steps-desc">
                  Our academic partnership team will review your requirements and reach out within 24 hours to arrange an introductory demo.
                </p>
              </div>

              <button type="button" className="btn-secondary" onClick={handleReset}>
                Send Another Enquiry
              </button>
            </div>
          ) : (
            /* Main Form View */
            <>
              <div className="card-header">
                <span className="badge">INSTITUTIONAL ENQUIRY</span>
                <h1 className="form-title">Partner With VisionX</h1>
                <p className="form-subtitle">
                  Complete this brief form to discuss workshop dates, syllabus alignment, or on-campus demo sessions.
                </p>
              </div>

              {status === 'error' && (
                <div className="error-alert" role="alert">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="enquiry-form" noValidate>
                {/* School / Institution Name */}
                <div className={`form-group ${touched.schoolName && errors.schoolName ? 'has-error' : ''}`}>
                  <label htmlFor="schoolName">
                    School / Institution Name <span className="required-star">*</span>
                  </label>
                  <div className="input-wrapper">
                    <span className="input-icon">
                      {/* Building Icon */}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                        <path d="M9 22v-4h6v4" />
                        <path d="M8 6h.01" />
                        <path d="M16 6h.01" />
                        <path d="M8 10h.01" />
                        <path d="M16 10h.01" />
                        <path d="M8 14h.01" />
                        <path d="M16 14h.01" />
                      </svg>
                    </span>
                    <input
                      id="schoolName"
                      name="schoolName"
                      type="text"
                      placeholder="e.g. St. Xavier's International School"
                      value={formData.schoolName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={status === 'loading'}
                      autoComplete="organization"
                    />
                  </div>
                  {touched.schoolName && errors.schoolName && (
                    <span className="error-text">{errors.schoolName}</span>
                  )}
                </div>

                {/* Contact Person Name */}
                <div className={`form-group ${touched.name && errors.name ? 'has-error' : ''}`}>
                  <label htmlFor="name">
                    Contact Person Name <span className="required-star">*</span>
                  </label>
                  <div className="input-wrapper">
                    <span className="input-icon">
                      {/* User Icon */}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="e.g. Dr. Priya Sharma / Principal"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={status === 'loading'}
                      autoComplete="name"
                    />
                  </div>
                  {touched.name && errors.name && (
                    <span className="error-text">{errors.name}</span>
                  )}
                </div>

                {/* Phone & Email Row */}
                <div className="form-row">
                  {/* Phone Number */}
                  <div className={`form-group ${touched.contactNumber && errors.contactNumber ? 'has-error' : ''}`}>
                    <label htmlFor="contactNumber">
                      Phone Number <span className="required-star">*</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">
                        {/* Phone Icon */}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </span>
                      <input
                        id="contactNumber"
                        name="contactNumber"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={status === 'loading'}
                        autoComplete="tel"
                      />
                    </div>
                    {touched.contactNumber && errors.contactNumber && (
                      <span className="error-text">{errors.contactNumber}</span>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className={`form-group ${touched.email && errors.email ? 'has-error' : ''}`}>
                    <label htmlFor="email">
                      Email Address <span className="required-star">*</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">
                        {/* Mail Icon */}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </span>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="principal@school.edu"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={status === 'loading'}
                        autoComplete="email"
                      />
                    </div>
                    {touched.email && errors.email && (
                      <span className="error-text">{errors.email}</span>
                    )}
                  </div>
                </div>

                {/* Message / Requirements */}
                <div className="form-group">
                  <div className="label-row">
                    <label htmlFor="message">
                      Program Requirements / Message <span className="optional-tag">(Optional)</span>
                    </label>
                    <span className="char-counter">{formData.message.length}/500</span>
                  </div>
                  <div className="input-wrapper textarea-wrapper">
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      placeholder="Tell us about preferred topics (AI, Robotics, IoT), grades, or workshop dates..."
                      value={formData.message}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <span className="btn-spinner" />
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Partnership Enquiry</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  )}
                </button>

                {/* Privacy note */}
                <p className="privacy-note">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span>Your information is confidential and will only be used to contact you.</span>
                </p>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
