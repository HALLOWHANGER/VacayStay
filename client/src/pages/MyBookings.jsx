import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const MyBookings = () => {

    const { axios, getToken, user, currency, navigate } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [showReschedule, setShowReschedule] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [activeBookingId, setActiveBookingId] = React.useState(null);
 const [NewcheckInDate, setNewCheckInDate] = React.useState(null);
  const [NewcheckOutDate, setNewCheckOutDate] = React.useState(null);

const getPaymentLabel = (
  paymentStatus,
  refundStatus,
  status, rescheduleRequest
) => {
  if (paymentStatus === "paid" && refundStatus === "none" && rescheduleRequest.requested === false) {
    return "Paid";
  }

  if (paymentStatus === "awaiting" && refundStatus === "requested") {
    return "Refund Requested";
  }

  if (paymentStatus === "awaiting" && refundStatus === "refunded") {
    return "Refunded";
  }

  if (status === "cancelled") {
    return "Cancelled";
  }

  if (status === "pending" && paymentStatus === "awaiting" && refundStatus === "none") {
    return "Pending Payment";
  }

  if (rescheduleRequest && rescheduleRequest.status === "pending") {
    return "Reschedule Requested";
  }

    if (refundStatus === "declined") {
    return "Refund Declined";
  }


  return "Unknown";
};

  const disabledDates = React.useMemo(() => {
    const dates = [];

    bookings.forEach((b) => {
      if (b.status === "cancelled" || b.status === "refunded") return;

      const start = new Date(b.checkInDate);
      const end = new Date(b.checkOutDate);
      let current = new Date(start);

      while (current <= end) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
    });

    return dates;
  }, [bookings]);


  const handleReschedule = (bookingId) => {
    setActiveBookingId(bookingId);
    setNewCheckInDate(null);
    setNewCheckOutDate(null);
    setShowReschedule(true);
  };

  const handleCancelPopup = (bookingId) => {
    setActiveBookingId(bookingId);
    setShowCancel(true);
  };

const submitReschedule = async (bookingId, newCheckInDate, newCheckOutDate) => {
  if (!bookingId || !newCheckInDate || !newCheckOutDate) return;

  try {
    const { data } = await axios.post(
      "/api/bookings/reschedule",
      {
        bookingId,
        newCheckInDate,
        newCheckOutDate,
      },
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );

    if (data.success) {
      toast.success("Reschedule request sent");
      fetchUserBookings();
      setShowReschedule(false);
    }
  } catch (err) {
    toast.error(
      err?.response?.data?.message || "Failed to request reschedule"
    );
  }
};

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

    const handlePayment = async (bookingId) => {
        try {
            const { data } = await axios.post('/api/bookings/stripe-payment', { bookingId }, { headers: { Authorization: `Bearer ${await getToken()}` } })
            if (data.success) {
                window.location.href = data.url
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
  }
  
  const handleRebook = (roomId) => {
    navigate(`/rooms/${roomId}`);
  }

  const handleCancel = async (bookingId) => {
    try {
      const { data } = await axios.put(
        `/api/bookings/${bookingId}/request_refund`,
        {},
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
    
      if (data.success) {
        toast.success("Booking refunded");
        fetchUserBookings();
        setShowCancel(false)
      }
    } catch (err) {
      toast.error(err.message);
    }
  }


  
  

    useEffect(() => {
        if (user) {
            fetchUserBookings();
        }
    }, [user]);

return (
    <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="max-w-6xl mt-8 w-full text-gray-800">

        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t"
          >
            {/* LEFT */}
            <div className="flex flex-col md:flex-row">
              <img
                className="min-md:w-44 rounded shadow object-cover"
                src={booking.room.images[0]}
                alt="hotel"
              />

              <div className="flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4">
                <p className="text-2xl">
                  {booking.hotel.name}{" "}
                  <span className="text-sm">({booking.room.roomType})</span>
                </p>

                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <img src={assets.locationIcon} alt="" />
                  {booking.hotel.address}
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <img src={assets.guestsIcon} alt="" />
                  Guests: {booking.guests}
                </div>

                <p className="text-base">
                  Total: {currency}
                  {booking.totalPrice}
                </p>
              </div>
            </div>

            {/* MIDDLE */}
            <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8">
              <div>
                
                <p>Check-In:</p>
                <p className="text-gray-500 text-sm">
                  {new Date(booking.checkInDate).toDateString()}
                </p>
              </div>
              <div>
                <p>Check-Out:</p>
                <p className="text-gray-500 text-sm">
                  {new Date(booking.checkOutDate).toDateString()}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-start pt-3 gap-2">
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${
                    booking.paymentStatus === "paid"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                />
                <p
                  className={`text-sm ${
                    booking.paymentStatus === "paid"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {getPaymentLabel(booking.paymentStatus, booking.refundStatus, booking.status, booking.rescheduleRequest)}

                </p>


              </div>

              {/* PAY NOW */}
              {booking.paymentStatus !== "paid" &&
                booking.status !== "cancelled" &&
                booking.status !== "refunded" &&
                booking.refundStatus !== "requested" &&
                (
                  <button
                    onClick={() => handlePayment(booking._id)}
                    className="px-4 py-1.5 text-xs border rounded-full hover:bg-gray-200 transition-colors duration-200"
                  >
                    Pay Now
                  </button>
                )}

              {booking.refundStatus === "requested" &&
                booking.status !== "cancelled" &&
                booking.status !== "refunded" && (
                <> </>
                )}

              {booking.paymentStatus === "paid" &&
                booking.status !== "cancelled" &&
                booking.status !== "refunded" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCancelPopup(booking._id)}
                      className="px-4 py-1.5 text-xs border border-red-400 text-red-500 rounded-full hover:bg-red-200 transition-colors duration-200"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => handleReschedule(booking._id)}
                      className="px-4 py-1.5 text-xs border border-amber-400 text-amber-600 rounded-full hover:bg-amber-200 transition-colors duration-200"
                    >
                      Reschedule
                    </button>
                  </div>
                )}

              {/* REBOOK */}
              {(booking.status === "cancelled" ||
                booking.status === "refunded") && (
                <button
                  onClick={() => handleRebook(booking.room._id)}
                  className="px-4 py-1.5 text-xs border border-blue-400 text-blue-500 rounded-full hover:bg-blue-200 transition-colors duration-200"
                >
                  Rebook Room
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ------------------ RESCHEDULE MODAL ------------------ */}
      {showReschedule && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setShowReschedule(false)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-md p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-3">
              Reschedule Booking
            </h3>

            <h4 className="text-lg font-semibold mb-3">
              New Check-In Date
            </h4>

            <DatePicker
              selected={NewcheckInDate}
              onChange={(date) => {
                setNewCheckInDate(date);
                setNewCheckOutDate(null);
              }}
              minDate={new Date()}
              maxDate={new Date(
                new Date().setFullYear(new Date().getFullYear() + 1)
              )}
              excludeDates={disabledDates}
              placeholderText="Check-In"
              className="w-full rounded border px-3 py-2 mt-1.5"
          />
          
            <h4 className="text-lg font-semibold mb-3 mt-4">
              New Check-Out Date
            </h4>

          <DatePicker
              selected={NewcheckOutDate}
              onChange={(Outdate) => {
                setNewCheckOutDate(Outdate);
              }}
              minDate={new Date()}
              maxDate={new Date(
                new Date().setFullYear(new Date().getFullYear() + 1)
              )}
              excludeDates={disabledDates}
              placeholderText="Check-Out"
              className="w-full rounded border px-3 py-2 mt-1.5"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowReschedule(false)}
                className="px-4 py-1.5 text-xs border rounded-full"
              >
                Cancel
              </button>

              <button
                disabled={!NewcheckInDate || !NewcheckOutDate || !activeBookingId}
                onClick={() => {
                  submitReschedule(activeBookingId, NewcheckInDate, NewcheckOutDate);
                  setShowReschedule(false);
                }}
                className="px-4 py-1.5 text-xs border border-blue-500 text-blue-600 rounded-full disabled:opacity-50"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

    {showCancel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setShowCancel(false)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-md p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-3">
              Cancel Booking
            </h3>

            <h4 className="text-lg font-semibold mb-3">
              Are you sure you want to cancel this booking, and request a refund?
            </h4>
            
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowCancel(false)}
                className="px-4 py-1.5 text-xs border rounded-full"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleCancel(activeBookingId);
                  setShowCancel(false);
                }}
                className="px-4 py-1.5 text-xs border border-blue-500 text-blue-600 rounded-full disabled:opacity-50"
              >
                Confirm Cancelation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings
