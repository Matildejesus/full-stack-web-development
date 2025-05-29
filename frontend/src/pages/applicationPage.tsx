import { useAuth } from "@/context/AuthContext";

import { applicationApi, candidateApi } from "@/services/api";
import { useState, useEffect } from "react";
import { Application, Availability, Candidate, Role } from "@/types/types";
import { courseService } from "@/services/api";
import { Course } from "@/types/types";
import ApplicationForm from "@/components/ApplicationForm";
import DisplayApplications from "./DisplayApplications";

export default function ApplicationPage() {
    const { user } = useAuth();
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [subjects, setSubjects] = useState<Course[]>([]);
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [newApplication, setNewApplication] = useState({
        course: "",
        role: "",
        skills: "",
        previousRole: "",
        academic: "",
        availability: "",
        candidateId: 0
    });
    const [errors, setErrors] = useState({
        course: "",
        previousRole: "",
        availability: "",
        skills: "",
        academic: "",
        role: "",
    });
    useEffect(() => {
        const fetchCandidates = async () => {
            const data = await candidateApi.getAllCandidates();
            setCandidates(data);
        };
        fetchCandidates();

    }, []);
    useEffect(() => {
        const fetchCourses = async () => {
            const data = await courseService.getAllCourses();
            setSubjects(data);
        };
        fetchCourses();

    }, []);

    const matchedCandidate = candidates.find(candidate => candidate.user.id === user?.id);
    const candidateId = matchedCandidate?.id;
    console.log("CCCCCCCCCID ", candidateId)

    useEffect(() => {
        if (candidateId) {
            setNewApplication((prev) => ({
                ...prev, candidateId: candidateId
            }));
        }
    }, [candidateId]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const data = await applicationApi.getAllApplications();
            setApplications(data);
            setError(null);
        } catch (err) {
            setError("Failed to fetch applications");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveApplication = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("handleSaveApplication triggered");

        if (!newApplication.previousRole || !newApplication.availability || !newApplication.course
            || !newApplication.skills || !newApplication.academic || !newApplication.role) {
            setErrors({
                course: newApplication.course ? "" : "Select the course interested to Teach.",
                previousRole: newApplication.previousRole ? "" : "Previous role is required.",
                availability: newApplication.availability ? "" : "Select Availability (part-time or full-time)",
                skills: newApplication.skills ? "" : "Skills are required.",
                academic: newApplication.academic ? "" : "Academic credentials are required.",
                role: newApplication.role ? "" : "Select the Job Role.",
                // userId:user?.id
            });
            return;
        }
        if (!user?.email) {
            setError("You must be logged in to apply.");
            return;
        }
        console.log("User email is", user.email);

        try {
            const allApplications = await applicationApi.getAllApplications();
            // duplicate check
            const duplicate = allApplications.find(
                (app: Application) =>
                    app.candidate.id === newApplication.candidateId &&
                    app.course.name === newApplication.course &&
                    app.role === newApplication.role
            );
            console.log("duplicate is", duplicate)
            if (duplicate) {
                console.log("Application submitted UNSuccessfully!!! Duplicate application")
                setError("You have already applied for this course and role.");
                setSuccess(null);
                return;
            }
            await applicationApi.saveApplication(newApplication);
            setNewApplication((prev) => ({
                ...prev,
                course: "",
                role: "",
                skills: "",
                previousRole: "",
                academic: "",
                availability: ""
            }));
            console.log("Application submitted Successfully!!!")
            setError(null);
            setSuccess("Application submitted Successfuly")
            console.log("user details is ", user)
            fetchApplications();
        } catch (err) {
            setError("Failed to save application");
        }
    };
    if (!candidateId) {
        // console.error("candidateId is undefined — cannot proceed.");
        return <div>Loading candidate profile...</div>;
    }

    return (
        (<div>
            <ApplicationForm
                onSubmit={handleSaveApplication}
                newApplication={{
                    course: newApplication.course,
                    role: newApplication.role,
                    availability: newApplication.availability,
                    skills: newApplication.skills,
                    academic: newApplication.academic,
                    previousRole: newApplication.previousRole,
                }}
                setNewApplication={(updatedForm) =>
                    setNewApplication((prev) => ({ ...prev, ...updatedForm }))
                }
                subjects={subjects}
                errors={errors}
                success={success}
                error={error}
            />
            <DisplayApplications userId={user?.id}
                applications={applications}
                candidates={candidates}
            />
        </div>
        )
    );

}