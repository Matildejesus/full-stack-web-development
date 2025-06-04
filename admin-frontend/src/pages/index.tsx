import { useState, FormEvent } from "react";
import { userService } from "../services/api";
import SignInForm from "@/components/SignInForm";
import { useRouter } from "next/router";

/**
 * Container Component:
 * Handles business logic related to:
 *    - Login authentication service 
 *    - Managing form states
 *    - Rerouting to course page
 * 
 * Passes props to SignInForm (presenter)
 */

export default function Home() {
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
     

    try {
        const userData = await userService.login(username, password); 
        if (userData) {
            router.push("/courses");
        }
     
    }catch (err) {
        console.error("Login error:", err);
        setError("Login failed. Please try again.");
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <SignInForm 
                handleSubmit={handleSubmit}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                error={error}
            />    
        </div>
    );
}
