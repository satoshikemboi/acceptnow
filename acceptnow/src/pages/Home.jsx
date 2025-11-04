
import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Exchanges from "../components/Exchanges";

function Home() {
    return (
        <div className=" bg-white">
           <Navbar />
           <Hero />
              <Exchanges />
        </div>
    );
    }
export default Home;