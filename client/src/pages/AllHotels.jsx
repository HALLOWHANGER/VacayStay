import React from 'react'
import { useAppContext } from '../context/AppContext';
import Title from '../components/Title';
import HotelCard from '../components/HotelCard';


const AllHotels = () => {
    const { hotels } = useAppContext();

    return hotels.length > 0 && (
        <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
            <Title 
                title="Hotels" 
                subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences." 
            />
            <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
                {hotels.slice(0, 4).map((hotel, index) => (
                    <HotelCard key={hotel._id} hotel={hotel} index={index} />
                ))}
            </div>
        </div>
    );
}

export default AllHotels;