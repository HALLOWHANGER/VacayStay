/**
 * RoomDetails.jsx - Room Details and Booking Page
 * 
 * This page displays comprehensive information about a specific room and allows users to book it.
 * Key features:
 * - Room images and details
 * - Amenities and facilities
 * - Interactive date picker for check-in/check-out
 * - Guest count selection
 * - Real-time availability checking
 * - Booking form with validation
 * - Host information and reviews
 * 
 * The page prevents double bookings and requires user authentication.
 */

import React, { useEffect, useState, useMemo } from 'react'
import { assets, roomCommonData } from '../assets/assets'
import { useAppContext } from '../context/AppContext';
import { useUser } from "@clerk/clerk-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom';
import StarRating from '../components/StarRating';
import toast from 'react-hot-toast';

/**
 * RoomDetails Component
 * Displays detailed room information and handles bookings
 */
const RoomDetails = () => {
    // Get room ID from URL parameters
    const { id } = useParams();
    const { user } = useUser();

    // Context and API utilities
    const { facilityIcons, rooms, getToken, axios, navigate } = useAppContext();

    // State management for room and booking
    const [room, setRoom] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [guests, setGuests] = useState(1);

    // Check if user has already booked this room
    const ifUserPrev = bookings.some(
        booking =>
            booking.user === user?.id &&
            booking.room === room?._id
    );

    // Get currency from environment variables
    const currency = import.meta.env.VITE_CURRENCY;

    /**
     * Handle booking form submission
     * Validates dates, checks for existing bookings, and creates new booking
     */
    const onSubmitHandler = async (e) => {
        try {
            // Validate date selection
            if (checkOutDate <= checkInDate) {
                toast.error("Invalid date selection, Check-Out date must be after Check-In date");
                return;
            }

            // Check if user already booked this room
            if (ifUserPrev) {
                toast.error("You have already booked this room");
                navigate('/my-bookings');
                return;
            }

            e.preventDefault();

            // Make booking API request
            const { data } = await axios.post(
                '/api/bookings/book',
                { room: id, checkInDate, checkOutDate, guests, paymentMethod: "Pay At Hotel" },
                { headers: { Authorization: `Bearer ${await getToken()}` } }
            );

            // Handle response
            if (data.success) {
                toast.success(data.message);
                navigate('/my-bookings');
                scrollTo(0, 0);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Fetch room data when rooms list updates
    useEffect(() => {
        const room = rooms.find(room => room._id === id);
        room && setRoom(room);
        room && setMainImage(room.images[0]);
    }, [rooms]);

    // Fetch all bookings for this room
    useEffect(() => {
        const fetchBookings = async () => {
            const { data } = await axios.get(`/api/bookings/room/${room._id}`);
            setBookings(data);
        };

        if (room?._id) fetchBookings();
    }, [room]);
    
    /**
     * Normalize date to ignore time component
     * Ensures accurate date comparison for bookings
     */
    const normalizeDate = (date) =>
        new Date(date.getFullYear(), date.getMonth(), date.getDate());

    /**
     * Calculate all disabled dates based on existing bookings
     * Prevents users from booking unavailable dates
     */
    const disabledDates = useMemo(() => {
        const dates = [];

        bookings.forEach(({ checkInDate, checkOutDate, user }) => {
            let current = normalizeDate(new Date(checkInDate));
            const end = normalizeDate(new Date(checkOutDate));

            // Add all dates between check-in and check-out to disabled list
            while (current <= end) {
                dates.push(new Date(current));
                current.setDate(current.getDate() + 1);
            }
        });

        return dates;
    }, [bookings]);
    
    /**
     * Check if a specific date is already booked
     * Used for visual feedback in date picker
     */
    const isDateBooked = (date) => {
        return bookings.some(({ checkInDate, checkOutDate }) => {
            return (
                date >= new Date(checkInDate) &&
                date <= new Date(checkOutDate)
            );
        });
    };



    return room && (
        <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>

            {/* ========== ROOM HEADER ========== */}
            <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
                <h1 className='text-3xl md:text-4xl font-playfair'>{room.hotel.name} <span className='font-inter text-sm'>({room.roomType})</span></h1>
                <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>20% OFF</p>
            </div>

            {/* Rating and Reviews */}
            <div className='flex items-center gap-1 mt-2'>
                <StarRating />
                <p className='ml-2'>200+ reviews</p>
            </div>

            {/* Location */}
            <div className='flex items-center gap-1 text-gray-500 mt-2'>
                <img src={assets.locationIcon} alt='location-icon' />
                <span>{room.hotel.address}</span>
            </div>

            {/* ========== ROOM IMAGES ========== */}
            <div className='flex flex-col lg:flex-row mt-6 gap-6'>
                {/* Main image display */}
                <div className='lg:w-1/2 w-full'>
                    <img className='w-full rounded-xl shadow-lg object-cover'
                        src={mainImage} alt='Room Image' />
                </div>

                {/* Thumbnail gallery for image selection */}
                <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
                    {room?.images.length > 1 && room.images.map((image, index) => (
                        <img key={index} onClick={() => setMainImage(image)}
                            className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image && 'outline-3 outline-orange-500'}`} src={image} alt='Room Image' />
                    ))}
                </div>
            </div>

            {/* ========== ROOM HIGHLIGHTS ========== */}
            <div className='flex flex-col md:flex-row md:justify-between mt-10'>
                <div className='flex flex-col'>
                    <h1 className='text-3xl md:text-4xl font-playfair'>Experience Luxury Like Never Before</h1>
                    
                    {/* Amenities display */}
                    <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                        {room.amenities.map((item, index) => (
                            <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
                                <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />
                                <p className='text-xs'>{item}</p>
            {/* ========== BOOKING FORM ========== */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!user) {
                        toast.error("You must be logged in to book");
                        return;
                    }
                    onSubmitHandler(e);
                }}
                className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'
            >
                {/* Date and Guest Selection */}
                <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
                    {/* Check-in Date Picker */}
                    <div className='flex flex-col'>
                        <label htmlFor='checkInDate' className='font-medium'>Check-In</label>
                        <DatePicker
                            selected={checkInDate}
                            onChange={(date) => {
                                setCheckInDate(date);
                                setCheckOutDate(null);
                            }}
                            minDate={new Date()}
                            maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                            excludeDates={disabledDates}
                            placeholderText="Check-In"
                            className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                        />
                    </div>

                    {/* Vertical Divider */}
                    <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>

                    {/* Check-out Date Picker */}
                    <div className='flex flex-col'>
                        <label htmlFor='checkOutDate' className='font-medium'>Check-Out</label>
                        <DatePicker
                            selected={checkOutDate}
                            onChange={(date) => setCheckOutDate(date)}
                            minDate={checkInDate}
                            excludeDates={disabledDates}
                            disabled={!checkInDate}
                            placeholderText="Check-Out"
                            className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                        />
                    </div>

                    {/* Vertical Divider */}
                    <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>

                    {/* Guest Count */}
                    <div className='flex flex-col'>
                        <label htmlFor='guests' className='font-medium'>Guests</label>
                        <input
                            onChange={(e) => setGuests(e.target.value)}
                            value={guests}
                            id='guests'
                            type='number'
                            className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none'
                            placeholder='0'
                            required
                        />
                    </div>
                </div>

                {/* Submit Button - Changes based on user state */}
                <button
                    type="submit"
                    className={`
                        transition-all active:scale-95
                        text-white rounded-md
                        max-md:w-full max-md:mt-6
                        md:px-25 py-3 md:py-4
                        cursor-pointer
                        ${
                            !user || ifUserPrev
                                ? "bg-red-500 hover:bg-red-600 text-sm"
                                : "bg-primary hover:bg-primary-dull text-base"
                        }
                    `}
                >
                    {!user
                        ? "Login to Book"
                        : ifUserPrev
                            ? "You Booked Already"
                            : "Book Now"}
                </button>
            </form>

            {/* ========== ROOM SPECIFICATIONS ========== */}
            <div className='mt-25 space-y-4'>
                {roomCommonData.map((spec, index) => (
                    <div key={index} className='flex items-start gap-2'>
                        <img className='w-6.5' src={spec.icon} alt={`${spec.title}-icon`} />
                        <div>
                            <p className='text-base'>{spec.title}</p>
                            <p className='text-gray-500'>{spec.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Room Description */}
            <div className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>
                <p>Guests will be allocated on the ground floor according to availability. You get a comfortable Two bedroom apartment has a true city feeling. The price quoted is for two guest, at the guest slot please mark the number of guests to get the exact price for groups. The Guests will be allocated ground floor according to availability. You get the comfortable two bedroom apartment that has a true city feeling.</p>
            </div>

            {/* ========== HOST INFORMATION ========== */}
            <div className='flex flex-col items-start gap-4'>
                {/* Host Card */}
                <div className='flex gap-4'>
                    <img className='h-14 w-14 md:h-18 md:w-18 rounded-full' src={room.hotel.owner.image} alt='Host' />
                    <div>
                        <p className='text-lg md:text-xl'>Hosted by {room.hotel.name}</p>
                        <div className='flex items-center mt-1'>
                            <StarRating />
                            <p className='ml-2'>200+ reviews</p>
                        </div>
                    </div>
                </div>

                {/* Contact Button */}
                <button className='px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer'>
                    Contact Now
                </button>
            </div>
        </div>
    )
}                       <p className='ml-2'>200+ reviews</p>
                        </div>
                    </div>
                </div>
                <button className='px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer'>
                    Contact Now
                </button>
            </div>
        </div>
    )
}

export default RoomDetails
