import React, { useState, useEffect } from 'react'
import styles from './Contact.module.css'

interface LinkedInUser {
  firstName: string
  lastName: string
  email: string
  organization: string
  picture: string
  locale: string | { country: string; language: string }
  sub: string
}

const Contact: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [linkedInUser, setLinkedInUser] = useState<LinkedInUser>({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    picture: '',
    locale: '',
    sub: ''
  })
  const [error, setError] = useState('')

  useEffect(() => {
    // Parse URL parameters from hash (since we're using HashRouter)
    const hash = window.location.hash
    const urlParams = new URLSearchParams(hash.split('?')[1] || '')
    const success = urlParams.get('success') === 'true'
    const authenticated = urlParams.get('authenticated') === 'true'
    const errorParam = urlParams.get('error')

    console.log('Hash:', hash)
    console.log('URL Params:', urlParams.toString())
    console.log('Success:', success)
    console.log('Authenticated:', authenticated)
    console.log('Error:', errorParam)

    if (success) {
      setIsSuccess(true)
      setIsAuthenticated(true)
      fetch('/linkedin/user')
        .then(response => response.json())
        .then((data: LinkedInUser) => {
          console.log('LinkedIn user data:', data)
          if (data && Object.keys(data).length > 0) {
            setLinkedInUser(data)
          } else {
            console.log('Session data empty, but LinkedIn auth was successful')
          }
        })
        .catch(error => console.error('Error fetching user data:', error))
    } else if (authenticated) {
      setIsAuthenticated(true)
      fetch('/linkedin/user')
        .then(response => response.json())
        .then((data: LinkedInUser) => {
          setLinkedInUser(data)
        })
        .catch(error => console.error('Error fetching user data:', error))
    } else if (errorParam) {
      setError(errorParam)
    }
  }, [])

  const handleReturnToChat = () => {
    window.location.href = '/#/'
  }

  const formatLocale = (locale: string | { country: string; language: string }) => {
    if (typeof locale === 'string') {
      return locale
    } else if (locale && typeof locale === 'object') {
      return `${locale.language}-${locale.country}`
    }
    return ''
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Authentication Error</h1>
        </div>
        <div className={styles.errorSection}>
          <p>There was an error with LinkedIn authentication: {error}</p>
          <button onClick={() => window.location.href = '/linkedin/login'} className={styles.linkedinBtn}>
            Try Again
          </button>
          <button onClick={handleReturnToChat} className={styles.returnBtn}>
            Return to Chat
          </button>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Thank you!</h1>
          <h2>Information has been successfully collected</h2>
        </div>
        
        <div className={styles.successSection}>
          <div className={styles.userInfo}>
            <h3>Your LinkedIn Information:</h3>
            {linkedInUser.picture && (
              <img src={linkedInUser.picture} alt="Profile" className={styles.profilePicture} />
            )}
            <div className={styles.userDetails}>
              {linkedInUser.firstName && linkedInUser.lastName && (
                <p><strong>Name:</strong> {linkedInUser.firstName} {linkedInUser.lastName}</p>
              )}
              {linkedInUser.email && (
                <p><strong>Email:</strong> {linkedInUser.email}</p>
              )}
              {linkedInUser.locale && (
                <p><strong>Locale:</strong> {formatLocale(linkedInUser.locale)}</p>
              )}
              {linkedInUser.sub && (
                <p><strong>LinkedIn ID:</strong> {linkedInUser.sub}</p>
              )}
              {(!linkedInUser.firstName && !linkedInUser.lastName && !linkedInUser.email) && (
                <p>✅ Your LinkedIn information has been successfully saved.</p>
              )}
            </div>
          </div>
          
          <button onClick={handleReturnToChat} className={styles.returnBtn}>
            Return to Chat
          </button>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>I'm interested in</h1>
          <h2>Talking to Aon</h2>
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
        <h1>Processing...</h1>
      </div>
      <div className={styles.loginSection}>
        <p>Saving your information...</p>
      </div>
    </div>
  )
}

export default Contact 