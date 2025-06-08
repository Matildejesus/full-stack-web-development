import { useEffect, useRef, useState } from "react";
import wsClient from "../utils/wsClient";

type CandidateUnavailableData = {
  candidateUnavailable: {
    id: string;
    firstName: string;
    lastName: string;
  };
};

export function useUnavailableCandidates() {
    const [unavailableCandidates, setUnavailableCandidates] = useState<string[]>([]);
    const audioContextRef = useRef<AudioContext | null>(null);

    const initAudio = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext ||
            (window as any).webkitAudioContext)();
        }
    };

    const playNotificationSound = () => {
        if (!audioContextRef.current) {
            initAudio();
        }

        const audioContext = audioContextRef.current!;
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime); // Increased volume

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
    };

    useEffect(() => {
        let isAvailable = true;
        

        const unsubscribe = wsClient.subscribe<CandidateUnavailableData>(
        {
            query: `
            subscription CandidateUnavailable {
                candidateUnavailable {
                    id
                    blocked
                    available
                    user {
                        id
                        firstName
                        lastName
                        email
                        avatarUrl
                    }
                }
            }
        `,
        },
        {
            next: ({ data }) => {
                if (!isAvailable || !data?.candidateUnavailable) return;

                // if (!isAvailable) return;
                // if(!data) return;

                const candidate = data.candidateUnavailable;
                console.log("Candidate unavailable:", candidate);

                setUnavailableCandidates((prev) => [...prev, candidate.id]);
                playNotificationSound();
                },
                error: (err) => console.error("Subscription error:", err),
                complete: () => console.log("Subscription completed"),
            }
        );


        return () => {
        isAvailable = false;
        unsubscribe();
        };
  }, []);
  console.log("unavailableCandidates",unavailableCandidates)
  
  return {unavailableCandidates};
}