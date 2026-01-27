import React, { useState } from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";


const NewsLetter = () => {
    const { axios } = useAppContext();
    
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

const handleSubscribe = async () => {
  if (!email) {
    setStatus("error");
    setMessage("Please enter an email address");
    return;
  }

  try {
    setStatus("loading");

    const { data } = await axios.post("/api/newsletter/subscribe", {
      email,
    });

    if (data.message) {
      setStatus("success");
      setMessage(data.message);
      setEmail("");
    }
  } catch (err) {
    setStatus("error");
    setMessage(err.response?.data?.message || err.message);
  }
};

  return (
    <div className="flex flex-col items-center max-w-5xl lg:w-full rounded-2xl px-4 py-12 md:py-16 mx-2 lg:mx-auto my-30 bg-gray-900 text-white">
      <Title
        title="Stay Inspired"
        subTitle="Join our newsletter and be the first to discover new destinations, exclusive offers, and travel inspiration."
      />

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6 w-full">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="bg-white/10 px-4 py-2.5 border border-white/20 rounded outline-none max-w-66 w-full"
          disabled={status === "loading"}
        />

        <button
          onClick={handleSubscribe}
          disabled={status === "loading"}
          className="flex items-center justify-center gap-2 group bg-black px-4 md:px-7 py-2.5 rounded active:scale-95 transition-all"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
          <img
            src={assets.arrowIcon}
            alt="arrow-icon"
            className="w-3.5 invert group-hover:translate-x-1 transition-all"
          />
        </button>
      </div>

      {message && (
        <p
          className={`mt-4 text-sm ${
            status === "success" ? "text-green-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}

      <p className="text-gray-500 mt-6 text-xs text-center">
        By subscribing, you agree to our Privacy Policy and consent to receive
        updates.
      </p>
    </div>
  );
};

export default NewsLetter;
