import React from "react";

function Hero() {
  return (
    <section className="bg-gray-100 flex flex-col items-center justify-center text-center px-6 py-24 md:py-24">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-600">
          SIMPLEST AND FASTEST WAY TO TRACK <br/>AND RECEIVE PAYMENTS WORLDWIDE.
        </h1>

        <p className="text-lg md:text-xl text-gray-600">
          Just link your trading accounts and Goacceptnow accounts and recieve payments worldwide.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#get-started"
            className="bg-sky-600 text-white px-6 py-3 rounded-3xl font-medium hover:bg-blue-700 transition"
          >
            Link Accounts
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;

