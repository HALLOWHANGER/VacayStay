/**
 * App.jsx - Main Application Router and Layout
 * 
 * This component is the central routing hub for the entire VacayStay application.
 * It handles:
 * - Route definitions for all pages (public, hotel owner, and admin)
 * - Conditional rendering of navbar based on user role
 * - Global toast notifications
 * - Hotel registration modal
 * 
 * The app has three main sections:
 * 1. Public pages - Accessible to all users (Home, About, Hotels, etc.)
 * 2. Hotel Owner pages - Private routes for hotel managers (/owner/*)
 * 3. Admin pages - Private routes for administrators (/admin/*)
 */

import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
// Public pages
import Home from './pages/Home'
import Experience from './pages/Experience'
import About from './pages/About'
import AllHotels from './pages/AllHotels'
import AllRooms from './pages/AllRooms'
import RoomDetails from './pages/RoomDetails'
import ContactUS from './pages/ContactUS'
import MyBookings from './pages/MyBookings'
// Layout components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
// Hotel Owner routes
import Layout from './pages/hotelOwner/Layout'
import Dashboard from './pages/hotelOwner/Dashboard'
import AddRoom from './pages/hotelOwner/AddRoom'
import ListRoom from './pages/hotelOwner/ListRoom'
import BookingList from './pages/hotelOwner/ListBookin'
// Admin routes
import AdminLayout from './pages/admin/Layout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminRooms from './pages/admin/ListRooms'
import AdminCity from './pages/admin/ListCities'
import AdminUsers from './pages/admin/ListUsers'
import AdminHotels from './pages/admin/ListHotels'
import SupportInbox from './pages/admin/SupportInbox'
import Booking from './pages/admin/ListBookin'
// Global components
import HotelReg from './components/HotelReg'
import Loader from './components/Loader'
import { useAppContext } from './context/AppContext'
import { Toaster } from 'react-hot-toast'

/**
 * Main App Component
 * Manages routing, layout, and global state display
 */
const App = () => {
  // Determine if current route is for hotel owners or admins
  const isOwnerPath = useLocation().pathname.includes("owner");
  const isAdmin = useLocation().pathname.includes("admin");
  const { showHotelReg } = useAppContext();

  return (
    <div className="font-inter flex flex-col min-h-screen">
      {/* Global toast notification system */}
      <Toaster />

      {/* Show navbar only on public pages (not owner/admin pages) */}
      {!(isOwnerPath || isAdmin) && <Navbar />}

      {/* Hotel registration modal - shown when triggered from global context */}
      {showHotelReg && <HotelReg />}

      {/* Main content area that grows to fill available space */}
      <div className="grow">
        <Routes>
          {/* ========== PUBLIC PAGES ========== */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<ContactUS />} />
          
          {/* Hotel browsing routes */}
          <Route path="/hotels" element={<AllHotels />} />
          <Route path="/hotels/rooms/:id" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          
          {/* User bookings page */}
          <Route path="my-bookings" element={<MyBookings />} />
          
          {/* Loading page for transitions */}
          <Route path="/loader/:nextUrl" element={<Loader />} />

          {/* ========== HOTEL OWNER PAGES ========== */}
          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
            <Route path="bookings" element={<BookingList />} />
          </Route>

          {/* ========== ADMIN PAGES ========== */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="add-room" element={<AdminRooms />} />
            <Route path="hotels" element={<AdminHotels />} />
            <Route path="list-room" element={<AdminRooms />} />
            <Route path="list-city" element={<AdminCity />} />
            <Route path="support-inbox" element={<SupportInbox />} />
            <Route path="list-bookings" element={<Booking />} />
            <Route path="list-users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </div>

      {/* Footer displayed on all pages */}
      <Footer />
    </div>
  );
};

export default App