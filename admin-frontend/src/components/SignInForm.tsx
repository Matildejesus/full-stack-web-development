import { Button, FormControl, FormLabel, Input, Text, VStack } from "@chakra-ui/react";

interface SignInFormProps {
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    username: string;
    setUsername: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    error: string;
}

export default function SignInForm({
    handleSubmit,
    username,
    setUsername,
    password,
    setPassword,
    error, 
}: SignInFormProps) {
    return (
        <main className="flex-grow pt-20 ">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
                <VStack gap={4}>
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                            name="username"
                            type="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                </VStack>
            </form>
        </main>
    )

}

