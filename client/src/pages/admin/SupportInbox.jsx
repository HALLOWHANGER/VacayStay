import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import Title from "../../components/Title";
import toast from "react-hot-toast";

const SupportInbox = () => {
  const { axios, getToken, user } = useAppContext();

  const [messages, setMessages] = useState([]);
  const [activeMessage, setActiveMessage] = useState(null);
  const [reply, setReply] = useState("");

const fetchMessages = async () => {
  try {
    const { data } = await axios.get("/api/contact", {
      headers: { Authorization: `Bearer ${await getToken()}` },
    });

    if (data.success) {
      setMessages(data.data || []);
    } else {
      toast.error(data.message);
    }
  } catch (err) {
    toast.error(err.message);
    setMessages([]);
  }
};


  const sendReply = async () => {
    if (!reply.trim()) return toast.error("Reply cannot be empty");

    try {
      const { data } = await axios.post(
        "/api/contact/reply",
        {
          messageId: activeMessage._id,
          reply,
        },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );


      if (data.success) {
        toast.success("Reply sent");
        setReply("");
      } else toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (user) fetchMessages();
  }, [user]);

  return (
    <div>
      <Title
        align="left"
        title="Support Messages"
        subTitle="View and reply to customer support messages"
      />

      <div className="mt-6 flex h-[500px] border rounded-lg overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/3 border-r overflow-y-auto">
  {messages && messages.length > 0 ? (
    messages.map((msg) => (
      <div
        key={msg._id}
        onClick={() => setActiveMessage(msg)}
        className={`p-4 cursor-pointer border-b hover:bg-gray-50 ${
          activeMessage?._id === msg._id ? "bg-gray-100" : ""
        }`}
      >
        <p className="font-medium">{msg.name}</p>
        <p className="text-xs text-gray-500">{msg.email}</p>
        <p className="text-sm truncate mt-1">{msg.message}</p>
      </div>
    ))
  ) : (
    <p className="text-gray-500 text-center mt-20">
      No support messages found
    </p>
  )}
</div>


        {/* Message View */}
        <div className="flex-1 flex flex-col p-4">
          {activeMessage ? (
            <>
              <div className="mb-4">
                <h3 className="font-semibold">{activeMessage.name}</h3>
                <p className="text-sm text-gray-500">{activeMessage.email}</p>
                <div className="mt-3 p-3 bg-gray-50 rounded">
                  {activeMessage.message}
                </div>
              </div>

              <textarea
                className="border rounded p-3 w-full flex-1 resize-none"
                placeholder="Type your reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />

              <button
                onClick={sendReply}
                className="mt-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Send Reply
              </button>
            </>
          ) : (
            <p className="text-gray-500 text-center mt-20">
              Select a message to view
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportInbox;
