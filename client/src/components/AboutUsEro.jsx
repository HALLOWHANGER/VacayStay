import React from 'react'

const AboutUsEro = () => {
  return (
    <main class="flex flex-col max-md:gap-20 md:flex-row pb-20 items-center justify-between mt-40 px-4 md:px-16 lg:px-24 xl:px-32">
        <div class="flex flex-col items-center md:items-start">
<h1 class="text-center md:text-left text-4xl leading-[46px] md:text-5xl md:leading-[68px] font-semibold max-w-xl text-slate-900">
    Stress-free<br />
    vacation stays made easy.
</h1>
<p class="text-center md:text-left text-sm text-slate-700 max-w-lg mt-2">
    Discover the perfect rental, book effortlessly, and enjoy your getaway with confidence. Our team is here to help you every step of the way.
</p>

            <div class="flex items-center gap-4 mt-8 text-sm">
          <button class="bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 transition rounded-md px-7 h-11"
          onClick={() => navigate('/contact')}
          >
                    Get in touch
                </button>
                  <a href="mailto:medaiconsulting17@gmail.com" class="flex items-center gap-2 border border-slate-600 active:scale-95 hover:bg-white/10 transition text-slate-600 rounded-md px-6 h-11">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mails-icon lucide-mails"><path d="M17 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 1-1.732"/><path d="m22 5.5-6.419 4.179a2 2 0 0 1-2.162 0L7 5.5"/><rect x="7" y="3" width="15" height="12" rx="2"/></svg>
                    <span>Email us</span>
                    </a>
            </div>
        </div>
        <img src="../assets/jason-rosewell-P5aY_FocXAI-unsplash.jpg" alt="hero" class="max-w-sm sm:max-w-md lg:max-w-lg 2xl:max-w-xl transition-all duration-300" />
    </main>
  )
}

export default AboutUsEro