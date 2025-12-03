import { useAuth, useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY || "$";
    const navigate = useNavigate();
    const { user } = useUser();
    const { getToken } = useAuth();

    const [isOwner, setIsOwner] = useState(false);
    const [isAdmin, setAdmin] = useState(false);
    const [isPending, setPending] = useState(false);
    const [Pending, setPendingCurrent] = useState(false);
    const [PendingPayment, setPendingPayment] = useState(false);
    const [showHotelReg, setShowHotelReg] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [hotel_rooms, set_hotel_Rooms] = useState([]);
    const [cities, setCity] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [orders, setOrders] = useState([]);
    const [searchedCities, setSearchedCities] = useState([]);
    const [loading, setLoading] = useState(true);

    const facilityIcons = {
        "Free WiFi": assets.freeWifiIcon,
        "Free Breakfast": assets.freeBreakfastIcon,
        "Room Service": assets.roomServiceIcon,
        "Mountain View": assets.mountainIcon,
        "Pool Access": assets.poolIcon,
    };

    // --- RESET CONTEXT ON LOGOUT ---
    const resetAppContext = () => {
        setIsOwner(false);
        setAdmin(false);
        setPending(false);
        setPendingCurrent(false);
        setPendingPayment(false);
        setShowHotelReg(false);
        setRooms([]);
        set_hotel_Rooms([]);
        setCity([]);
        setHotels([]);
        setOrders([]);
        setSearchedCities([]);
    };

    // --- FETCH FUNCTIONS ---
    const fetchUser = async () => {
        if (!user) return;
        try {
            const token = await getToken();
            const { data } = await axios.get('/api/user', { headers: { Authorization: `Bearer ${token}` } });
            if (data.success) {
                setIsOwner(data.role === "hotelOwner");
                setAdmin(data.role === "Admin");
                setSearchedCities(data.recentSearchedCities || []);
                fetchOwnerHotels();
            }
        } catch (error) {
            console.log("Fetch user error:", error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const fetchPendingHotels = async () => {
        if (!user) return;
        try {
            const { data } = await axios.get('/api/hotels/pending');
            if (data.success) setPendingCurrent(data.hotelsP);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const fetchRooms = async () => {
        try {
            const { data } = await axios.get('/api/rooms');
            if (data.success) setRooms(data.rooms);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const fetchHotels = async () => {
        try {
            const { data } = await axios.get('/api/hotels');
            if (data.success) setHotels(data.hotels);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const fetchOrders = async () => {
        if (!user) return;
        try {
            const { data } = await axios.get('/api/bookings/orders');
            if (data.success) setOrders(data.orders);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const fetch_hotelRooms = async () => {
        if (!user) return;
        try {
            const token = await getToken();
            const { data } = await axios.get('/api/rooms/owner', { headers: { Authorization: `Bearer ${token}` } });
            if (data.success) set_hotel_Rooms(data.rooms);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const fetchPendingPayments = async () => {
        if (!user) return;
        try {
            const { data } = await axios.get('/api/hotels/payment');
            if (data.success) setPendingPayment(data.pendingBookings);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const fetchCities = async () => {
        if (!user) return;
        try {
            const token = await getToken();
            const { data } = await axios.get('/api/cities', { headers: { Authorization: `Bearer ${token}` } });
            if (data.success) setCity(data.cities);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const fetchOwnerHotels = async () => {
        if (!user) return;
        try {
            const token = await getToken();
            const { data } = await axios.get('/api/hotels/owner', { headers: { Authorization: `Bearer ${token}` } });
            if (data.success) setPending(data.hotelTemp.length > 0);
        } catch (error) {
            toast.error("Unable to fetch your hotels");
        }
    };

    // --- EFFECTS ---
    useEffect(() => {
        if (!user) {
            resetAppContext();
            setLoading(false);
            return;
        }

        // fetch user-related data
        setLoading(true);
        Promise.all([
            fetchUser(),
            fetchPendingHotels(),
            fetch_hotelRooms(),
            fetchPendingPayments(),
            fetchOrders(),
            fetchCities()
        ]).finally(() => setLoading(false));

        // fetch general data (does not require user)
        fetchRooms();
        fetchHotels();

    }, [user]);

    // --- CONTEXT VALUE ---
    const value = {
        currency,
        navigate,
        user,
        getToken,
        isOwner,
        setIsOwner,
        isAdmin,
        setAdmin,
        Pending,
        setPendingCurrent,
        isPending,
        setPending,
        cities,
        setCity,
        PendingPayment,
        setPendingPayment,
        axios,
        showHotelReg,
        setShowHotelReg,
        hotel_rooms,
        set_hotel_Rooms,
        facilityIcons,
        rooms,
        setRooms,
        hotels,
        setHotels,
        orders,
        setOrders,
        searchedCities,
        setSearchedCities,
        loading
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
