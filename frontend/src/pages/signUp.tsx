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
import { userApi } from "@/services/api";
import { useRouter } from "next/router";

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
const[newUser,setNewUser]=useState({
  firstName: "",
  lastName:"",
  email: "",
  role:"",
  password: ""
});

const handleCreateUser= async(e:React.FormEvent)=>{
  e.preventDefault();
  try{
    await userApi.createUser(newUser);

    setSubmitted(true);
    setNewUser({
      firstName: "",
      lastName:"",
      email: "",
      role:"",
      password: ""
    });
    toast({
      title: "User created.",
      description: "Account registered successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    const createdUser = await userApi.getUserByEmailPassword(newUser.email, newUser.password);
    
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
        <form onSubmit={handleCreateUser} className="bg-white p-8 rounded-lg shadow-md w-96">
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
              id="firstName"
                name="firstName"
                type="text"
                value={newUser.firstName}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
                placeholder="Enter your first name"
              />
              <FormLabel>Last Name</FormLabel>
              <Input
              id="lastName"
                name="lastName"
                type="text"
                value={newUser.lastName}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
                placeholder="Enter your last name"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                placeholder="Enter your email"
              />
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </FormControl>


            <FormControl isRequired>
              <FormLabel>Role</FormLabel>
              <Select
                name="role"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value }) }
                placeholder="Select role">
                 <option value="Candidate">Candidate</option>
                 <option value="Lecturer">Lecturer</option>
                </Select>
              
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                value={newUser.password}
                onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
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