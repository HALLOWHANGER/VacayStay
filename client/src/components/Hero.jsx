import React, { useState } from 'react'
import { assets, cities } from '../assets/assets'
import { useAppContext } from '../context/AppContext';

const Hero = () => {

    const { navigate, getToken, axios, setSearchedCities } = useAppContext();
    const [destination, setDestination] = useState("");

    const onSearch = async (e) => {
        e.preventDefault();
        navigate(`/rooms?destination=${destination}`);

        await axios.post('/api/user/store-recent-search', { recentSearchedCity: destination }, {
            headers: { Authorization: `Bearer ${await getToken()}` }
        });

        setSearchedCities((prevSearchedCities) => {
            const updatedSearchedCities = [...prevSearchedCities, destination];
            if (updatedSearchedCities.length > 3) {
                updatedSearchedCities.shift();
            }
            return updatedSearchedCities;
        });
    }

    return (
      <section id="section" class="bg-[#0a1b43] mt-20 pb-15">
    <main
        class="flex flex-col md:flex-row items-center max-md:text-center justify-between mt-16 pb-16 px-6 sm:px-10 md:px-24 max-w-7xl mx-auto w-full">
        <div class="flex flex-col items-center md:items-start">
            <p class="bg-[#396ce5] px-3.5 py-1 rounded-full mt-20 text-white">The Ultimate Hotel Experience</p>
            <h1 class="text-white font-semibold text-3xl sm:text-4xl md:text-5xl max-w-xl mt-5">
                Discover Your Perfect Gateway Destination
            </h1>
            <p class="mt-4 text-white max-w-md text-sm sm:text-base leading-relaxed">
                Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your journey today.
            </p>
            <div class="flex flex-col md:flex-row items-center mt-8 gap-3">
                <button
                    class="bg-[#396ce5] text-white px-6 py-2.5 h-14 rounded-sm text-sm font-medium flex items-center text-center space-x-2 hover:bg-[#3360CC] transition"
                    type="button">
                        Visit Rooms
                </button>
                <a class="bg-white text-[#396ce5] px-6 py-2.5 h-14 rounded-sm text-sm font-medium flex items-center text-center space-x-2 hover:bg-[#F7F7F7] transition"
                    href="#">
                    Get Started
                </a>
            </div>
        </div>
        <div aria-label="Photos of leaders" class="mt-12 grid grid-cols-2 gap-6 pb-6">
    <img alt="" class="w-36 h-44 rounded-lg hover:scale-105 transition duration-300 object-cover shadow-lg"
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80"
        width="120" height="140" />
    <img alt="" class="w-36 h-44 rounded-lg hover:scale-105 transition duration-300 object-cover shadow-lg"
        src="https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?auto=format&fit=crop&w=400&q=80"
        width="120" height="140" />
    <img alt="" class="w-36 h-44 rounded-lg hover:scale-105 transition duration-300 object-cover shadow-lg"
        src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80"
        width="120" height="140" />
    <img alt="" class="w-36 h-44 rounded-lg hover:scale-105 transition duration-300 object-cover shadow-lg"
        src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&q=80"
        width="120" height="140" />
</div>
        </main>
        <form onSubmit={onSearch}
              className="bg-white text-black rounded-lg py-4 
                         flex flex-col md:flex-row max-md:items-center gap-4 
                         mx-auto justify-center max-w-5xl mb-30">
                <div>
                    <div className='flex items-center gap-2'>
                        <img src={assets.calenderIcon} alt="" className='h-4' />
                        <label htmlFor="destinationInput">Destination</label>
                    </div>
                    <input list='destinations' onChange={e => setDestination(e.target.value)} value={destination} id="destinationInput" type="text" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" required />
                    <datalist id="destinations">
                        {cities.map((city, index) => (
                            <option key={index} value={city} />
                        ))}
                    </datalist>
                </div>

                <div>
                    <div className='flex items-center gap-2'>
                        <img src={assets.calenderIcon} alt="" className='h-4' />
                        <label htmlFor="checkIn">Check in</label>
                    </div>
                    <input id="checkIn" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
                </div>

                <div>
                    <div className='flex items-center gap-2'>
                        <img src={assets.calenderIcon} alt="" className='h-4' />
                        <label htmlFor="checkOut">Check out</label>
                    </div>
                    <input id="checkOut" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
                </div>

                <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                    <label htmlFor="guests">Guests</label>
                    <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
                </div>
                <button className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
                    <img src={assets.searchIcon} alt="searchIcon" className='h-7' />
                    <span>Search</span>
                </button>
            </form>
      </section>
  )
}

export default Hero
