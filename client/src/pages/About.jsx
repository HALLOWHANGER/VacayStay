/**
 * About.jsx - About Page
 * 
 * This page provides company information and brand storytelling to users.
 * It includes:
 * - Hero section about the company
 * - What VacayStay does (services overview)
 * - Customer testimonials
 * - FAQ section for common questions
 * - Newsletter subscription form
 */

import React from 'react'
import WatWeDo from '../components/what-we-do-section'
import OurTestimonialSection from '../components/our-testimonials-section'
import FaqSection from '../components/faq-section'
import NewsLetter from '../components/NewsLetter'
import AboutUsEro from '../components/AboutUsEro'

/**
 * About Component
 * Displays company information and value proposition
 */
const About = () => {
  return (
     <>
        {/* Hero section with company introduction */}
        <AboutUsEro />
        
        {/* Services and what VacayStay offers */}
        <WatWeDo />
        
        {/* Customer testimonials section */}
        <OurTestimonialSection />
        
        {/* Frequently asked questions */}
        <FaqSection />
        
        {/* Newsletter signup form */}
         <NewsLetter/>
     </>
  )
}

export default About