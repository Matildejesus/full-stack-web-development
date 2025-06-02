import { Button } from "@chakra-ui/react";

interface CandidateButtonProps {
    handleRouter: () => void;
    text: string;

}

export default function ButtonComp({ handleRouter, text }: CandidateButtonProps) {
    return (
        <Button
            type="button" className="z-50 px-6 py-4"
            onClick={handleRouter}
        >
            {text}
        </Button>
    )
}