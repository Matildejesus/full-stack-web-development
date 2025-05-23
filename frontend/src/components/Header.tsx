import React, { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { userService } from "@/services/api";
import { Role, User } from "@/types/types";


const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState<User | null>(null);
    
    const handleSignOut = async (e: React.MouseEvent) => {
        try{
            await userService.logout();
            setUser(null); // optional: reset user in UI
            router.push("/");   
        } catch(err:any){
            console.error("Error creating user:", err); 
        }
    }

    useEffect(() => {
        if (id) {
        fetchUser();
        }
    }, [id]);

    const fetchUser = async () => {
        try {
            const data = await userService.getUser(Number(id));
            setUser(data);
        } catch (error) {
            console.error("Error fetching pet:", error);
        }
    };

    return (
        <header className="bg-red-800 text-white p-8 w-full">
        <div className="flex justify-between items-center">
            <h1 className="font-serif">RMIT TeachingTeam</h1>

            {user?.firstName? (
                <span>Welcome, {user.firstName}!</span>
                ):null }
        
            <button
            className="flex flex-col space-y-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            >
            <span className={`block w-8 h-1 bg-white transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-8 h-1 bg-white transition-all ${isOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-8 h-1 bg-white transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </button>
        </div>

        {isOpen && (
            <nav className="mt-2 bg- p-4 rounded">
            {/* <ul className="flex space-x-6"> */}
            <ul className="flex flex-col space-y-2">
                <li><Link href="/">Home</Link></li>
                {user?.role === Role.CANDIDATE && router.pathname != "/CandidateHomePage" && <li><Link href="/TutorApplicant">Application</Link></li>}
                {user?.role === Role.CANDIDATE && router.pathname == "/CandidateHomePage" && <li><Link href="/Profile">Profile</Link></li>}

                {user?.role === Role.LECTURER && router.pathname !="/LecturerHome" && <li><Link href="/LecturerHome">Lecturer Page</Link></li>}
                {user?.role === Role.LECTURER && router.pathname !="/ApplicantStatus" && <li><Link href="/ApplicantStatus">Application Status</Link></li>}
                {user && router.pathname === "/tutorProfile" && <li><Link href="/CandidateHomePage">Application</Link></li>}
                {!user && (
                <>
                    <li><Link href="/signIn">Sign In</Link></li>
                    <li><Link href="/signUp">Sign Up</Link></li>
                </>
                )}
                {user && <li><Link href="/" onClick={handleSignOut}>Sign Out</Link></li>}
            </ul>
            </nav>
        )}
        </header>
    );
};

export default Header;
