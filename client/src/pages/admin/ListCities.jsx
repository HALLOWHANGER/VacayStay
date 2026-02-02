import React, { useEffect, useState } from 'react';
import Title from '../../components/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ListCity = () => {
    const { axios, getToken, user } = useAppContext();
    const [cities, setCities] = useState([]);
    const [newCity, setNewCity] = useState('');


    const fetchCities = async () => {
        try {
            const { data } = await axios.get('/api/cities', { headers: { Authorization: `Bearer ${await getToken()}` } });
            if (data.success) setCities(data.cities);
            else toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const addCity = async () => {
        if (!newCity.trim()) return toast.error("City name cannot be empty");

        try {
            const { data } = await axios.post('/api/cities', { name: newCity.trim() }, { headers: { Authorization: `Bearer ${await getToken()}` } });
            if (data.success) {
                toast.success(data.message);
                setNewCity('');
                fetchCities();
            } else toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const deleteCityHandler = async (id) => {
        try {
            const { data } = await axios.delete(`/api/cities/${id}`, { headers: { Authorization: `Bearer ${await getToken()}` } });
            if (data.success) {
                toast.success(data.message);
                fetchCities();
            } else toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (user) fetchCities();
    }, [user]);

    return (
        <div>
            <Title
                align='left'
                font='outfit'
                title='City Listings'
                subTitle='View and manage all available cities. Add new cities to expand your coverage.'
            />

            {/* Add City Form */}
            <div className="mt-6 mb-4 flex gap-2 items-center">
                <input
                    type="text"
                    className="border px-4 py-2 rounded w-full"
                    placeholder="Enter city name"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                />
                <button
                    onClick={addCity}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Add City
                </button>
            </div>

            <p className='text-gray-500 mt-4'>Total Cities</p>
            <div className='w-full text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3'>
                <table className='w-full'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='py-3 px-4 text-gray-800 font-medium'>City Name</th>
                            <th className='py-3 px-4 text-gray-800 font-medium text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-sm'>
                        {cities.map((city) => (
                            <tr key={city._id}>
                                <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>{city.name}</td>
                                <td className='py-3 px-4 border-t border-gray-300 text-center'>
                                    <button
                                        onClick={() => deleteCityHandler(city._id)}
                                        className='text-red-500 hover:underline'
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListCity;
