import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const BookingList = () => {
  const { axios, getToken, user } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [expanded, setExpanded] = useState(null);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) setBookings(data.bookings);
      else toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  const releaseRoom = async (id) => {
    try {
      const { data } = await axios.put(
        `/api/bookings/${id}/release`,
        {},
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        toast.success("Room released");
        fetchBookings();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const refundBooking = async (id) => {
    try {
      const { data } = await axios.put(
        `/api/bookings/${id}/refund`,
        {},
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        toast.success("Booking refunded");
        fetchBookings();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <Title
        align="left"
        title="Bookings"
        subTitle="Manage bookings, payments and refunds"
      />

      <div className="border rounded-lg mt-6 overflow-hidden">
        {bookings.map((b) => (
          <div key={b._id} className="border-b">
            <div
              onClick={() =>
                setExpanded(expanded === b._id ? null : b._id)
              }
              className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
            >
              <div>
                <p className="font-medium">
                  Booking #{b._id.slice(-6)}
                </p>
                <p className="text-sm text-gray-500">
                  {b.paymentStatus.toUpperCase()} • {b.status}
                </p>
              </div>

              <span className="text-blue-600">
                {expanded === b._id ? "▲" : "▼"}
              </span>
            </div>

            {expanded === b._id && (
              <div className="bg-gray-50 px-6 py-4 text-sm space-y-2">
                <p><b>Room:</b> {b.room}</p>
                <p><b>Guests:</b> {b.guests}</p>
                <p><b>Total:</b> ₦{b.totalPrice}</p>
                <p>
                  <b>Dates:</b>{" "}
                  {new Date(b.checkInDate).toDateString()} →{" "}
                  {new Date(b.checkOutDate).toDateString()}
                </p>

                <div className="flex gap-3 mt-4">
                  {b.paymentStatus !== "paid" && b.status !== "cancelled" && (
                    <button
                      onClick={() => releaseRoom(b._id)}
                      className="px-4 py-2 bg-orange-500 text-white rounded"
                    >
                      Release Room
                    </button>
                  )}

                  {b.paymentStatus === "paid" &&
                    b.refundStatus !== "refunded" && (
                      <button
                        onClick={() => refundBooking(b._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded"
                      >
                        Refund
                      </button>
                    )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingList;
