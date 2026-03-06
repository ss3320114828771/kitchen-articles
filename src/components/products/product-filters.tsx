'use client'

import { useState } from 'react'

interface FilterOption {
  value: string
  label: string
  count?: number
}

interface FilterSection {
  id: string
  name: string
  type: 'checkbox' | 'radio' | 'range' | 'rating'
  options?: FilterOption[]
  min?: number
  max?: number
  step?: number
}

interface ProductFiltersProps {
  sections: FilterSection[]
  selectedFilters: { [key: string]: string[] | [number, number] }
  onFilterChange: (sectionId: string, value: string | string[] | [number, number]) => void
  onClearFilters: () => void
  totalProducts?: number
  filteredCount?: number
  className?: string
  collapsible?: boolean
  defaultCollapsed?: boolean
  showClearButton?: boolean
  showCounts?: boolean
}

export default function ProductFilters({
  sections,
  selectedFilters,
  onFilterChange,
  onClearFilters,
  totalProducts,
  filteredCount,
  className = '',
  collapsible = true,
  defaultCollapsed = false,
  showClearButton = true,
  showCounts = true
}: ProductFiltersProps) {
  const [collapsedSections, setCollapsedSections] = useState<{ [key: string]: boolean }>(
    sections.reduce((acc, section) => ({ ...acc, [section.id]: defaultCollapsed }), {})
  )
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile
  useState(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768)
      
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768)
      }
      
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  })

  // Toggle section collapse
  const toggleSection = (sectionId: string) => {
    if (collapsible) {
      setCollapsedSections(prev => ({
        ...prev,
        [sectionId]: !prev[sectionId]
      }))
    }
  }

  // Handle checkbox change
  const handleCheckboxChange = (sectionId: string, value: string, checked: boolean) => {
    const currentValues = (selectedFilters[sectionId] as string[]) || []
    
    let newValues: string[]
    if (checked) {
      newValues = [...currentValues, value]
    } else {
      newValues = currentValues.filter(v => v !== value)
    }
    
    onFilterChange(sectionId, newValues)
  }

  // Handle radio change
  const handleRadioChange = (sectionId: string, value: string) => {
    onFilterChange(sectionId, [value])
  }

  // Handle price range change
  const handlePriceRangeChange = (values: [number, number]) => {
    setPriceRange(values)
    onFilterChange('price', values)
  }

  // Handle clear all filters
  const handleClearAll = () => {
    onClearFilters()
    setPriceRange([0, 1000])
  }

  // Count active filters
  const getActiveFilterCount = (): number => {
    return Object.values(selectedFilters).reduce((count, value) => {
      if (Array.isArray(value)) {
        return count + value.length
      }
      return count
    }, 0)
  }

  const activeFilterCount = getActiveFilterCount()

  return (
    <div
      className={className}
      style={{
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '1rem',
        padding: '1.5rem',
        border: '1px solid rgba(255,255,255,0.1)',
        width: '100%'
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <div>
          <h3 style={{ color: 'white', fontSize: '1.125rem', fontWeight: '600', margin: 0 }}>
            Filters
          </h3>
          {totalProducts !== undefined && filteredCount !== undefined && (
            <p style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.25rem' }}>
              Showing {filteredCount} of {totalProducts} products
            </p>
          )}
        </div>
        
        {showClearButton && activeFilterCount > 0 && (
          <button
            onClick={handleClearAll}
            style={{
              padding: '0.25rem 0.75rem',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '2rem',
              color: '#ef4444',
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.1)'
            }}
          >
            <span>✕</span>
            Clear All ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Filter Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {sections.map(section => (
          <div
            key={section.id}
            style={{
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              paddingBottom: '1.5rem'
            }}
          >
            {/* Section Header */}
            <div
              onClick={() => toggleSection(section.id)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: collapsible ? 'pointer' : 'default',
                marginBottom: collapsedSections[section.id] ? 0 : '1rem'
              }}
            >
              <h4 style={{
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: '600',
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {section.name}
              </h4>
              {collapsible && (
                <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                  {collapsedSections[section.id] ? '▼' : '▲'}
                </span>
              )}
            </div>

            {/* Section Content */}
            {!collapsedSections[section.id] && (
              <div>
                {/* Checkbox Type */}
                {section.type === 'checkbox' && section.options && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {section.options.map(option => {
                      const isChecked = ((selectedFilters[section.id] as string[]) || []).includes(option.value)
                      
                      return (
                        <label
                          key={option.value}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            color: '#d1d5db',
                            fontSize: '0.875rem'
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => handleCheckboxChange(section.id, option.value, e.target.checked)}
                            style={{
                              width: '1rem',
                              height: '1rem',
                              accentColor: '#c084fc',
                              cursor: 'pointer'
                            }}
                          />
                          <span style={{ flex: 1 }}>{option.label}</span>
                          {showCounts && option.count !== undefined && (
                            <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                              ({option.count})
                            </span>
                          )}
                        </label>
                      )
                    })}
                  </div>
                )}

                {/* Radio Type */}
                {section.type === 'radio' && section.options && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {section.options.map(option => {
                      const isChecked = ((selectedFilters[section.id] as string[]) || [])[0] === option.value
                      
                      return (
                        <label
                          key={option.value}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            color: '#d1d5db',
                            fontSize: '0.875rem'
                          }}
                        >
                          <input
                            type="radio"
                            name={section.id}
                            checked={isChecked}
                            onChange={() => handleRadioChange(section.id, option.value)}
                            style={{
                              width: '1rem',
                              height: '1rem',
                              accentColor: '#c084fc',
                              cursor: 'pointer'
                            }}
                          />
                          <span style={{ flex: 1 }}>{option.label}</span>
                          {showCounts && option.count !== undefined && (
                            <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                              ({option.count})
                            </span>
                          )}
                        </label>
                      )
                    })}
                  </div>
                )}

                {/* Rating Type */}
                {section.type === 'rating' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[5, 4, 3, 2, 1].map(rating => {
                      const isChecked = ((selectedFilters[section.id] as string[]) || []).includes(rating.toString())
                      
                      return (
                        <label
                          key={rating}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            color: '#d1d5db',
                            fontSize: '0.875rem'
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => handleCheckboxChange(section.id, rating.toString(), e.target.checked)}
                            style={{
                              width: '1rem',
                              height: '1rem',
                              accentColor: '#c084fc',
                              cursor: 'pointer'
                            }}
                          />
                          <div style={{ display: 'flex', gap: '0.125rem', flex: 1 }}>
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                style={{
                                  color: i < rating ? '#f59e0b' : '#4b5563',
                                  fontSize: '1rem'
                                }}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          {showCounts && (
                            <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                              & Up
                            </span>
                          )}
                        </label>
                      )
                    })}
                  </div>
                )}

                {/* Range Type */}
                {section.type === 'range' && (
                  <div style={{ padding: '0.5rem 0' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '1rem'
                    }}>
                      <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                        Min: ${priceRange[0]}
                      </span>
                      <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                        Max: ${priceRange[1]}
                      </span>
                    </div>
                    
                    <input
                      type="range"
                      min={section.min || 0}
                      max={section.max || 1000}
                      step={section.step || 10}
                      value={priceRange[1]}
                      onChange={(e) => handlePriceRangeChange([priceRange[0], parseInt(e.target.value)])}
                      style={{
                        width: '100%',
                        accentColor: '#c084fc'
                      }}
                    />
                    
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem',
                      marginTop: '1rem'
                    }}>
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceRangeChange([parseInt(e.target.value) || 0, priceRange[1]])}
                        min={section.min || 0}
                        max={priceRange[1]}
                        style={{
                          flex: 1,
                          padding: '0.5rem',
                          background: 'rgba(255,255,255,0.1)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '0.5rem',
                          color: 'white',
                          outline: 'none'
                        }}
                      />
                      <span style={{ color: '#9ca3af', alignSelf: 'center' }}>-</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceRangeChange([priceRange[0], parseInt(e.target.value) || 0])}
                        min={priceRange[0]}
                        max={section.max || 1000}
                        style={{
                          flex: 1,
                          padding: '0.5rem',
                          background: 'rgba(255,255,255,0.1)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '0.5rem',
                          color: 'white',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Apply Button */}
      {isMobile && activeFilterCount > 0 && (
        <button
          onClick={handleClearAll}
          style={{
            width: '100%',
            marginTop: '1rem',
            padding: '0.75rem',
            background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
            border: 'none',
            borderRadius: '0.5rem',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Apply Filters
        </button>
      )}
    </div>
  )
}