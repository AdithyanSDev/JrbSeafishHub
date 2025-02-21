import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Features from "../components/Features";
import ProductCard from "../components/ProductCard";
import ServiceSection from "../components/Services";
import Banner from "../components/Banner";
import BestsellerProducts from "../components/BestSeller";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <ProductCard />
      <ServiceSection />

      <Banner />
      <BestsellerProducts />
      <Footer />
    </>
  );
};

export default Home;
