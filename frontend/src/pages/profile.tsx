import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { Button, Input } from "@chakra-ui/react";
import { userService } from "@/services/api";

export default function Profile(){
    const {user, updateUserProfile} = useAuth();
    const [avatar, setAvatar] = useState<File | null>(null);

    if (!user) {
        return <p>Loading...</p>; 
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatar(file);
        }
    };

    const handleUpdateUser = async(e:React.FormEvent) => {
        e.preventDefault();
        console.log("handing the update");
        try {
            await updateUserProfile(user);
        } catch (error) {
            console.error("Error updating avatar:", error);
        }
    }

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
                <div className="rounded-full w-24 h-24 bg-gray-300 mb-4">
                    {user.avatarUrl && 
                        <img
                            src={user.avatarUrl}
                            alt="avatar"
                        />
                    }
                </div>
                <form method="post" onSubmit={handleUpdateUser}>
                    <Input 
                        name="file" 
                        type="file"
                        onChange={handleFileChange}
                    ></Input>
                    <Button type="submit">Upload</Button>
                </form>
                <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role: </strong> {user.role}</p>
                <p><strong>Date of Joining:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
        <Footer />
        </>
    );
}


  