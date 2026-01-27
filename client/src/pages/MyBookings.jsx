/**
 * MyBookings.jsx - User Bookings Management Page
 * 
 * This page displays all bookings made by the authenticated user.
 * Features:
 * - Display all user bookings with details
 * - Show booking status (pending, confirmed, cancelled, refunded)
 * - Show payment status
 * - Payment option for unpaid bookings
 * - Responsive design for mobile and desktop
 */

import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

/**
 * MyBookings Component
 * Manages and displays user bookings
 */
const MyBookings = () => {
    // Get API utilities and user info from context
    const { axios, getToken, user, currency } = useAppContext();
    const [bookings, setBookings] = useState([]);

    /**
     * StatusBadge Component
     * Displays booking status with appropriate styling
     * 
     * Status logic:
     * - Cancelled: Gray
     * - Refunded: Red
     * - Paid & Confirmed: Green
     * - Paid only: Blue
     * - Default: Yellow (pending)
     */
    const StatusBadge = ({ status, paymentStatus }) => {
        let label = "Pending";
        let style = "bg-yellow-100 text-yellow-700";

        if (status === "cancelled") {
            label = "Cancelled";
            style = "bg-gray-200 text-gray-700";
        }

        if (status === "refunded") {
            label = "Refunded";
            style = "bg-red-100 text-red-700";
        }

        if (paymentStatus === "paid" && status === "confirmed") {
            label = "Confirmed";
            style = "bg-green-100 text-green-700";
        }

        if (paymentStatus === "paid" && status !== "confirmed") {
            label = "Paid";
            style = "bg-blue-100 text-blue-700";
        }

        return (
            <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${style}`}
            >
                {label}
            </span>
        );
    };

    /**
     * Fetch all bookings for the authenticated user
     */
    const fetchUserBookings = async () => {
        try {
            const { data } = await axios.get('/api/bookings/user', { headers: { Authorization: `Bearer ${await getToken()}` } })
            if (data.success) {
                setBookings(data.bookings)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    /**
     * Handle payment for a booking
     * Redirects to Stripe payment gateway
     */
    const handlePayment = async (bookingId) => {
        try {
            const { data } = await axios.post('/api/bookings/stripe-payment', { bookingId }, { headers: { Authorization: `Bearer ${await getToken()}` } })
            if (data.success) {
                // Redirect to Stripe checkout
                window.location.href = data.url
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    /**
     * Fetch bookings when user authentication status changes
     */
    useEffect(() => {
        if (user) {
            fetchUserBookings();
        }
    }, [user]);

    return (
        <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>
            {/* Page header */}
            <Title title='My Bookings' subTitle='Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks' align='left' />
            
            <div className="max-w-6xl mt-8 w-full text-gray-800">
                {/* Table header - visible on desktop only */}
                <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
                    <div className="w-1/3">Hotels</div>
                    <div className="w-1/3">Date & Timings</div>
                    <div className="w-1/3">Payment</div>
                </div>

                {/* Booking Cards */}
                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t"
                    >
                        {/* ========== LEFT SECTION: HOTEL DETAILS ========== */}
                        <div className="flex flex-col md:flex-row">
                            {/* Room image */}
                            <img
                                className="min-md:w-44 rounded shadow object-cover"
                                src={booking.room.images[0]}
                                alt="hotel-img"
                            />
                            
                            {/* Booking information */}
                            <div className="flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4">
                                {/* Hotel name and room type */}
                                <p className="font-playfair text-2xl">
                                    {booking.hotel.name}
                                    <span className="font-inter text-sm">
                                        {" "}
                                        ({booking.room.roomType})
                                    </span>
                                </p>

                                {/* Hotel location */}
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                    <img src={assets.locationIcon} alt="location-icon" />
                                    <span>{booking.hotel.address}</span>
                                </div>

                                {/* Number of guests */}
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                    <img src={assets.guestsIcon} alt="guests-icon" />
                                    <span>Guests: {booking.guests}</span>
                                </div>

                                {/* Total booking price */}
                                <p className="text-base">
                                    Total: {currency}
                                    {booking.totalPrice}
                                </p>
                            </div>
                        </div>

                        {/* ========== MIDDLE SECTION: DATES ========== */}
                        <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8">
                            {/* Check-in date */}
                            <div>
                                <p>Check-In:</p>
                                <p className="text-gray-500 text-sm">
                                    {new Date(booking.checkInDate).toDateString()}
                                </p>
                            </div>
                            
                            {/* Check-out date */}
                            <div>
                                <p>Check-Out:</p>
                                <p className="text-gray-500 text-sm">
                                    {new Date(booking.checkOutDate).toDateString()}
                                </p>
                            </div>
                        </div>

                        {/* ========== RIGHT SECTION: PAYMENT STATUS ========== */}
                        <div className="flex flex-col items-start justify-center pt-3 gap-2">
                            {/* Status badge */}
                            <StatusBadge
                                status={booking.status}
                                paymentStatus={booking.paymentStatus}
                            />

                            {/* Payment status indicator */}
                            <div className="flex items-center gap-2">
                                <div
                                    className={`h-3 w-3 rounded-full ${
                                        booking.paymentStatus === "paid"
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                    }`}
                                ></div>

                                <p
                                    className={`text-sm ${
                                        booking.paymentStatus === "paid"
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }`}
                                >
                                    {booking.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                                </p>
                            </div>

                            {/* Pay Now button - only shown for unpaid bookings */}
                            {booking.paymentStatus !== "paid" &&
                                booking.status !== "cancelled" &&
                                booking.status !== "refunded" && (
                                    <button
                                        onClick={() => handlePayment(booking._id)}
                                        className="px-4 py-1.5 mt-2 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all"
                                    >
                                        Pay Now
                                    </button>
                                )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default MyBookings
