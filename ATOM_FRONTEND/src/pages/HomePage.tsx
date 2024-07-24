import React from "react";
import NavBar from "../components/NavBar";
import Hero from "../sections/Hero";
import Collection from "../sections/Collection";
import Services from "../sections/Services";
import Footer from "../components/Footer";

const HomePage: React.FC = () => {
  return (
    <>
  
      <Hero></Hero>
      <Collection></Collection>

      <Services></Services>
   
    </>
  );
};

export default HomePage;
