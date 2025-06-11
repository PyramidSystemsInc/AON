import React, { useState, useEffect } from 'react'
import styles from './Contact.module.css'

interface LinkedInUser {
  firstName: string
  lastName: string
  email: string
  organization: string
}

const Contact: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [linkedInUser, setLinkedInUser] = useState<LinkedInUser>({
    firstName: '',
    lastName: '',
    email: '',
    organization: ''
  })
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    location: '',
    countryCode: '',
    phone: '',
    organization: '',
    industry: '',
    revenue: '',
    employees: '',
    message: ''
  })

  useEffect(() => {
    // Check if user is authenticated
    const urlParams = new URLSearchParams(window.location.search)
    const authenticated = urlParams.get('authenticated') === 'true'
    setIsAuthenticated(authenticated)

    if (authenticated) {
        fetch('/linkedin/user')
          .then(response => response.json())
          .then((data: LinkedInUser) => {
            setLinkedInUser(data)
            setFormData(prev => ({
              ...prev,
              firstName: data.firstName || '',
              lastName: data.lastName || '',
              email: data.email || '',
              organization: data.organization || ''
            }))
          })
          .catch(error => console.error('Error fetching user data:', error))
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/submit-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.success) {
        alert('Thank you! Your information has been submitted successfully.')
        window.location.href = result.redirect
      } else {
        alert('There was an error submitting your information. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('There was an error submitting your information. Please try again.')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>I'm interested in</h1>
          <h2>Talking to You</h2>
        </div>
        <div className={styles.loginSection}>
          <p>Please sign in with LinkedIn to continue</p>
          <a href="/linkedin/login" className={styles.linkedinBtn}>
            Sign in with LinkedIn
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>I'm interested in</h1>
        <h2>Talking to You</h2>
      </div>
      
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.sectionTitle}>About You</div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="jobTitle">Job Title *</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Business Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="location">Location *</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Location</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="countryCode">Country Code*</label>
              <select
                id="countryCode"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleInputChange}
                required
              >
                <option value="">Select</option>
                <option value="+1">+1 (US/CA)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+61">+61 (AU)</option>
                <option value="+49">+49 (DE)</option>
                <option value="+33">+33 (FR)</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number*</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className={styles.sectionTitle}>About Your Business</div>
          
          <div className={styles.formGroup}>
            <label htmlFor="organization">Organization Name *</label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="industry">Industry *</label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Industry</option>
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Financial Services</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="retail">Retail</option>
              <option value="education">Education</option>
              <option value="government">Government</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="revenue">Annual Revenue *</label>
            <select
              id="revenue"
              name="revenue"
              value={formData.revenue}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Revenue Range</option>
              <option value="under-1m">Under $1M</option>
              <option value="1m-10m">$1M - $10M</option>
              <option value="10m-100m">$10M - $100M</option>
              <option value="100m-1b">$100M - $1B</option>
              <option value="over-1b">Over $1B</option>
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="employees">Employee Headcount *</label>
            <select
              id="employees"
              name="employees"
              value={formData.employees}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Employee Count</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="201-1000">201-1000</option>
              <option value="1001-5000">1001-5000</option>
              <option value="5000+">5000+</option>
            </select>
          </div>
          
          <div className={styles.sectionTitle}>How Can We Help?</div>
          
          <div className={styles.formGroup}>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Add a message"
            />
          </div>
          
          <div className={styles.privacyText}>
            We will use the information you provide on this form to respond to your specific 
            request. Submitting this form will not subscribe you to receiving marketing 
            communications from us, and all information provided will be managed in accordance 
            with <a href="#" target="_blank">Global privacy statement</a>.
          </div>
          
          <button type="submit" className={styles.submitBtn}>
            Submit →
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact 