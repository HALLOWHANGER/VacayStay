/**
 * Experience.jsx - Experience/Showcase Page
 * 
 * This page showcases the VacayStay experience with interactive elements.
 * Features:
 * - Smooth scrolling with Lenis
 * - Company header with branding
 * - About the platform
 * - Services showcase
 * - Contact section
 * - Footer
 */

import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Work from '../components/Work'
import Services from '../components/Services'
import About from '../components/About'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import LenisScroll from '../components/LenisScroll'

/**
 * Experience Component
 * Displays company experience and services
 */
export default function Experience() {
    return (
        <>
            {/* Smooth scrolling effect */}
            <LenisScroll />
            
            {/* Navigation bar */}
            <Navbar />
            
            {/* Page header/hero section */}
            <Header />
            
            {/* About section */}
            <About />
            
            {/* Services showcase */}
            <Services />
            
            {/* Contact form */}
            <Contact />
        </>
    )
}
