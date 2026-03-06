'use client'

import { useState, useEffect } from 'react'

type WindowSize = {
  width: number
  height: number
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isSmallMobile: boolean
  isLargeMobile: boolean
  orientation: 'portrait' | 'landscape'
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isSmallMobile: false,
    isLargeMobile: false,
    orientation: 'portrait',
    breakpoint: 'xs'
  })

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      const width = window.innerWidth
      const height = window.innerHeight

      // Determine device type
      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1024
      const isDesktop = width >= 1024
      const isSmallMobile = width < 480
      const isLargeMobile = width >= 480 && width < 768

      // Determine orientation
      const orientation = height > width ? 'portrait' : 'landscape'

      // Determine breakpoint
      let breakpoint: WindowSize['breakpoint'] = 'xs'
      if (width >= 1536) breakpoint = '2xl'
      else if (width >= 1280) breakpoint = 'xl'
      else if (width >= 1024) breakpoint = 'lg'
      else if (width >= 768) breakpoint = 'md'
      else if (width >= 640) breakpoint = 'sm'
      else breakpoint = 'xs'

      setWindowSize({
        width,
        height,
        isMobile,
        isTablet,
        isDesktop,
        isSmallMobile,
        isLargeMobile,
        orientation,
        breakpoint
      })
    }

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}