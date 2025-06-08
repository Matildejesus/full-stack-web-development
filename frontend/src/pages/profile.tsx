import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { lecturerCourseService, LecturerCoursesResponse, lecturerService } from "@/services/api";
import { Role, User } from "@/types/types";
import ProfileContent from "@/components/ProfileContent";

export default function Profile(){
    const {updateUserProfile} = useAuth();
    const [user, setUser] = useState<User | null>();
    const [lecturerCourses, setLecturerCourses] = useState<LecturerCoursesResponse[]>();

    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser)
            setUser(parsedUser);
            if (parsedUser?.role === Role.LECTURER) {
                console.log(" user is a lecturer: ", parsedUser.id);

                lecturerService.getLecturer(parsedUser.id)
                    .then((lecturer) => {
                        console.log("lecturer: ", lecturer);
                        return lecturerCourseService.getLecturerCourses(lecturer.id);
                    })
                    .then((lecturerCourses) => {
                        setLecturerCourses(lecturerCourses);
                    })
                    .catch(err => console.error("Error fetching lecturer courses:", err));
            }
        }
       
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && user) {
            const updatedUser = { ...user, avatarUrl: URL.createObjectURL(file) };
            setUser(updatedUser);
            localStorage.setItem("currentUser", JSON.stringify(updatedUser));
            console.log("updated user: ", updatedUser);
        }
        console.log("user: ", user);
    };

    const handleUpdateUser = async(e:React.FormEvent) => {
        e.preventDefault();
        console.log("handing the update");
        try {
            if (!user) return;
            const updatedUser = await updateUserProfile(user);
            console.log(updatedUser);
        } catch (error) {
            console.error("Error updating avatar:", error);
        }
    }

    return (
        <>
        <div className="flex flex-col min-h-screen">
            <Header />
            {user && (
                <ProfileContent 
                    user={user}
                    onSubmit={handleUpdateUser}
                    onChange={handleFileChange}
                    lecturerCourses={lecturerCourses}
                />
            )}
        </div>
        <Footer />
        </>
    );
}


  