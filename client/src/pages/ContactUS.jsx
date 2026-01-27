/**
 * ContactUS.jsx - Contact Page
 * 
 * This page allows users to get in touch with VacayStay.
 * It includes:
 * - Navigation bar
 * - Hero section with contact introduction
 * - FAQ section for self-service support
 * - Contact form for direct inquiries
 */

import Contact from '../components/Contact'
import Header from '../components/ContactUSEro'
import Navbar from '../components/Navbar'
import FaqSection from '../components/faq-section'

/**
 * ContactUS Component
 * Displays contact information and inquiry forms
 */
export default function ContactUS() {
    return (
        <>
            {/* Navigation bar */}
            <Navbar />
            
            {/* Hero section with contact introduction */}
            <Header />
            
            {/* FAQ for common questions */}
            <FaqSection />
            
            {/* Contact form for user inquiries */}
            <Contact />
        </>
    )
}
