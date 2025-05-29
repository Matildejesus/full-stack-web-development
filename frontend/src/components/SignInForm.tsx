import { Button, FormControl, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import ReCAPTCHA from "react-google-recaptcha";

/**
 * Presenter Component:
 * Handles UI rendering related to:
 *   - Displaying Sign-in form
 *   - Displaying error messages
 *   - Displaying Recaptcha
 * 
 * Receives props from SignIn (container)
 */

interface SignInFormProps {
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    error: string;
    recaptchaRef: React.RefObject<ReCAPTCHA | null>;
}

export default function SignInForm({
    handleSubmit,
    email,
    setEmail,
    password,
    setPassword,
    error, 
    recaptchaRef
}: SignInFormProps) {
    return (
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
    )

}

