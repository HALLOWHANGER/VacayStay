import { useEffect, useState } from 'react'
import { useAppContext } from "../context/AppContext";


export default function Contact() {
    const [result, setResult] = useState("");
    const { axios } = useAppContext();
    
    const onSubmit = async (event) => {
  event.preventDefault();
  setResult("Sending...");

  const formData = new FormData(event.target);
  const payload = Object.fromEntries(formData.entries());

  try {
    await axios.post("/api/contact", payload);

    setResult("Message sent successfully!");

    setTimeout(() => {
      setResult("Submit");
    }, 2000);

    event.target.reset();
  } catch (error) {
    console.error(error);
    setResult(error.response?.data?.message || "Server error");
  }
};

    return (
        <div id="contact" className="w-full px-[12%] py-10 scroll-mt-20 bg-[url('./assets/footer-bg-color.png')] bg-no-repeat bg-[length:90%_auto] bg-center dark:bg-none">

            <h4 className="text-center mb-2 text-lg font-Ovo">Connect with Us</h4>
            <h2 className="text-center text-5xl font-Ovo">Get in touch</h2>
            <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">I&apos;d love to hear from you! If you have any questions, comments or feedback, please use the form below.</p>

            <form onSubmit={onSubmit} className="max-w-2xl mx-auto">

                <input type="hidden" name="subject" value="Vacay Stay - New form Submission" />

                <div className="grid grid-cols-auto gap-6 mt-10 mb-8">
                    <input type="text" placeholder="Enter your name" className="flex-1 px-3 py-2 focus:ring-1 outline-none border border-black rounded-md bg-grey-500 dark:bg-darkHover/30" required name="name" />

                    <input type="email" placeholder="Enter your email" className="flex-1 px-3 py-2 focus:ring-1 outline-none border border-black rounded-md bg-grey-500 dark:bg-darkHover/30" required name="email" />
                </div>
                <textarea rows="6" placeholder="Enter your message" className="w-full px-4 py-2 focus:ring-1 outline-none border border-black rounded-md bg-grey-500 mb-6 dark:bg-darkHover/30" required name="message"></textarea>
                <div className="h-captcha mb-6 max-w-full" data-captcha="true"></div>
                <button type='submit' className="py-2 px-8 w-max flex items-center justify-between gap-2 bg-black text-white rounded-full mx-auto hover:bg-black-300 duration-500 border-black" disabled={result === "Sending..."}>
                {!result ? "Submit" : result}
                </button>
            </form>
        </div>
    )
}