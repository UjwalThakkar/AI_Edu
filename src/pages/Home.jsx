import React from "react";
// import ButtonGradient from "./assets/svg/ButtonGradient";
import ButtonGradient from "../assets/svg/ButtonGradient";
import Benefits from "../components/Benefits";
import Collaboration from "../components/Collaboration";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Pricing from "../components/Pricing";
import Roadmap from "../components/Roadmap";
import Footer from "../components/Footer";


const Home = () => {
  return (
    <>
      <div className="pt=[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <Benefits />
        <Collaboration />
        <Services />
        <Pricing />
        <Roadmap />
        <Footer />
      </div>
      <ButtonGradient />
      
    </>
  );
};

export default Home;
