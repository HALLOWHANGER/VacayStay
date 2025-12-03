import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Navbar from './components/Navbar'
import Layout from './pages/hotelOwner/Layout'
import Dashboard from './pages/hotelOwner/Dashboard'
import AddRoom from './pages/hotelOwner/AddRoom'
import ListRoom from './pages/hotelOwner/ListRoom'
import AdminLayout from './pages/admin/Layout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminRooms from './pages/admin/ListRooms'
import AdminCity from './pages/admin/ListCities'
import AdminUsers from './pages/admin/ListUsers'
import AdminHotels from './pages/admin/ListHotels'
import HotelReg from './components/HotelReg'
import { useAppContext } from './context/AppContext'
import { Toaster } from 'react-hot-toast'
import AllHotels from './pages/AllHotels'
import AllRooms from './pages/AllRooms'
import RoomDetails from './pages/RoomDetails'
import Footer from './components/Footer'
import MyBookings from './pages/MyBookings'
import Loader from './components/Loader'

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  const isAdmin = useLocation().pathname.includes("admin");
  const { showHotelReg } = useAppContext();

  return (
    <div className="font-inter flex flex-col min-h-screen">
      <Toaster />

      {!(isOwnerPath || isAdmin) && <Navbar />}

      {showHotelReg && <HotelReg />}

      <div className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/hotels" element={<AllHotels />} />
          <Route path="/hotels/rooms/:id" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="/loader/:nextUrl" element={<Loader />} />

          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="add-room" element={<AdminRooms />} />
            <Route path="hotels" element={<AdminHotels />} />
            <Route path="list-room" element={<AdminRooms />} />
            <Route path="list-city" element={<AdminCity />} />
            <Route path="list-users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </div>

      <Footer />
    </div>
  );
};


export default App