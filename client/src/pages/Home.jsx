/**
 * Home.jsx - Landing Page
 * 
 * This is the main landing page of the VacayStay application.
 * It serves as the entry point for users and showcases various sections:
 * - Hero banner with call-to-action
 * - Recommended hotels featured
 * - Popular destinations
 * - Exclusive promotional offers
 * - Customer testimonials
 * - Newsletter subscription form
 */

import React from 'react'
import Hero from '../components/Hero'
import FeaturedDestination from '../components/FeaturedDestination'
import ExclusiveOffers from '../components/ExclusiveOffers'
import Testimonial from '../components/Testimonial '
import NewsLetter from '../components/NewsLetter'
import RecommendedHotels from '../components/RecommendedHotels'

/**
 * Home Component
 * Renders the landing page with multiple marketing sections
 */
const Home = () => {
    return (
        <>
            {/* Hero section with main call-to-action */}
            <Hero />
            
            {/* Featured hotel recommendations */}
            <RecommendedHotels />
            
            {/* Popular vacation destinations */}
            <FeaturedDestination />
            
            {/* Special promotional offers */}
            <ExclusiveOffers />
            
            {/* Customer reviews and testimonials */}
            <Testimonial />
            
            {/* Newsletter signup form */}
            <NewsLetter/>
        </>
    )
}

export default Home