import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import Footer from "../components/Footer";



export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
       {/* <Sidebar /> */}
        <MainContent />
      </div>
      <div>
        
      </div>
      <Footer />
    </div>
    
  );
}
