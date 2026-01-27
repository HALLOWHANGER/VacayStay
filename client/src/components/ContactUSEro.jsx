import React from "react";
import { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ContactUSEro = () => {
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
      setTimeout(() => {
      setMessage("");
    }, 2000);
    }
  } catch (err) {
    setStatus("error");
    setEmail("");
    setMessage(err.response?.data?.message || err.message);
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }
};

  return (
    <>
      <section className="flex flex-col items-center text-white text-sm pb-20 px-4 font-poppins bg-[#0a1b43]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-20 w-full mt-24 ml-20">
  <div className="max-md:px-4 lg:w-1/2">
    <h1 className="text-5xl md:text-[54px] md:leading-[4.7rem] font-semibold max-w-lg">
      Every startup begins with spark
    </h1>

    <p className="text-sm/7 max-w-md mt-3 text-white">
      Join our newsletter to stay updated with the latest news and exclusive offers.
    </p>

    <div className="flex items-center text-sm border border-slate-300 rounded-md h-[54px] max-w-md focus-within:border-indigo-600 mt-6">
      <input
        type="email"
        value={email}
        placeholder="Enter your email"
        className="rounded-md h-full px-4 w-full outline-none"
        onChange={(e) => setEmail(e.target.value)}
      />
              <button
              disabled={status === "loading"}
                onClick={handleSubscribe}
        className="px-8 h-[46px] mr-1 flex items-center justify-center text-white rounded-md bg-indigo-600 hover:bg-indigo-700 transition">
        {status === "loading" ? "Subscribing..." : "Subscribe"}
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

    <p className="text-xs mt-2 text-white">
      Only the updates you actually want.
    </p>

    <div className="flex items-center mt-9">
      <div className="flex -space-x-3.5 pr-3">
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
          alt="avatar"
          className="size-10 border-2 border-white rounded-full hover:-translate-y-px transition z-1"
        />
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
          alt="avatar"
          className="size-10 border-2 border-white rounded-full hover:-translate-y-px transition z-[2]"
        />
        <img
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
          alt="avatar"
          className="size-10 border-2 border-white rounded-full hover:-translate-y-px transition z-[3]"
        />
        <img
          src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60"
          alt="avatar"
          className="size-10 border-2 border-white rounded-full hover:-translate-y-px transition z-[4]"
        />
        <img
          src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60"
          alt="avatar"
          className="size-10 border-2 border-white rounded-full hover:-translate-y-px transition z-[4]"
        />
      </div>

      <div>
        <div className="flex items-center gap-px">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.85536 0.463527C6.00504 0.00287118 6.65674 0.00287028 6.80642 0.463526L7.82681 3.60397C7.89375 3.80998 8.08572 3.94946 8.30234 3.94946H11.6044C12.0888 3.94946 12.2901 4.56926 11.8983 4.85397L9.22687 6.79486C9.05162 6.92219 8.97829 7.14787 9.04523 7.35388L10.0656 10.4943C10.2153 10.955 9.68806 11.338 9.2962 11.0533L6.62478 9.11244C6.44954 8.98512 6.21224 8.98512 6.037 9.11244L3.36558 11.0533C2.97372 11.338 2.44648 10.955 2.59616 10.4943L3.61655 7.35388C3.68349 7.14787 3.61016 6.92219 3.43491 6.79486L0.763497 4.85397C0.37164 4.56927 0.573027 3.94946 1.05739 3.94946H4.35944C4.57606 3.94946 4.76803 3.80998 4.83497 3.60397L5.85536 0.463527Z"
                fill="#FF8F20"
              />
            </svg>
          ))}
        </div>
        <p className="text-sm text-slate-500">Used by 1,000+ people</p>
      </div>
    </div>
  </div>

  <div className="relative">
    <div className="absolute inset-0 z-[-1] rounded-lg bg-gradient-to-r from-[#661FFF] via-[#FF1994] to-[#2D73FF] blur-2xl opacity-50" />
    <img
      src="https://images.unsplash.com/photo-1681949222860-9cb3b0329878?q=80&w=450&h=560&auto=format&fit=crop"
      alt="hero"
      className="max-w-md w-full max-h-[560px] rounded-[40px] max-md:px-3 md:mr-10"
    />
  </div>
</div>
      </section>
    </>
  )
}

export default ContactUSEro;