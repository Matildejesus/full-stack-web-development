import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import SignUpForm from "../components/SignUpForm";
import { userService } from "../services/api";
import { Role } from "@/types/types";
import { validateEmail, validatePassword } from "@/utils/validation";

export default function SignUp() {
    const toast = useToast();
    const [error, setError] = useState("");
    const router = useRouter();

    const [submitted, setSubmitted] = useState<boolean>(false);
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: Role.CANDIDATE,
        password: ""
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(newUser.email)) {
            setError("Email does not follow standards.");
            return;
        }
        if (!validatePassword(newUser.password)) {
            setError("Password should have uppercase, lowercase, numbers and more than 8 chars in length.");
            return;
        }
        if (newUser.password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await userService.createUser(newUser);
            setSubmitted(true);
            setNewUser({
                firstName: "",
                lastName: "",
                email: "",
                role: Role.CANDIDATE,
                password: ""
            });
            setConfirmPassword("");
            toast({
                title: "User created.",
                description: "Account registered successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

        } catch (err: any) {
            if (err.response?.status === 409) {
                setError("This email is already registered."); // display under email field
            } else {
                setError("Failed to create user. Please try again.");
            }
            console.error("Error creating user:", err.response.data || err.message);
            console.error("Error creating user:", err);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <Header />
            <SignUpForm
                onSubmit={handleCreateUser}
                newUser={newUser}
                setNewUser={setNewUser}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                error={error}
                submitted={submitted}
            />
            <Footer />
        </div>
    )
}