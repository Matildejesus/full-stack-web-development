import ButtonComp from "@/components/ButtonComp";
import CandidateList from "@/components/CandidateList";
import { candidateService } from "@/services/api";
import { Candidate } from "@/types/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * Container Component:
 * Handles business logic related to:
 *    - Fetching candidates data 
 *    - Managing the access state of candidates
 * 
 * Passes props to CandidateList, ButtonComp (presenter)
 */

export default function Candidates() {
    const router = useRouter();
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [blocked, setBlocked] = useState<boolean>();
    const [available, setAvailable] = useState<boolean>();

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {
            const data = await candidateService.getAllCandidates();
            setCandidates(data);
        } catch (error) {
            console.error("Error fetching candidates: ", error);
        }
    }

    const handleBlocked = async (id: number) => {
        const data = await candidateService.getCandidate(id.toString());
        const newBlocked = !data.blocked;
        setBlocked(newBlocked);
        const newData = await candidateService.updateCandidateBlocked(id.toString(), { blocked: newBlocked });
        await fetchCandidates();
    }

    const handleAvailable = async (id: number) => {
        const data = await candidateService.getCandidate(id.toString());
        const newAvailable = !data.available;
        setAvailable(newAvailable);
        await candidateService.updateCandidateAvailable(id.toString(), { available: newAvailable });
        await fetchCandidates();
    } 

    return (
        <div className={"min-h-screen p-8 bg-gray-50 text-black"}>
            <ButtonComp
                handleRouter={() => router.back()}
                text="Back" 
            />
            <CandidateList 
                candidates={candidates} 
                handleBlocked={handleBlocked}  
                handleAvailable={handleAvailable}
                />
            <ButtonComp
                handleRouter={() => router.push('/candidates/candidatesData')}
                text="Candidates Data"
            />
        </div>
    );
}
