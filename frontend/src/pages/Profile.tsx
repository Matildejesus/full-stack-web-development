import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
// import { applicationSummary } from "../types/applicationSummary";
import { userApi, User } from "@/services/api";


export default function Profile(){
    const {user} = useAuth();

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="mx-8 mt-4 flex justify-between">
          <button className="font-semibold rounded-md shadow-sm">
            <Link className="font-serif" href="/CandidateHomePage">
              Back
            </Link>
          </button>
        </div>

        <div className="p-8">
          <p><strong>Name:</strong> {user ? `${user.firstName} ${user.lastName}` : "Not available"}</p>
          <p><strong>Email:</strong> {user?.email || "Not available"}</p>
          <p><strong>Date of Joining:</strong> </p>
          {/* {user?.createdAt ? user.createdAt.toLocaleDateString() : "Not available"}</p> */}
          </div>
      </div>
      <Footer />
    </>
  );


}


  