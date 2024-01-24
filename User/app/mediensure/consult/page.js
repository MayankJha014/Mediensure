import Consult1 from "@/Components/Consult1/Consult1";
import Consult2 from "@/Components/Consult2/Consult2";
import Consult3 from "@/Components/Consult3/Consult3";
import Consult4 from "@/Components/Consult4.js/Consult4";
import Footer from "@/Components/Footer/Footer";
import Nav from "@/Components/Nav/Nav";
import React from "react";

const page = () => {
  return (
    <>
      <Nav />
      <div className="w-full relative overflow-hidden">
        <Consult1 />
        <Consult2 />
        <Consult3 />
        <Consult4 />
        <Footer />
      </div>
    </>
  );
};

export default page;
