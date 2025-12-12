import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'


const HotelCard = ({ hotel, index }) => {

    return (
        <Link to={`/hotels/rooms/${hotel._id}`} onClick={() => scrollTo(0, 0)} key={hotel._id} className='relative max-w-70 w-full rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]'>
        
            {hotel.images?.[0] && (
                <img src={hotel.images[0]} alt="hotel-img" draggable="false" />
            )}

            {index % 2 === 0 && (
                <p className='px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full'>
                    Best Seller
                </p>
            )}

            <div className='p-4 pt-5'>
                <div className='flex items-center justify-between'>
                    <p className='font-playfair text-xl font-medium text-gray-800'>{hotel.name}</p>

                    <div className='flex items-center gap-1'>
                    {Math.floor(Math.random() * 5) + 1} ⭐
                    </div>
                </div>

                <div className='flex items-center gap-1 text-sm'>
                    <img src={assets.locationIcon} alt="location-icon" />
                    <span>{hotel.address}</span>
                </div>

                <div className='flex items-center justify-between mt-4'>
                    <p className='text-xl text-gray-800'>
                        {hotel.city || ""}
                    </p>
                </div>
            </div>
        </Link>
    );
};


export default HotelCard;
