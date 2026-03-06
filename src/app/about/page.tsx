'use client'

import { useState, useEffect } from 'react'

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('story')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 500)
  }, [])

  // Company stats
  const stats = [
    { label: 'Years Experience', value: '10+', icon: '⭐' },
    { label: 'Happy Customers', value: '50K+', icon: '😊' },
    { label: 'Products Sold', value: '100K+', icon: '📦' },
    { label: 'Team Members', value: '50+', icon: '👥' },
  ]

  // Team members
  const team = [
    { 
      name: 'Hafiz Sajid Syed', 
      role: 'Founder & CEO', 
      bio: 'Visionary leader with 15+ years in tech industry. Passionate about innovation and Islamic values.',
      image: 'HS',
      social: { twitter: '#', linkedin: '#', email: 'hafizsajidsyed@gmail.com' }
    },
    { 
      name: 'Fatima Ahmed', 
      role: 'Head of Operations', 
      bio: 'Expert in supply chain management and customer satisfaction. Ensures smooth business operations.',
      image: 'FA',
      social: { twitter: '#', linkedin: '#', email: 'fatima@kitechn.com' }
    },
    { 
      name: 'Ali Hassan', 
      role: 'Technical Lead', 
      bio: 'Full-stack developer with expertise in AI and quantum computing. Leads product development.',
      image: 'AH',
      social: { twitter: '#', linkedin: '#', email: 'ali@kitechn.com' }
    },
    { 
      name: 'Aisha Malik', 
      role: 'Customer Relations', 
      bio: 'Dedicated to providing exceptional support and building lasting customer relationships.',
      image: 'AM',
      social: { twitter: '#', linkedin: '#', email: 'aisha@kitechn.com' }
    },
  ]

  // Milestones
  const milestones = [
    { year: '2014', title: 'Company Founded', desc: 'Kitechn started in a small garage with big dreams' },
    { year: '2016', title: 'First Major Product', desc: 'Launched Quantum Processor X1 to critical acclaim' },
    { year: '2018', title: 'International Expansion', desc: 'Opened offices in Dubai and Singapore' },
    { year: '2020', title: 'AI Division Launched', desc: 'Entered the artificial intelligence market' },
    { year: '2022', title: '10K Customers Milestone', desc: 'Reached 10,000 happy customers worldwide' },
    { year: '2024', title: 'Innovation Award', desc: 'Received Tech Innovation Award for Quantum Security' },
  ]

  // Values
  const values = [
    { 
      title: 'Innovation', 
      desc: 'Pushing boundaries to create cutting-edge technology',
      icon: '💡',
      color: '#3b82f6'
    },
    { 
      title: 'Integrity', 
      desc: 'Conducting business with honesty and Islamic principles',
      icon: '🤝',
      color: '#10b981'
    },
    { 
      title: 'Excellence', 
      desc: 'Striving for the highest quality in everything we do',
      icon: '🏆',
      color: '#f59e0b'
    },
    { 
      title: 'Customer First', 
      desc: 'Putting our customers at the heart of every decision',
      icon: '❤️',
      color: '#ef4444'
    },
    { 
      title: 'Sustainability', 
      desc: 'Building technology that respects our planet',
      icon: '🌍',
      color: '#22c55e'
    },
    { 
      title: 'Community', 
      desc: 'Giving back to the community that supports us',
      icon: '👥',
      color: '#a855f7'
    },
  ]

  if (loading) {
    return (
      <main style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '3px solid rgba(255, 255, 255, 0.1)',
          borderTopColor: '#c084fc',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </main>
    )
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
      position: 'relative'
    }}>
      {/* Star Field Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      {/* Bismillah */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        paddingTop: '2rem'
      }}>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 5vw, 3rem)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          textAlign: 'center',
          padding: '1rem 0',
          background: 'linear-gradient(135deg, #86efac, #60a5fa, #c084fc)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'pulse 2s infinite'
        }}>
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </h1>
      </div>

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        padding: '3rem 1rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #60a5fa, #c084fc, #f472b6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              About Kitechn
            </span>
          </h2>
          <p style={{
            fontSize: '1.25rem',
            color: '#d1d5db',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.8'
          }}>
            Pioneering the future of technology with innovation, integrity, and Islamic values.
            We're not just building products; we're shaping tomorrow.
          </p>
        </div>

        {/* Stats Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '4rem'
        }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '1rem',
                padding: '2rem',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'transform 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)'
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(168, 85, 247, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>
                {stat.value}
              </div>
              <div style={{ color: '#9ca3af' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          {['story', 'mission', 'values', 'team'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.75rem 2rem',
                background: activeTab === tab ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: activeTab === tab ? '1px solid #c084fc' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '2rem',
                color: activeTab === tab ? '#c084fc' : '#d1d5db',
                fontSize: '1rem',
                fontWeight: activeTab === tab ? '600' : '400',
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.color = 'white'
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.color = '#d1d5db'
                }
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Story Tab */}
        {activeTab === 'story' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '2rem',
            padding: '3rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '1.5rem'
                }}>
                  Our Story
                </h3>
                <div style={{ color: '#d1d5db', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <p>
                    Kitechn was founded in 2014 by Hafiz Sajid Syed with a simple vision: 
                    to create technology that serves humanity while upholding Islamic values. 
                    What started as a small garage project has grown into a global technology leader.
                  </p>
                  <p>
                    Today, we're proud to serve over 50,000 customers worldwide, offering innovative 
                    products that range from quantum processors to AI-powered solutions. Our journey 
                    has been guided by the principles of integrity, excellence, and innovation.
                  </p>
                  <p>
                    Every product we create is infused with the spirit of Bismillah - we begin 
                    everything with the name of Allah, seeking His blessings in our endeavors.
                  </p>
                </div>
              </div>
              
              {/* Timeline */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '20px',
                  top: 0,
                  bottom: 0,
                  width: '2px',
                  background: 'linear-gradient(180deg, #3b82f6, #c084fc)',
                  borderRadius: '1px'
                }}></div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingLeft: '3rem' }}>
                  {milestones.map((item, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                      <div style={{
                        position: 'absolute',
                        left: '-3rem',
                        top: '0.5rem',
                        width: '1rem',
                        height: '1rem',
                        borderRadius: '50%',
                        background: index % 2 === 0 ? '#3b82f6' : '#c084fc',
                        border: '2px solid rgba(255, 255, 255, 0.2)'
                      }}></div>
                      <div style={{
                        display: 'inline-block',
                        padding: '0.25rem 1rem',
                        background: 'rgba(59, 130, 246, 0.1)',
                        borderRadius: '1rem',
                        color: '#3b82f6',
                        fontSize: '0.875rem',
                        marginBottom: '0.5rem'
                      }}>
                        {item.year}
                      </div>
                      <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '0.25rem' }}>
                        {item.title}
                      </h4>
                      <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mission Tab */}
        {activeTab === 'mission' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '2rem',
            padding: '3rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem'
            }}>
              <div>
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '1.5rem'
                }}>
                  Our Mission
                </h3>
                <p style={{
                  color: '#d1d5db',
                  fontSize: '1.25rem',
                  lineHeight: '1.8',
                  fontStyle: 'italic',
                  marginBottom: '2rem'
                }}>
                  "To empower humanity through innovative technology while staying true to Islamic principles 
                  and contributing positively to society."
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    'Develop cutting-edge technology accessible to all',
                    'Maintain the highest standards of quality and integrity',
                    'Create sustainable solutions for global challenges',
                    'Foster innovation through research and development',
                    'Build a community of tech enthusiasts and learners'
                  ].map((item, index) => (
                    <div key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <span style={{
                        width: '1.5rem',
                        height: '1.5rem',
                        borderRadius: '50%',
                        background: 'rgba(16, 185, 129, 0.1)',
                        color: '#10b981',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        ✓
                      </span>
                      <span style={{ color: '#d1d5db' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))',
                borderRadius: '1.5rem',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <h4 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                  Our Vision for 2025
                </h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    'Launch 10 new innovative products',
                    'Expand to 20 new countries',
                    'Reach 100,000 customers',
                    'Establish research center',
                    'Launch scholarship program'
                  ].map((item, index) => (
                    <li key={index} style={{ color: '#d1d5db', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#c084fc' }}>●</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Values Tab */}
        {activeTab === 'values' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '2rem',
            padding: '3rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              marginBottom: '3rem'
            }}>
              Our Core Values
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem'
            }}>
              {values.map((value, index) => (
                <div
                  key={index}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '1.5rem',
                    padding: '2rem',
                    textAlign: 'center',
                    border: `1px solid ${value.color}20`,
                    transition: 'transform 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                    e.currentTarget.style.boxShadow = `0 10px 30px ${value.color}40`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{
                    fontSize: '3rem',
                    marginBottom: '1rem',
                    filter: 'drop-shadow(0 0 10px ' + value.color + ')'
                  }}>
                    {value.icon}
                  </div>
                  <h4 style={{
                    color: 'white',
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem'
                  }}>
                    {value.title}
                  </h4>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: '1.6' }}>
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '2rem',
            padding: '3rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              marginBottom: '1rem'
            }}>
              Meet Our Team
            </h3>
            <p style={{
              color: '#9ca3af',
              textAlign: 'center',
              maxWidth: '600px',
              margin: '0 auto 3rem auto'
            }}>
              Dedicated professionals working together to bring you the best technology solutions
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem'
            }}>
              {team.map((member, index) => (
                <div
                  key={index}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '1.5rem',
                    padding: '2rem',
                    textAlign: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'transform 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: 'white',
                    margin: '0 auto 1.5rem auto',
                    boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)'
                  }}>
                    {member.image}
                  </div>
                  
                  <h4 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                    {member.name}
                  </h4>
                  <p style={{ color: '#c084fc', fontSize: '0.875rem', marginBottom: '1rem' }}>
                    {member.role}
                  </p>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    {member.bio}
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <a href={member.social.twitter} style={{ color: '#60a5fa', fontSize: '1.25rem' }}>𝕏</a>
                    <a href={member.social.linkedin} style={{ color: '#3b82f6', fontSize: '1.25rem' }}>in</a>
                    <a href={`mailto:${member.social.email}`} style={{ color: '#ef4444', fontSize: '1.25rem' }}>✉️</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Admin Info */}
        <div style={{
          marginTop: '4rem',
          padding: '2rem',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            Administrator
          </h3>
          <p style={{ color: '#c084fc', fontSize: '1.25rem', fontWeight: '500', marginBottom: '0.25rem' }}>
            Hafiz Sajid Syed
          </p>
          <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
            hafizsajidsyed@gmail.com
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <a href="#" style={{ color: '#3b82f6', fontSize: '1.5rem' }}>f</a>
            <a href="#" style={{ color: '#1da1f2', fontSize: '1.5rem' }}>𝕏</a>
            <a href="#" style={{ color: '#25d366', fontSize: '1.5rem' }}>📱</a>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style>{`
        @keyframes animateStars {
          from { transform: translateY(0px); }
          to { transform: translateY(-2000px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .stars, .stars2, .stars3 {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: block;
        }
        
        .stars {
          background: transparent url('data:image/svg+xml;utf8,<svg width="3" height="3" viewBox="0 0 3 3" xmlns="http://www.w3.org/2000/svg"><circle cx="1.5" cy="1.5" r="1" fill="white" opacity="0.5"/></svg>') repeat;
          animation: animateStars 50s linear infinite;
        }
        
        .stars2 {
          background: transparent url('data:image/svg+xml;utf8,<svg width="2" height="2" viewBox="0 0 2 2" xmlns="http://www.w3.org/2000/svg"><circle cx="1" cy="1" r="0.8" fill="white" opacity="0.3"/></svg>') repeat;
          animation: animateStars 100s linear infinite;
        }
        
        .stars3 {
          background: transparent url('data:image/svg+xml;utf8,<svg width="4" height="4" viewBox="0 0 4 4" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="1.2" fill="white" opacity="0.2"/></svg>') repeat;
          animation: animateStars 150s linear infinite;
        }

        @media (max-width: 768px) {
          .stars { animation-duration: 30s; }
          .stars2 { animation-duration: 60s; }
          .stars3 { animation-duration: 90s; }
        }
      `}</style>
    </main>
  )
}