import React, { useEffect } from 'react'
import Title from '../../components/Title'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';


const ListRoom = () => {

    const { axios, getToken, user } = useAppContext()
    const [PendingHotels, setPending] = React.useState([])
    const [Hotels, setHotels] = React.useState([])


    const fetchPending = async () => {
        try {
            const { data } = await axios.get('/api/hotels/pending_hotels', { headers: { Authorization: `Bearer ${await getToken()}` } })
            if (data.success) {
                setPending(data.hotels_pending)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchHotels = async () => {
        try {
            const { data } = await axios.get('/api/hotels/admin', { headers: { Authorization: `Bearer ${await getToken()}` } })
            if (data.success) {
                setHotels(data.hotels)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const approveHotel = async (id) => {
    try {
        await axios.post(`/api/hotels/pending/approve/${id}`, {}, { headers: { Authorization: `Bearer ${await getToken()}` } });
        toast.success("Hotel approved!");
        fetchPending();
        fetchHotels();

    } catch (error) {
    console.error(error);
    toast.error(
        error.response?.data?.message || 
        error.message || 
        "Failed to approve"
    );
}
};

    const declineHotel = async (id) => {
        try {
            await axios.delete(`/api/hotels/pending/decline/${id}`, { headers: { Authorization: `Bearer ${await getToken()}` } });
            toast.success("Hotel declined!");
            fetchPending();
            fetchHotels();
        } catch (error) {
            console.error(error); // log full error
            toast.error(
                error.response?.data?.message || 
                error.message || 
                "Failed to decline"
            );
}
    };

        const toggleAvailability = async (roomId) => {
        const { data } = await axios.post("/api/hotels/toggle-availability", { roomId }, { headers: { Authorization: `Bearer ${await getToken()}` } })
        if (data.success) {
            toast.success(data.message)
            fetchHotels()
        } else {
            toast.error(data.message)
        }
    }


    useEffect(() => {
        if (user) {
            fetchPending()
            fetchHotels()
        }
    }, [user])

    return (
        <div>
            <Title align='left' font='outfit' title='Hotel Listings' subTitle='View, edit, or manage all listed hotels. Keep the information up-to-date to provide the best experience for users.' />
            {PendingHotels.length > 0 && (
                <div>
            <p className='text-gray-500 mt-8'>Pending Hotel Requests</p>
                
        <div className='w-full text-left border border-gray-300 rounded-lg overflow-y-scroll mt-3'>
            <table className='w-full'>
            <thead className='bg-gray-50 '>
                <tr>
                <th className='py-3 px-4 text-gray-800 font-medium'>Name</th>
                <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Address</th>
                <th className='py-3 px-4 text-gray-800 font-medium'>Contact</th>
                <th className='py-3 px-4 text-gray-800 font-medium text-center'>Owner</th>
                <th className='py-3 px-4 text-gray-800 font-medium text-center'>Location</th>
                <th className='py-3 px-4 text-gray-800 font-medium text-center'>Actions</th>
                </tr>
            </thead>
            <tbody className='text-sm'>
                {PendingHotels.map((item, index) => (
                <tr key={index}>
                    <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>{item.name}</td>
                    <td className='py-3 px-4 text-gray-400 border-t border-gray-300 max-sm:hidden'>{item.address}</td>
                    <td className='py-3 px-4 text-gray-400 border-t border-gray-300'>{item.contact}</td>
                    <td className='py-3 px-4 text-gray-400 border-t border-gray-300'>{item.owner}</td>
                    <td className='py-3 px-4 text-gray-400 border-t border-gray-300'>{item.city}</td>
                    <td className='py-3 px-4 border-t border-gray-300 text-center text-sm'>
                    <div className='flex items-center justify-center gap-2'>
                        <button
                        className='px-3 py-1 bg-green-500 text-white rounded-md text-xs hover:bg-green-600 transition'
                        onClick={() => approveHotel(item._id)}
                        >
                        Approve
                        </button>

                        <button
                        className='px-3 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600 transition'
                        onClick={() => declineHotel(item._id)}
                        >
                        Decline
                        </button>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
                    </div>
                </div>
            )}
            
            <div>
            <p className='text-gray-500 mt-8'>All Hotels</p>
            <div className='w-full text-left border border-gray-300 rounded-lg overflow-y-scroll mt-3'>
            <table className='w-full'>
            <thead className='bg-gray-50 '>
                <tr>
                <th className='py-3 px-4 text-gray-800 font-medium'>Name</th>
                <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Address</th>
                <th className='py-3 px-4 text-gray-800 font-medium'>Contact</th>
                <th className='py-3 px-4 text-gray-800 font-medium text-center'>Owner</th>
                <th className='py-3 px-4 text-gray-800 font-medium text-center'>Location</th>
                <th className='py-3 px-4 text-gray-800 font-medium text-center'>Actions</th>
                </tr>
            </thead>
                    <tbody className='text-sm'>
                        {
                            Hotels.map((item, index) => (
                                <tr key={index}>
                                    <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>{item.name}</td>
                    <td className='py-3 px-4 text-gray-400 border-t border-gray-300 max-sm:hidden'>{item.address}</td>
                    <td className='py-3 px-4 text-gray-400 border-t border-gray-300'>{item.contact}</td>
                    <td className='py-3 px-4 text-gray-400 border-t border-gray-300'>{item.owner}</td>
                    <td className='py-3 px-4 text-gray-400 border-t border-gray-300'>{item.city}</td>
                                    <td className='py-3 px-4  border-t border-gray-300 text-center text-sm text-red-500'>
                                        <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                                            <input type="checkbox" className="sr-only peer" onChange={() => toggleAvailability(item._id)} checked={item.isAvailable} />
                                            <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                                            <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                        </label>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>

        </div>
    )
}

export default ListRoom