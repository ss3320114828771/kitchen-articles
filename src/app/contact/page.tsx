'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (formData.phone && !/^[\d\s\+\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    
    if (!formData.subject) {
      newErrors.subject = 'Please select a subject'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    }, 1500)
  }

  // Contact info cards
  const contactInfo = [
    {
      icon: '📍',
      title: 'Visit Us',
      details: ['123 Tech Street', 'Innovation City', 'Pakistan']
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: ['+92 300 1234567', '+92 321 7654321', 'Mon-Fri 9am-6pm']
    },
    {
      icon: '✉️',
      title: 'Email Us',
      details: ['info@kitechn.com', 'support@kitechn.com', '24/7 Support']
    },
    {
      icon: '🕒',
      title: 'Business Hours',
      details: ['Monday-Friday: 9am-6pm', 'Saturday: 10am-4pm', 'Sunday: Closed']
    }
  ]

  // FAQ items
  const faqs = [
    {
      q: 'How long does shipping take?',
      a: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days.'
    },
    {
      q: 'What is your return policy?',
      a: 'We offer 30-day returns on all products. Items must be unused and in original packaging.'
    },
    {
      q: 'Do you ship internationally?',
      a: 'Yes, we ship to most countries worldwide. International shipping takes 7-14 business days.'
    },
    {
      q: 'How can I track my order?',
      a: 'Once your order ships, you\'ll receive a tracking number via email.'
    }
  ]

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a, #1e1b4b)'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(15,23,42,0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #f472b6, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Kitechn
            </span>
          </Link>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</Link>
            <Link href="/products" style={{ color: '#9ca3af', textDecoration: 'none' }}>Products</Link>
            <Link href="/about" style={{ color: '#9ca3af', textDecoration: 'none' }}>About</Link>
            <Link href="/contact" style={{ color: '#c084fc', textDecoration: 'none' }}>Contact</Link>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(168,85,247,0.1))',
        padding: '4rem 2rem',
        textAlign: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #60a5fa, #c084fc)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          Get in Touch
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {contactInfo.map((info, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '1rem',
                padding: '1.5rem',
                border: '1px solid rgba(255,255,255,0.1)',
                textAlign: 'center',
                transition: 'transform 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{info.icon}</div>
              <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {info.title}
              </h3>
              {info.details.map((detail, i) => (
                <p key={i} style={{ color: '#9ca3af', fontSize: '0.875rem', margin: '0.25rem 0' }}>
                  {detail}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '2rem'
        }}>
          {/* Contact Form */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '1rem',
            padding: '2rem',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
              Send us a Message
            </h2>

            {submitted && (
              <div style={{
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.3)',
                borderRadius: '0.5rem',
                padding: '1rem',
                marginBottom: '1.5rem',
                color: '#10b981',
                textAlign: 'center'
              }}>
                ✓ Thank you for contacting us! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.5rem' }}>
                  Full Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Hafiz Sajid Syed"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: `1px solid ${errors.name ? '#ef4444' : 'rgba(255,255,255,0.2)'}`,
                    borderRadius: '0.5rem',
                    color: 'white',
                    outline: 'none'
                  }}
                />
                {errors.name && (
                  <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.5rem' }}>
                  Email Address <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hafizsajidsyed@gmail.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: `1px solid ${errors.email ? '#ef4444' : 'rgba(255,255,255,0.2)'}`,
                    borderRadius: '0.5rem',
                    color: 'white',
                    outline: 'none'
                  }}
                />
                {errors.email && (
                  <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.5rem' }}>
                  Phone Number <span style={{ color: '#9ca3af' }}>(optional)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+92 300 1234567"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: `1px solid ${errors.phone ? '#ef4444' : 'rgba(255,255,255,0.2)'}`,
                    borderRadius: '0.5rem',
                    color: 'white',
                    outline: 'none'
                  }}
                />
                {errors.phone && (
                  <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.5rem' }}>
                  Subject <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: `1px solid ${errors.subject ? '#ef4444' : 'rgba(255,255,255,0.2)'}`,
                    borderRadius: '0.5rem',
                    color: formData.subject ? 'white' : '#9ca3af',
                    outline: 'none'
                  }}
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="sales">Sales Question</option>
                  <option value="billing">Billing Issue</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="feedback">Feedback</option>
                </select>
                {errors.subject && (
                  <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.5rem' }}>
                  Message <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="How can we help you?"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: `1px solid ${errors.message ? '#ef4444' : 'rgba(255,255,255,0.2)'}`,
                    borderRadius: '0.5rem',
                    color: 'white',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                />
                {errors.message && (
                  <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                  border: 'none',
                  borderRadius: '0.75rem',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '1rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                {loading ? (
                  <>
                    <span style={{
                      width: '1rem',
                      height: '1rem',
                      border: '2px solid white',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></span>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Map & FAQ */}
          <div>
            {/* Map */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '1rem',
              padding: '2rem',
              border: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '2rem'
            }}>
              <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Our Location
              </h2>
              <div style={{
                background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                borderRadius: '0.5rem',
                height: '250px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>
                🗺️
              </div>
              <p style={{ color: '#d1d5db', marginBottom: '0.5rem' }}>
                <strong style={{ color: 'white' }}>Headquarters:</strong> 123 Tech Street, Innovation City, Pakistan
              </p>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                * Visit us during business hours or schedule an appointment.
              </p>
            </div>

            {/* FAQ */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '1rem',
              padding: '2rem',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Frequently Asked Questions
              </h2>
              
              {faqs.map((faq, index) => (
                <div key={index} style={{
                  marginBottom: index < faqs.length - 1 ? '1rem' : 0,
                  paddingBottom: index < faqs.length - 1 ? '1rem' : 0,
                  borderBottom: index < faqs.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none'
                }}>
                  <h3 style={{ color: 'white', fontWeight: '500', marginBottom: '0.5rem' }}>
                    {faq.q}
                  </h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                    {faq.a}
                  </p>
                </div>
              ))}
              
              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'rgba(168,85,247,0.1)',
                borderRadius: '0.5rem',
                textAlign: 'center'
              }}>
                <p style={{ color: '#c084fc', fontSize: '0.875rem' }}>
                  Still have questions? Contact us directly!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div style={{
          marginTop: '3rem',
          textAlign: 'center'
        }}>
          <h2 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
            Connect With Us
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
            {[
              { icon: '📘', name: 'Facebook', color: '#3b82f6' },
              { icon: '🐦', name: 'Twitter', color: '#1da1f2' },
              { icon: '📸', name: 'Instagram', color: '#e4405f' },
              { icon: '🔗', name: 'LinkedIn', color: '#0a66c2' },
              { icon: '📱', name: 'WhatsApp', color: '#25d366' },
              { icon: '▶️', name: 'YouTube', color: '#ff0000' }
            ].map((social, index) => (
              <a
                key={index}
                href="#"
                style={{
                  textDecoration: 'none',
                  color: '#9ca3af',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'transform 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)'
                  e.currentTarget.style.color = social.color
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.color = '#9ca3af'
                }}
              >
                <span style={{ fontSize: '2rem' }}>{social.icon}</span>
                <span style={{ fontSize: '0.75rem' }}>{social.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Admin Info */}
        <div style={{
          marginTop: '3rem',
          padding: '2rem',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '1rem',
          border: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '4rem',
            height: '4rem',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            margin: '0 auto 1rem'
          }}>
            HS
          </div>
          <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600' }}>
            Hafiz Sajid Syed
          </h3>
          <p style={{ color: '#c084fc', marginBottom: '0.5rem' }}>Administrator</p>
          <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>hafizsajidsyed@gmail.com</p>
          <p style={{ color: '#4b5563', fontSize: '0.875rem' }}>
            Available for business inquiries and partnerships
          </p>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  )
}