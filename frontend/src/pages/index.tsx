import React from "react";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import Footer from "../components/Footer";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
    const { user } = useAuth();
    return (
        <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1">
        {/* <Sidebar /> */}
            <MainContent user={user} />
        </div>
        <div>
            
        </div>
        <Footer />
        </div>
        
    );
}
