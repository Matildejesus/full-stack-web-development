import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { Button, Input } from "@chakra-ui/react";
import { lecturerService, userService } from "@/services/api";
import { Course, Role, User } from "@/types/types";

export default function Profile(){
    const {updateUserProfile} = useAuth();
    const [user, setUser] = useState<User | null>();
    const [courses, setCourses] = useState<Course[]>();

    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser)
            setUser(parsedUser); // Set user state
            if (parsedUser?.role === Role.LECTURER) {
                lecturerService.getLecturerCourses(parsedUser.id)
                    .then(response => {
                        setCourses(response);
                        console.log(response);
                    })
                    .catch(err => console.error("Error fetching lecturer courses:", err));
            }
        }
       
    }, []);

    // useEffect(() => {
    //     if (courses) {
    //         console.log(courses);
    //     }
    // }, []);

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
            <div className="p-8">
                <div className="rounded-full w-24 h-24 bg-gray-300 mb-4">
                    {user?.avatarUrl && 
                        <img
                            src={user.avatarUrl}
                            alt="avatar"
                            className="rounded-full object-cover mb-4"
                        />
                    }
                </div>
                <form method="post" onSubmit={handleUpdateUser}>
                    <Input 
                        name="file" 
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleFileChange}
                    ></Input>
                    <Button type="submit">Upload</Button>
                </form>
                <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Role: </strong> {user?.role}</p>
               <p><strong>Date of Joining:</strong> {user?.createdAt && new Date(user.createdAt).toLocaleDateString()}</p>
               {user?.role === Role.LECTURER && courses && (
                <>
                    <h2 className="text-xl font-semibold mt-6">My Courses</h2>
                    <ul className="list-disc pl-6">
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <li key={course.id}>
                                    {course.name} ({course.code})
                                </li>
                            ))
                        ) : (
                            <li>No courses found</li>
                        )}
                    </ul>
                </>
            )}
            </div>
        </div>
        <Footer />
        </>
    );
}


  