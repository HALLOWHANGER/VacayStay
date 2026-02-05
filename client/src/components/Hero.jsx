import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Hero = () => {
  const { axios, rooms } = useAppContext();

  const [destination, setDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const navigate = useNavigate();
  const [guests, setGuests] = useState(1);

  const [availableRooms, setAvailableRooms] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const currentYear = new Date().getFullYear();
  const minDate = `${currentYear}-01-01`;
  const maxDate = `${currentYear}-12-31`;

  const onSearch = async (e) => {
    e.preventDefault();
    setMessage("");
    setAvailableRooms([]);
    setShowPopup(false);

    if (!destination || !checkInDate || !checkOutDate) return;

    try {
      const res = await axios.post("/api/rooms/search", {
        roomType: destination,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests,
      });

      if (!res.data.availableRooms.length) {
        setMessage("❌ Room for selected dates is not available");
        return;
      }

      setAvailableRooms(res.data.availableRooms);
      setShowPopup(true);

    } catch (err) {
      console.error(err);
      setMessage("⚠️ Failed to check availability");
    }
  };

  return (
    <section className="bg-[#0a1b43] mt-20 pb-15">

        <main class="flex flex-col md:flex-row items-center max-md:text-center justify-between mt-16 pb-16 px-6 sm:px-10 md:px-24 max-w-7xl mx-auto w-full"> <div class="flex flex-col items-center md:items-start"> <p class="bg-[#396ce5] px-3.5 py-1 rounded-full mt-20 text-white">The Ultimate Hotel Experience</p> <h1 class="text-white font-semibold text-3xl sm:text-4xl md:text-5xl max-w-xl mt-5"> Discover Your Perfect Gateway Destination </h1> <p class="mt-4 text-white max-w-md text-sm sm:text-base leading-relaxed"> Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your journey today. </p> <div class="flex flex-col md:flex-row items-center mt-8 gap-3"> <button class="bg-[#396ce5] text-white px-6 py-2.5 h-14 rounded-sm text-sm font-medium flex items-center text-center space-x-2 hover:bg-[#3360CC] transition" type="button" onClick={() => navigate('/hotels')}> Visit Hotels </button> <a class="bg-white text-[#396ce5] px-6 py-2.5 h-14 rounded-sm text-sm font-medium flex items-center text-center space-x-2 hover:bg-[#F7F7F7] transition" href="/experience"> Get Started </a> </div> </div> <div aria-label="Photos of leaders" class="mt-12 grid grid-cols-2 gap-6 pb-6"> <img alt="" class="w-36 h-44 rounded-lg hover:scale-105 transition duration-300 object-cover shadow-lg" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80" width="120" height="140" /> <img alt="" class="w-36 h-44 rounded-lg hover:scale-105 transition duration-300 object-cover shadow-lg" src="https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?auto=format&fit=crop&w=400&q=80" width="120" height="140" /> <img alt="" class="w-36 h-44 rounded-lg hover:scale-105 transition duration-300 object-cover shadow-lg" src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80" width="120" height="140" /> <img alt="" class="w-36 h-44 rounded-lg hover:scale-105 transition duration-300 object-cover shadow-lg" src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&q=80" width="120" height="140" /> </div> </main>

      {/* SEARCH FORM */}
      <form
        onSubmit={onSearch}
        className="bg-white text-black rounded-lg py-4
        flex flex-col md:flex-row max-md:items-center gap-4
        mx-auto justify-center max-w-5xl mb-10"
      >
        {/* ROOM TYPE */}
        <div>
          <label className="flex items-center gap-2">
            <img src={assets.calenderIcon} className="h-4" />
            Room Type
          </label>
          <input
            list="destinations"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="rounded border px-3 py-1.5 mt-1.5 text-sm outline-none"
            required
          />
          <datalist id="destinations">
            {[...new Set(rooms.map((r) => r.roomType))].map((type) => (
              <option key={type} value={type} />
            ))}
          </datalist>
        </div>

        {/* CHECK IN */}
        <div>
          <label className="flex items-center gap-2">
            <img src={assets.calenderIcon} className="h-4" />
            Check in
          </label>
        <DatePicker
        selected={checkInDate}
        onChange={(date) => {
            setCheckInDate(date);
            setCheckOutDate(null);
        }}
        minDate={new Date()}
        maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
        placeholderText="Check-In"
        className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
        />
        </div>

        {/* CHECK OUT */}
        <div>
          <label className="flex items-center gap-2">
            <img src={assets.calenderIcon} className="h-4" />
            Check out
          </label>
          <DatePicker
                  selected={checkOutDate}
                  onChange={(date) => {
                      setCheckOutDate(date);
                  }}
                  minDate={new Date()}
                  maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                  placeholderText="Check-Out"
                  className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                  />
        </div>

        {/* GUESTS */}
        <div className="flex flex-col items-center">
          <label>Guests</label>
          <input
            type="number"
            min={1}
            max={4}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="rounded border px-3 py-1.5 mt-1.5 text-sm outline-none max-w-16"
          />
        </div>

        <button className="bg-black text-white px-6 py-3 rounded-md">
          Search
        </button>
      </form>

      {/* ERROR MESSAGE */}
      {message && (
        <p className="text-red-500 text-center font-medium">{message}</p>
      )}

      {/* POPUP */}
      {showPopup && (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[85vh] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">
        Available Rooms
      </h2>

      {availableRooms.map((room) => (
        <div
          key={room._id}
          className="border rounded-lg mb-4 overflow-hidden"
        >
          {/* IMAGE */}
          {room.images?.length > 0 && (
            <img
              src={room.images[0]}
              alt={room.roomType}
              className="w-full h-48 object-cover"
            />
          )}

          <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold">{room.roomType}</h3>

            <p className="text-gray-700">
              ₦{room.pricePerNight} <span className="text-sm">/ night</span>
            </p>

            {/* AMENITIES */}
            <div className="flex flex-wrap gap-2">
              {room.amenities?.map((amenity, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 px-2 py-1 rounded"
                >
                  {amenity}
                </span>
              ))}
            </div>

            {/* ACTION */}
            <button
              onClick={() => navigate(`/rooms/${room._id}`)}
              className="mt-3 w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
            >
              Book Now
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={() => setShowPopup(false)}
        className="w-full mt-2 border py-2 rounded-md"
      >
        Close
      </button>
    </div>
  </div>
)}

    </section>
  );
};

export default Hero;
