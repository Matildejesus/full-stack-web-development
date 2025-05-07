import React, { useState, FormEvent } from "react";
import {
  Button,
  FormLabel,
  Input,
  FormControl,
  useToast,
  VStack,
  Text
} from "@chakra-ui/react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface SignUpData {
  firstname: string;
  email: string;
  password: string;
}

export default function SignUp(){
  const toast = useToast();
  const [error, setError] = useState("");
  const [signUpData, setSignUpdata] = useState<SignUpData>({
    firstname: "",
    email: "",
    password: ""
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSignUpdata((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(signUpData));
    if (!signUpData.firstname || !signUpData.email || !signUpData.password) {
      setError("Information missing");
      return;
    }
    setSubmitted(true);
    toast({
      title: "Account created.",
      description: "You have successfully registered.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

  return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <Header />
    <main className="flex-grow pt-20">
        {submitted? (
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
        ):(
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                name="firstname"
                type="text"
                value={signUpData.firstname}
                onChange={(e) =>
                  setSignUpdata({ ...signUpData, firstname: e.target.value })
                }
                placeholder="Enter your first name"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={signUpData.email}
                onChange={(e) =>
                  setSignUpdata({ ...signUpData, email: e.target.value })
                }
                placeholder="Enter your email"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                value={signUpData.password}
                onChange={(e) =>
                    setSignUpdata({ ...signUpData, password: e.target.value })
                  }
                  placeholder="Enter your password"
                />
              </FormControl>
              <Text color="red.500">{error}</Text>
              <Button
                type="submit"
              >
                Sign Up
              </Button>
            </VStack>
          </form>
        )}
      
    </main>
    <Footer />
  </div>
  )
}