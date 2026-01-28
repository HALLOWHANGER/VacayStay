import React from 'react'
import WatWeDo from '../components/what-we-do-section'
import OurTestimonialSection from '../components/our-testimonials-section'
import FaqSection from '../components/faq-section'
import NewsLetter from '../components/NewsLetter'
import AboutUsEro from '../components/AboutUsEro'


const About = () => {
  return (
     <>
        <AboutUsEro />
        <WatWeDo />
        <OurTestimonialSection />
        <FaqSection />
         <NewsLetter/>
     </>
  )
}

export default About