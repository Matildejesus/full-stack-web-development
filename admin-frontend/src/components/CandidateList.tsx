import { Candidate } from "@/types/types"
import { Button, Select } from "@chakra-ui/react";
import ButtonComp from "./ButtonComp";

interface CandidateListProps {
    candidates: Candidate[];
    handleBlocked: (id: number) => Promise<void>;
    blockedText: string;
}

export default function CandidateList({ candidates, handleBlocked, blockedText }: CandidateListProps) {
    return (
        <div>
            {candidates.map((u) => (
                <div key={u.id} className="bg-white p-6 rounded-lg shadow flex flex-row justify-between">
                    <div className={"flex flex-col"}>
                        <h3>{u.user.firstName} {u.user.lastName}</h3>
                        <h3>{u.user.email}</h3>
                    </div>
                    <div className={"flex justify-end"}>
                        <ButtonComp 
                            handleRouter={() => {handleBlocked(u.id)}} 
                            text={u.blocked ? "blocked" : "active"}
                        />
                    </div>
                    
                </div>
            ))}
            
        </div>
    )
}