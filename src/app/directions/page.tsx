'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DirectionsPage() {
  const [activeTab, setActiveTab] = useState('driving')
  const [fromLocation, setFromLocation] = useState('')
  const [showRoute, setShowRoute] = useState(false)

  // Transportation modes
  const transportModes = [
    { id: 'driving', icon: '🚗', label: 'Driving', time: '25 min' },
    { id: 'transit', icon: '🚇', label: 'Public Transport', time: '45 min' },
    { id: 'walking', icon: '🚶', label: 'Walking', time: '2 hours' },
    { id: 'bicycling', icon: '🚲', label: 'Bicycling', time: '50 min' }
  ]

  // Landmarks nearby
  const landmarks = [
    { name: 'Tech Park', distance: '0.5 km', icon: '🏢' },
    { name: 'City Mall', distance: '1.2 km', icon: '🛍️' },
    { name: 'Central Station', distance: '1.5 km', icon: '🚉' },
    { name: 'Innovation Tower', distance: '2.0 km', icon: '🏛️' },
    { name: 'Business Bay', distance: '2.5 km', icon: '🏙️' }
  ]

  // Parking info
  const parkingInfo = [
    { type: 'Underground Parking', spaces: '200+', rate: 'Free', icon: '🅿️' },
    { type: 'Street Parking', spaces: '50', rate: '$2/hour', icon: '🛣️' },
    { type: 'Valet Service', spaces: '20', rate: '$5', icon: '🚘' },
    { type: 'EV Charging', spaces: '10', rate: '$3/hour', icon: '⚡' }
  ]

  // Handle route search
  const handleGetDirections = (e: React.FormEvent) => {
    e.preventDefault()
    if (fromLocation.trim()) {
      setShowRoute(true)
    }
  }

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
            <Link href="/contact" style={{ color: '#9ca3af', textDecoration: 'none' }}>Contact</Link>
            <Link href="/directions" style={{ color: '#c084fc', textDecoration: 'none' }}>Directions</Link>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(168,85,247,0.1))',
        padding: '3rem 2rem',
        textAlign: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #60a5fa, #c084fc)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          How to Find Us
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
          We're located in the heart of Innovation City. Use the map and directions below to find your way to our office.
        </p>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Map and Directions Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Map Section */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
              📍 Our Location
            </h2>
            
            {/* Map Placeholder */}
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
              borderRadius: '0.75rem',
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '1.5rem'
            }}>
              {/* Map Grid Lines */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }}></div>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }}></div>
              
              {/* Map Marker */}
              <div style={{
                position: 'relative',
                zIndex: 1,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>📍</div>
                <div style={{
                  background: 'rgba(255,255,255,0.2)',
                  padding: '0.5rem 1rem',
                  borderRadius: '2rem',
                  backdropFilter: 'blur(5px)'
                }}>
                  <strong>Kitechn Headquarters</strong>
                </div>
              </div>
            </div>

            {/* Address Details */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '0.75rem',
              padding: '1rem'
            }}>
              <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '0.5rem' }}>
                Kitechn Headquarters
              </h3>
              <p style={{ color: '#d1d5db', marginBottom: '0.25rem' }}>
                123 Tech Street, Innovation City
              </p>
              <p style={{ color: '#d1d5db', marginBottom: '0.25rem' }}>
                Tech Valley, Pakistan - 12345
              </p>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                ✉️ directions@kitechn.com
              </p>
            </div>
          </div>

          {/* Directions Form */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
              🧭 Get Directions
            </h2>

            <form onSubmit={handleGetDirections}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.5rem' }}>
                  Starting Point
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    placeholder="Enter your location"
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '0.5rem',
                      color: 'white',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: 'white',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Go
                  </button>
                </div>
              </div>
            </form>

            {/* Transportation Modes */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                TRANSPORTATION MODES
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {transportModes.map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setActiveTab(mode.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem',
                      background: activeTab === mode.id ? 'rgba(168,85,247,0.2)' : 'rgba(255,255,255,0.05)',
                      border: activeTab === mode.id ? '1px solid #c084fc' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '0.5rem',
                      color: activeTab === mode.id ? '#c084fc' : '#d1d5db',
                      cursor: 'pointer',
                      width: '100%'
                    }}
                  >
                    <span style={{ fontSize: '1.25rem' }}>{mode.icon}</span>
                    <div style={{ textAlign: 'left' }}>
                      <div>{mode.label}</div>
                      <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{mode.time}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Route Info */}
            {showRoute && (
              <div style={{
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.3)',
                borderRadius: '0.75rem',
                padding: '1rem'
              }}>
                <h4 style={{ color: '#10b981', fontWeight: '600', marginBottom: '0.5rem' }}>
                  ✓ Route Found!
                </h4>
                <div style={{ color: '#d1d5db', fontSize: '0.875rem' }}>
                  <p>From: <span style={{ color: 'white' }}>{fromLocation}</span></p>
                  <p>Distance: <span style={{ color: 'white' }}>12.5 km</span></p>
                  <p>Estimated Time: <span style={{ color: 'white' }}>
                    {activeTab === 'driving' && '25 minutes'}
                    {activeTab === 'transit' && '45 minutes'}
                    {activeTab === 'walking' && '2 hours'}
                    {activeTab === 'bicycling' && '50 minutes'}
                  </span></p>
                </div>
              </div>
            )}

            {/* Quick Tips */}
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '0.75rem'
            }}>
              <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '0.5rem' }}>
                💡 Quick Tips
              </h4>
              <ul style={{ color: '#9ca3af', fontSize: '0.875rem', listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.25rem' }}>• Free parking available underground</li>
                <li style={{ marginBottom: '0.25rem' }}>• Nearest metro: Innovation Station (5 min walk)</li>
                <li style={{ marginBottom: '0.25rem' }}>• Bus stop #42 right outside</li>
                <li>• Bike racks available at entrance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Directions by Car */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '1rem',
          padding: '1.5rem',
          border: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
            🚗 Directions by Car
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div>
              <h3 style={{ color: '#c084fc', fontWeight: '600', marginBottom: '0.5rem' }}>From North</h3>
              <ol style={{ color: '#d1d5db', fontSize: '0.875rem', marginLeft: '1rem' }}>
                <li>Take Highway 101 South</li>
                <li>Exit at Innovation Boulevard (Exit 42)</li>
                <li>Turn right on Tech Street</li>
                <li>Destination is on your left</li>
              </ol>
            </div>
            <div>
              <h3 style={{ color: '#c084fc', fontWeight: '600', marginBottom: '0.5rem' }}>From South</h3>
              <ol style={{ color: '#d1d5db', fontSize: '0.875rem', marginLeft: '1rem' }}>
                <li>Take Highway 101 North</li>
                <li>Exit at Innovation Boulevard (Exit 42)</li>
                <li>Turn left on Tech Street</li>
                <li>Destination is on your right</li>
              </ol>
            </div>
            <div>
              <h3 style={{ color: '#c084fc', fontWeight: '600', marginBottom: '0.5rem' }}>From East/West</h3>
              <ol style={{ color: '#d1d5db', fontSize: '0.875rem', marginLeft: '1rem' }}>
                <li>Take Innovation Boulevard</li>
                <li>Turn onto Tech Street</li>
                <li>Destination is in the middle of the block</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Public Transport */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Metro */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🚇</div>
            <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '0.5rem' }}>By Metro</h3>
            <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
              Take the Orange Line to Innovation Station
            </p>
            <div style={{
              background: 'rgba(59,130,246,0.1)',
              padding: '0.75rem',
              borderRadius: '0.5rem'
            }}>
              <p style={{ color: '#d1d5db', fontSize: '0.875rem' }}>
                <span style={{ color: '#3b82f6' }}>●</span> 5-minute walk from station
              </p>
              <p style={{ color: '#d1d5db', fontSize: '0.875rem' }}>
                <span style={{ color: '#3b82f6' }}>●</span> Trains every 10 minutes
              </p>
            </div>
          </div>

          {/* Bus */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🚌</div>
            <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '0.5rem' }}>By Bus</h3>
            <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
              Routes 42, 15, and 7 stop right outside
            </p>
            <div style={{
              background: 'rgba(168,85,247,0.1)',
              padding: '0.75rem',
              borderRadius: '0.5rem'
            }}>
              <p style={{ color: '#d1d5db', fontSize: '0.875rem' }}>
                <span style={{ color: '#c084fc' }}>●</span> Bus stop: "Tech Street"
              </p>
              <p style={{ color: '#d1d5db', fontSize: '0.875rem' }}>
                <span style={{ color: '#c084fc' }}>●</span> Service until midnight
              </p>
            </div>
          </div>
        </div>

        {/* Parking Information */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '1rem',
          padding: '1.5rem',
          border: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
            🅿️ Parking Information
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {parkingInfo.map((parking, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{parking.icon}</div>
                <h3 style={{ color: 'white', fontWeight: '600', fontSize: '1rem' }}>{parking.type}</h3>
                <p style={{ color: '#c084fc', fontSize: '0.875rem' }}>{parking.spaces} spaces</p>
                <p style={{ color: '#9ca3af', fontSize: '0.75rem' }}>{parking.rate}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Landmarks */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '1rem',
          padding: '1.5rem',
          border: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
            🗺️ Nearby Landmarks
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {landmarks.map((landmark, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '2rem',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>{landmark.icon}</span>
                <span style={{ color: 'white' }}>{landmark.name}</span>
                <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{landmark.distance}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact for Directions */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(168,85,247,0.1))',
          borderRadius: '1rem',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            Still Need Help?
          </h2>
          <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
            Contact our support team for personalized directions
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <a
              href="tel:+923001234567"
              style={{
                padding: '0.75rem 1.5rem',
                background: 'rgba(59,130,246,0.1)',
                border: '1px solid rgba(59,130,246,0.3)',
                borderRadius: '0.5rem',
                color: '#3b82f6',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              📞 Call Us
            </a>
            <a
              href="mailto:directions@kitechn.com"
              style={{
                padding: '0.75rem 1.5rem',
                background: 'rgba(168,85,247,0.1)',
                border: '1px solid rgba(168,85,247,0.3)',
                borderRadius: '0.5rem',
                color: '#c084fc',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              ✉️ Email Us
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}