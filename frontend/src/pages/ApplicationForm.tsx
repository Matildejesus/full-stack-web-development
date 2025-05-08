import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ApplicationDisplay from "../components/ApplicationDisplay";
import { DEFAULT_SUBJECTS, Subject } from "../types/subject";
import { JobSummary } from "../types/JobSummary";

interface Availabilty {
    AvailabiltyType: string
}
interface Course {
    CourseName: string
}
const ApplicationForm: React.FC = () => {

    const { user, getJobApplications, saveJobApplication } = useAuth(); 
    
    const [applicationData, setApplicationData] = useState<JobSummary>();
 
    const [applications, setApplications] = useState<JobSummary[]>([]); 

    const [selectedAvailability, setSelectedAvailability] = useState<Availabilty>({
        AvailabiltyType: "FullTime",
    });
    const [selectedCourse, setSelectedCourse] = useState<Subject>(DEFAULT_SUBJECTS[0]);

    type FormData = {
        previousRole: string;
        skills: string; 
        academic: string;
      };

      
    const [formData, setFormData] = useState<FormData>({
        previousRole: "",
        skills: "",
        academic: "",
    });

    const [errors, setErrors] = useState({
        course: "",
        previousRole: "",
        availability: "",
        skills: "",
        academic: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

      

// Submits the application form data
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Reset errors
        setErrors({
            course: "",
            previousRole: "",
            availability: "",
            skills: "",
            academic: "",
        });

        console.log("Form Data before validation:", formData);
        console.log("Selected Availability:", selectedAvailability);
        console.log("@@@Selected Course:", selectedCourse);

        // You can add form validation here before submitting
        if ( !formData.previousRole || !selectedCourse.name ||
            selectedAvailability.AvailabiltyType.trim()==="" || !formData.skills || !formData.academic) {
            setErrors({
                course: selectedCourse.name ? "" : "Select the course interested to Teach.",
                previousRole: formData.previousRole ? "" : "Previous role is required.",
                availability: selectedAvailability.AvailabiltyType ? "" : "Select Availability (part-time or full-time)",
                skills: formData.skills ? "" : "Skills are required.",
                academic: formData.academic ? "" : "Academic credentials are required.",
            });
            return;
        }
        if (!user) {
            alert("User is not logged in.");
            return; 
        }
        // const existingApplication = applications.find(
        //     (application) => application.email === user.email && application.course === selectedCourse.name
        // );

        // if (existingApplication) {
        //     alert("You have already applied for this course.");
        //     setErrors((prevErrors) => ({
        //         ...prevErrors,
        //         submission: "You have already applied for this course.",
        //     }));
        //     return;
        // }


        const skillsSplitted=formData.skills
        .split(",")
        .map(skill=>skill.trim())
        .filter(skill=>skill);

        const applicationData: JobSummary = {
            course: selectedCourse.name,
            previousRole: formData.previousRole,
            availability: selectedAvailability.AvailabiltyType,
            skills: skillsSplitted,
            academic: formData.academic,
            selectedCount: 0,
            // email:user?.email || " ",
            
            
        };
        console.log("@@@@@Full applicationData:", applicationData);
       
        const success = saveJobApplication(applicationData);
        if (success && user) {

            const updated = [...applications,applicationData];
            setApplications(updated);
            alert("Application submitted successfully!");

        }

        console.log("Application submitted successfully!");
    };

    useEffect(() => {
        // localStorage.clear();
        const savedData = localStorage.getItem("tutorApplications");
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                const fixedData = parsedData.map((entry: any) => ({
                    ...entry,
                    skills: Array.isArray(entry.skills)
                      ? entry.skills
                      : String(entry.skills)
                          .split("\n")
                          .map((s) => s.trim())
                          .filter(Boolean),
                  }));
            
                  setApplications(fixedData);
                
                // setApplications(Array.isArray(parsedData) ? parsedData : []);

            } catch (error) {
                console.error("Error parsing applications:", error);
                setApplications([]); // Fallback in case of error
            }
        }
        if (user) {
            const allUserApplications = getJobApplications(user.email);
    const fixedApplications = allUserApplications.map((app) => ({
        ...app,
        skills: Array.isArray(app.skills)
            ? app.skills
            : String(app.skills)
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean),
    }));
    setApplications(fixedApplications);
            }
          }, []);

    return (
        <div>
            <div className=" shadow-sm -space-y-px mb-12 mx-1 bg-red-100 border-2 border-red-500">
                <p className="p-8 text-2xl font-serif text-center mb-8">Application Form for Tutor/ Lab-Assistants Roles</p>
                <form onSubmit={handleSubmit} className="mt-3 space-y-6">


                    {/* A list of pre-populated courses should be made available for the tutor to select. */}

                    <div className="rounded-md shadow-sm -space-y-px mx-8 mx-8">
                        <label htmlFor="course" className="p-7 text-l font-serif text-center">
                            Select the course interested to Teach.
                        </label>
                        {/* drop down to select course */}
                        <select id="course" name="course"
                            value={selectedCourse.name}
                            onChange={(e) =>
                                setSelectedCourse({ ...selectedCourse, name: e.target.value })

                            }
                            className="border p-2 rounded"
                            tabIndex={1}
                        >
                            <option value="">-- Select a course --</option>
                           {DEFAULT_SUBJECTS.map((u) => (
                                <option key={u.id} value={u.name}>
                                    {u.name}
                                </option>
                            ))}
                        </select>
                        
                        {errors.course && <p className="text-red-500">{errors.course}</p>}
                    </div>

                    <div className="rounded-md shadow-sm -space-y-px mx-8">
                        <label htmlFor="previousRole" className="p-7 text-l font-serif text-center">
                            List your Previous Roles
                        </label>
                        <textarea
                            id="previousRole"
                            name="previousRole"
                            // required
                            className="border p-5 rounded w-[70%] h-30"
                            placeholder="Enter your Previous Role details."
                            value={formData.previousRole}
                            onChange={handleChange}
                            tabIndex={2}
                        />
                        {errors.previousRole && <p className="text-red-500">{errors.previousRole}</p>}
                    </div>

                    <div className="rounded-md shadow-sm -space-y-px mx-8">
                        <label htmlFor="availability" className="p-7 text-l font-serif text-center">
                            Select Availability (part-time or full-time)
                        </label>
                        {/* drop down to select availabilty */}
                        <select id="availability" name="availability"
                            value={selectedAvailability.AvailabiltyType}
                            onChange={(e) =>{
                                const value=e.target.value;
                                setSelectedAvailability({  AvailabiltyType: value })
                                console.log("Changed to:", value); 

                            }
                                
                            }
                            tabIndex={3}
                            className="border p-2 rounded"
                        >
                            <option value="">-- Select a availabilty --</option>
                            <option value="FullTime">FullTime</option>
                            <option value="PartTime">PartTime</option>
                        </select>
                        {errors.availability && <p className="text-red-500">{errors.availability}</p>}
                    </div>

                    <div className="rounded-md shadow-sm -space-y-px mx-8">
                        <label htmlFor="skills" className="p-7 text-l font-serif text-center">
                            List your Skills
                        </label>
                        <textarea
                            id="skills"
                            name="skills"
                            // required
                            className="border p-2 rounded w-[70%]"
                            placeholder="Enter your skills with comma(,) separation."
                            value={formData.skills}
                            onChange={handleChange}
                            rows={10}
                            tabIndex={4}
                        />
                        {errors.skills && <p className="text-red-500">{errors.skills}</p>}
                    </div>

                    <div className="rounded-md shadow-sm -space-y-px mx-8">
                        <label htmlFor="academic" className="p-7 text-l font-serif text-center">
                            List your Academic Credentials
                        </label>
                        <textarea
                            id="academic"
                            name="academic"
                            // required
                            className="border p-5 rounded w-[70%] h-40 "
                            placeholder="Enter your academic qualification."
                            value={formData.academic}
                            onChange={handleChange}
                            tabIndex={5}
                        />
                        {errors.academic && <p className="text-red-500">{errors.academic}</p>}
                    </div>

                    <div >
                        <button type="submit"
                            // font-semibold rounded-md shadow-sm
                            className=
                            "font-semibold  w-full rounded-md shadow-sm "
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            {/* Displaying submitted form data */}
            <div className="shadow-sm p-8 bg-gray-100 border-2 border-gray-400">
                <p className="text-2xl font-serif text-center ">Submitted Applications</p>
                {applications.length === 0 ? (
                    <p className="text-center text-gray-500">No applications submitted yet.</p>
                ) : (
                    // <ApplicationDisplay allUsers={applications} />
                    <ApplicationDisplay user={user} />
                )}
            </div>
        </div>

    );
}


export default ApplicationForm;
