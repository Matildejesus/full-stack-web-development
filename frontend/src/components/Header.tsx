import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Role } from "@/types/types";
import { useAuth } from "@/context/AuthContext";

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const router = useRouter();
    const { id } = router.query;
    const { user, logout } = useAuth();
    
    const handleSignOut = (e: React.MouseEvent) => {
        logout();
        router.push("/");
    }

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
                {user && router.pathname != "/" && <li><Link href="/">Home</Link></li>}
                {user && router.pathname != "/profile" && <li><Link href="/profile">Profile</Link></li>}
                {user?.role === Role.CANDIDATE && router.pathname != "/candidateHomePage" && <li><Link href="/applicationPage">Application</Link></li>}
                {user?.role === Role.CANDIDATE && router.pathname == "/candidateHomePage" && <li><Link href="/Profile">Profile</Link></li>}

                {user?.role === Role.LECTURER && router.pathname !="/lecturerHomePage" && <li><Link href="/lecturerHomePage">Lecturer Page</Link></li>}
                {user?.role === Role.LECTURER && router.pathname !="./ApplicantStatus" && <li><Link href="./ApplicantStatus">Application Status</Link></li>}

                {user?.role === Role.LECTURER && router.pathname !== "/course-stats" && (
                    <li>
                        <Link href="/course-stats">
                            CourseStats
                        </Link>
                    </li>
                    )}
                    {user?.role === Role.LECTURER && router.pathname !== "/course-stats" && (
                    <li>
                        <Link href="/candidate-stats">
                            CandidateStats
                        </Link>
                    </li>
                    )}
                    {user?.role === Role.CANDIDATE && router.pathname !== "/candidateHomePage" && (
                    <li>
                        <Link href="/candidateHomePage">
                            CandidateHomePage
                        </Link>
                    </li>
                    )}
                {user && router.pathname === "/tutorProfile" && <li><Link href="/candidateHomePage">Application</Link></li>}
                {!user && (
                <>
                    {router.pathname != "/signIn" && <li><Link href="/signIn">Sign In</Link></li>}
                    {router.pathname != "/signUp" && <li><Link href="/signUp">Sign Up</Link></li>}
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
