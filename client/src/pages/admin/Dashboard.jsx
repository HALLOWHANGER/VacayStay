import React from "react";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from 'react'
import toast from "react-hot-toast";



import { BadgeCheck, XCircle, Clock } from "lucide-react";



export default function Dashboard() {

    const { Pending, PendingPayment, orders, user, axios } = useAppContext()

  const [dashboardData, setDashboardData] = useState({
          bookings: [],
          totalBookings: 0,
          totalRevenue: 0,
      });
  
      const fetchDashboardData = async () => {
          try {
              const { data } = await axios.get('/api/bookings/hotelAdmin')
              if (data.success) {
                  setDashboardData(data.dashboardData)
              } else {
                  toast.error(data.message)
              }
          } catch (error) {
              toast.error(error.message)
          }
      }
  
      useEffect(() => {
          if (user) {
              fetchDashboardData();
          }
      }, [user]);
  
    const Card = ({ children }) => (
  <div className="rounded-2xl shadow-sm bg-white">{children}</div>
);

const CardContent = ({ children }) => (
  <div className="p-5">{children}</div>
);


const resolveOrderStatus = (dashboardData) => {
  const { paymentStatus, refundStatus, status } = dashboardData;

  if (paymentStatus === "awaiting" && refundStatus !== "requested") {
    return "Pending Payment";
  }

  if (paymentStatus === "awaiting" && refundStatus === "requested") {
    return "Requested Refund";
  }

  if (refundStatus === "refunded") {
    return "Cancelled & Refunded";
  }

  if (paymentStatus === "paid") {
    return "Paid";
  }

  if (paymentStatus === "cancelled") {
    return "Cancelled";
  }

  if (paymentStatus === "cancelled" && status === "refunded" && refundStatus === "refunded") {
    return "Cancelled & Refunded";
  }

  return "Unknown";
};



const STATUS_MAP = {
  Paid: {
    color: "text-green-500",
    icon: <BadgeCheck className="w-4 h-4 text-green-500" />,
  },

  "Cancelled & Refunded": {
    color: "text-red-500",
    icon: <XCircle className="w-4 h-4 text-red-500" />,
  },

  Cancelled: {
    color: "text-red-500",
    icon: <XCircle className="w-4 h-4 text-red-500" />,
  },

  "Pending Payment": {
    color: "text-yellow-500",
    icon: <Clock className="w-4 h-4 text-yellow-500" />,
  },

    "Requested Refund": {
    color: "text-yellow-500",
    icon: <Clock className="w-4 h-4 text-yellow-500" />,
  },

  Unknown: {
    color: "text-gray-500",
    icon: <Clock className="w-4 h-4 text-gray-500" />,
  },
};


  const statusColor = (status) => {
  return STATUS_MAP[status]?.color || "text-gray-500";
};

const statusIcon = (status) => {
  return STATUS_MAP[status]?.icon || <Clock className="w-4 h-4 text-gray-500" />;
};


  return (
    <div className="w-full p-6 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 flex items-center gap-2">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-5">
            <p className="text-slate-600">Pending Hotel Requests</p>
            <h2 className="text-3xl font-semibold">{ Pending.length }</h2>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-5">
            <p className="text-slate-600">Pending Payments</p>
            <h2 className="text-3xl font-semibold">{PendingPayment.length}</h2>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-5">
            <p className="text-slate-600">Booked Rooms</p>
            <h2 className="text-3xl font-semibold">{ dashboardData.totalBookings }</h2>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-4 overflow-x-auto">
        <table className="w-full text-left min-w-[700px]">
          <thead>
            <tr className="text-slate-600 border-b">
              <th className="p-3">Order ID</th>
              <th className="p-3">Ordered Date</th>
              <th className="p-3">Room Type</th>
              <th className="p-3">Hotel</th>
              <th className="p-3">Product Price</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
  const displayStatus = resolveOrderStatus(dashboardData.bookings[index] || {});

  return (
    <tr key={index} className="border-b hover:bg-slate-50 transition">
      <td className="p-3">{order.id}</td>
      <td className="p-3">{order.date}</td>
      <td className="p-3">{order.name}</td>
      <td className="p-3">{order.hotel}</td>
      <td className="p-3">{order.price}</td>
      <td className="p-3 flex items-center gap-2">
        {statusIcon(displayStatus)}
        <span className={statusColor(displayStatus)}>
          {displayStatus}
        </span>
      </td>
    </tr>
  );
})}

          </tbody>
        </table>
      </div>
    </div>
  );
}
