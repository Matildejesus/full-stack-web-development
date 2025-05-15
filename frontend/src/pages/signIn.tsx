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
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { validateEmail, validatePassword } from "../utils/validation";
import { userApi } from "@/services/api";

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

  const [submitted, setSubmitted] = useState<boolean>(false);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const captchaToken = recaptchaRef.current?.getValue();
    if (!captchaToken) {
        setError("Please complete the CAPTCHA.");
        return;
    }
    if (!validateEmail(email)) {
      setError("Email does not follow standards.");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password should have uppercase, lowercase, numbers and more than 8 chars in length.");
      return;
    }
    // NEW code databse
    try {
      const userData = await userApi.getUserByEmailPassword(email, password);
      if (userData) {
         login(email, password); // 

        toast({
          title: "Sign In Successful.",
          description: "You have successfully signed in.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        localStorage.setItem("currentUser", JSON.stringify(userData));

        if (userData.role === "Candidate") {
          router.push("/CandidateHomePage");
        } else {
          router.push("/lecturerHome")
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
    <main className="flex-grow pt-20 ">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
            </FormControl>
          <Text color="red.500">{error}</Text>
          <Button
            type="submit"
          >
            Sign In
          </Button>

          <ReCAPTCHA sitekey={"6LfnzAIrAAAAALqDEjHRvxep33ytIfxDF66vvV5G"}
              ref={recaptchaRef}
          />
        </VStack>
      </form>
    </main>
    <Footer />
  </div>
  )
}