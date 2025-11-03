import React from "react";
import { Link } from "react-router-dom";

function Exchanges() {
  return (
    <section className="bg-white flex flex-col items-center justify-center text-center px-6 py-24">
      <h2 className="text-3xl font-bold text-gray-700 mb-10">
        Choose Your Exchange
      </h2>

      {/* Responsive grid layout */}
      <div
        className="grid gap-8 w-full max-w-6xl"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >

        {/* Localcoinswap */}
    <div className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-lg transition">
      <img
        src="/localcoinswap.png"
        alt="Localcoinswap"
        className="mx-auto mb-4 h-36 w-36 object-contain"
      />
      <p className="text-xl font-semibold text-gray-700">Localcoinswap</p>

      <div className="flex flex-col space-y-2 mt-4 font-semibold text-blue-600">
      <Link to="/localcoinswap">
        <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition w-full">
          Accept
        </button>
      </Link>

    <Link to="/localcoinswap">
      <button className="bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition w-full">
        Cancel
      </button>
    </Link>
  </div>
</div>


        {/* Noones */}
        <div className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-lg transition">
          <img
            src="/noones.png"
            alt="Noones"
            className="mx-auto mb-4 h-32 w-32 object-contain"
          />
          <p className="text-xl font-semibold text-gray-700">Noones</p>
          <div className="flex flex-col space-y-2 mt-4 font-semibold text-blue-600">
            <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
              Accept
            </button>
            <button className="bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition">
              Cancel
            </button>
          </div>
        </div>

        {/* Paxful */}
        <div className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-lg transition">
          <img
            src="/paxful.png"
            alt="Paxful"
            className="mx-auto mb-4 h-28 w-28 object-contain"
          />
          <p className="text-xl font-semibold text-gray-700">Paxful</p>
          <div className="flex flex-col space-y-2 mt-4 font-semibold text-blue-600">
            <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
              Accept
            </button>
            <button className="bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition">
              Cancel
            </button>
          </div>
        </div>

        {/* Remitano */}
        <div className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-lg transition">
          <img
            src="/remitano.png"
            alt="Remitano"
            className="mx-auto mb-4 h-24 w-24 object-contain"
          />
          <p className="text-xl font-semibold text-gray-700">Remitano</p>
          <div className="flex flex-col space-y-2 mt-4 font-semibold text-blue-600">
            <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
              Accept
            </button>
            <button className="bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition">
              Cancel
            </button>
          </div>
        </div>

        {/* Bybit */}
        <div className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-lg transition">
          <img
            src="/bybit.png"
            alt="Bybit"
            className="mx-auto mb-4 h-24 w-28 object-contain"
          />
          <p className="text-xl font-semibold text-gray-700">Bybit</p>
          <div className="flex flex-col space-y-2 mt-4 font-semibold text-blue-600">
            <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
              Accept
            </button>
            <button className="bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition">
              Cancel
            </button>
          </div>
        </div>

        {/* Bitvalve */}
        <div className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-lg transition">
          <img
            src="/bitvalve.png"
            alt="Bitvalve"
            className="mx-auto mb-4 h-20 w-20 object-contain"
          />
          <p className="text-xl font-semibold text-gray-700">Bitvalve</p>
          <div className="flex flex-col space-y-2 mt-4 font-semibold text-blue-600">
            <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
              Accept
            </button>
            <button className="bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition">
              Cancel
            </button>
          </div>
        </div>

        {/* Kraken */}
        <div className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-lg transition">
          <img
            src="/kraken.png"
            alt="kraken"
            className="mx-auto mb-4 h-24 w-28 object-contain"
          />
          <p className="text-xl font-semibold text-gray-700">Kraken</p>
          <div className="flex flex-col space-y-2 mt-4 font-semibold text-blue-600">
            <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
              Accept
            </button>
            <button className="bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition">
              Cancel
            </button>
          </div>
        </div>

        {/* Bitstamp */}
        <div className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-lg transition">
          <img
            src="/bitstamp.png"
            alt="bitstamp"
            className="mx-auto mb-4 h-24 w-28 object-contain"
          />
          <p className="text-xl font-semibold text-gray-700">Bitstamp</p>
          <div className="flex flex-col space-y-2 mt-4 font-semibold text-blue-600">
            <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
              Accept
            </button>
            <button className="bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition">
              Cancel
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Exchanges;
