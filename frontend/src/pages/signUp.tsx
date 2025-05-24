import React, { useState, FormEvent } from "react";
import {
  Button,
  FormLabel,
  Input,
  FormControl,
  useToast,
  VStack,
  Text,
  Select
} from "@chakra-ui/react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import SignUpForm from "../components/SignUpForm";
import { userService } from "../services/api";
import { Role } from "@/types/types";
import { validateEmail, validatePassword } from "@/utils/validation";

export default function SignUp(){
    const toast = useToast();
    const [error, setError] = useState("");
    const router = useRouter();

    const [submitted, setSubmitted] = useState<boolean>(false);
    
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setNewUser((prevState) => ({
        ...prevState,
        [name]: value,
        }));
    }
    // create or save new user signup data---NEW
    const [newUser,setNewUser] = useState({
    firstName: "",
    lastName:"",
    email: "",
    role: Role.CANDIDATE,
    password: ""
    });

    const handleCreateUser = async(e:React.FormEvent)=>{
    e.preventDefault();

    if (!validateEmail(newUser.email)) {
        setError("Email does not follow standards.");
        return;
    }
    if (!validatePassword(newUser.password)) {
        setError("Password should have uppercase, lowercase, numbers and more than 8 chars in length.");
        return;
    }
            
    try{
        await userService.createUser(newUser);

        setSubmitted(true);
        setNewUser({
        firstName: "",
        lastName:"",
        email: "",
        role:Role.CANDIDATE,
        password: ""
        });
        toast({
        title: "User created.",
        description: "Account registered successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
        });
        
    }catch(err:any){
        if (err.response?.status === 409) {
        setError("This email is already registered."); // display under email field
        } else {
        setError("Failed to create user. Please try again.");
        }
        console.error("Error creating user:", err); 
    }
    }

    return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <Header />
        <main className="flex-grow pt-20">
            {
            submitted? 
            (
            <>
                <p>Thanks for registering!</p>
                <Button>
                <Link
                        href="/signIn"
                    >
                        Login
                </Link>
                </Button>
            </>
            ):
            (
            <SignUpForm
            onSubmit={handleCreateUser}
            newUser={newUser}
            setNewUser={setNewUser}
            error={error}
            />
            )}
        
        </main>
        <Footer />
    </div>
    )
}