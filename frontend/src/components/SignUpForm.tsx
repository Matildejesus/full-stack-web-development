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
import { Role } from "@/types/types";
import Link from "next/link";

interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  password: string;
}

interface SignUpFormProps {
    onSubmit: (e: React.FormEvent) => Promise<void>;
    newUser: NewUser;
    setNewUser: (value: NewUser) => void;
    error: string;
    submitted: boolean;
}

export default function SignUpForm({
    onSubmit,
    newUser,
    setNewUser,
    error,
    submitted
}: SignUpFormProps) {
    return (
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
            <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
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
                    </FormControl>


                    <FormControl isRequired>
                    <FormLabel>Role</FormLabel>
                    <Select
                        name="role"
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value as Role}) }
                        placeholder="Select role">
                        <option value="candidate">candidate</option>
                        <option value="lecturer">lecturer</option>
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

    )

}

