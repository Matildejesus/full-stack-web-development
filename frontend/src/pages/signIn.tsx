import React, { useRef, useState, FormEvent } from "react";
import {
    Button,
    FormLabel,
    Input,
    FormControl,
    useToast,
    VStack,
    Text
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { userService } from "@/services/api";
import { Role } from "@/types/types";
import { useAuth } from "../context/AuthContext"
import SignInForm from "@/components/SignInForm";

/**
 * Container Component:
 * Handles business logic related to:
 *    - Login authentication service 
 *    - Managing form states
 *    - ReCAPTCHA validation 
 *    - Rerouting to home pages 
 * 
 * Passes props to SignInForm (presenter)
 */


export default function SignIn(){
    const toast = useToast();
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        const captchaToken = recaptchaRef.current?.getValue();
        if (!captchaToken) {
            setError("Please complete the CAPTCHA.");
            return;
        }

        try {
            const userData = await login(email, password); 
        if (userData) { 
            toast({
            title: "Sign In Successful.",
            description: "You have successfully signed in.",
            status: "success",
            duration: 3000,
            isClosable: true,
            });
        
            if (userData.role === Role.CANDIDATE) {
                router.push("/candidateHomePage");
            } else {
                router.push("/lecturerHomePage")
            }
            
        } else {
            setError("Invalid username or password");
        }
    }catch (err) {
        console.error("Login error:", err);
        setError("Login failed. Please try again.");
        }
        recaptchaRef.current?.reset();
    }

    return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <Header />
        <SignInForm 
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={error}
            recaptchaRef={recaptchaRef}/>
            
        <Footer />
    </div>
    )
}