import { useAuth, useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
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

    const safeError = (err) => {
        if (!user) return;
        toast.error(err?.response?.data?.message || err.message);
    };

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

    const authHeaders = async () => {
        if (!user) return {};
        return { Authorization: `Bearer ${await getToken()}` };
    };

    const fetchUser = async () => {
        try {
            const headers = await authHeaders();
            const { data } = await axios.get("/api/user", { headers });
            if (data.success) {
                setIsOwner(data.role === "hotelOwner");
                setAdmin(data.role === "Admin");
                setSearchedCities(data.recentSearchedCities || []);
                fetchOwnerHotels();
            }
        } catch (err) {
            safeError(err);
        }
    };

    const fetchPendingHotels = async () => {
        try {
            const { data } = await axios.get("/api/hotels/pending");
            if (data.success) setPendingCurrent(data.hotelsP);
        } catch (err) {
            safeError(err);
        }
    };

    const fetchRooms = async () => {
        try {
            const { data } = await axios.get("/api/rooms");
            if (data.success) setRooms(data.rooms);
        } catch (err) {
            safeError(err);
        }
    };

    const fetchHotels = async () => {
        try {
            const { data } = await axios.get("/api/hotels");
            if (data.success) setHotels(data.hotels);
        } catch (err) {
            safeError(err);
        }
    };

    const fetchOrders = async () => {
        try {
            const headers = await authHeaders();
            const { data } = await axios.get("/api/bookings/orders", { headers });
            if (data.success) setOrders(data.orders);
        } catch (err) {
            safeError(err);
        }
    };

    const fetch_hotelRooms = async () => {
        try {
            const headers = await authHeaders();
            const { data } = await axios.get("/api/rooms", { headers });
            if (data.success) set_hotel_Rooms(data.rooms);
        } catch (err) {
            safeError(err);
        }
    };

    const fetchPendingPayments = async () => {
        try {
            const headers = await authHeaders();
            const { data } = await axios.get("/api/hotels/payment", { headers });
            if (data.success) setPendingPayment(data.pendingBookings);
        } catch (err) {
            safeError(err);
        }
    };

    const fetchCities = async () => {
        try {
            const headers = await authHeaders();
            const { data } = await axios.get("/api/cities", { headers });
            if (data.success) setCity(data.cities);
        } catch (err) {
            safeError(err);
        }
    };

    const fetchOwnerHotels = async () => {
        try {
            const headers = await authHeaders();
            const { data } = await axios.get("/api/hotels/owner", { headers });
            if (data.success) setPending(data.hotelTemp.length > 0);
        } catch (err) {
            if (user) toast.error("Unable to fetch your hotels");
        }
    };

    useEffect(() => {
        if (!user) {
            resetAppContext();
            setLoading(false);
            fetchRooms();
            fetchHotels();
            fetch_hotelRooms();
            return;
        }

        setLoading(true);

        Promise.all([
            fetchUser(),
            fetchPendingHotels(),
            fetch_hotelRooms(),
            fetchPendingPayments(),
            fetchOrders(),
            fetchCities(),
        ]).finally(() => setLoading(false));

        fetchRooms();
        fetchHotels();
    }, [user]);

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
