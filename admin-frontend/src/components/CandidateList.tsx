import { Candidate } from "@/types/types"
import ButtonComp from "./ButtonComp";

/**
 * Presenter Component:
 * Handles UI rendering related to:
 *   - displaying candidates
 *   - toggle button to change access state
 * 
 * Receives props from candidates/index.tsx (container)
 */

interface CandidateListProps {
    candidates: Candidate[];
    handleBlocked: (id: number) => void;
    handleAvailable: (id: number) => void;
}

export default function CandidateList({ candidates, handleBlocked, handleAvailable }: CandidateListProps) {
    return (
        <div>
            {candidates.map((u) => (
                <div key={u.id} className="bg-white p-6 rounded-lg shadow flex flex-row justify-between">
                    <div className={"flex flex-col"}>
                        <h3>{u.user.firstName} {u.user.lastName}</h3>
                        <h3>{u.user.email}</h3>
                    </div>
                    <div className={"flex justify-end flex-row"}>
                        <ButtonComp 
                            handleRouter={() => {handleBlocked(u.id)}} 
                            text={u.blocked ? "blocked" : "active"}
                        />
                        <ButtonComp 
                            handleRouter={() => {handleAvailable(u.id)}} 
                            text={u.available ? "available" : "unavailable"}
                        />
                    </div>
                    
                </div>
            ))}
            
        </div>
    )
}