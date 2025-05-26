interface ApplicationFormData {
  course: string;
  role: string;
  availability: string;
  skills: string;
  academic: string;
  previousRole: string;
//   userId?: number;
}
interface ApplicationFormProps{
    onSubmit:(e: React.FormEvent) => Promise<void>;
    newApplication:ApplicationFormData;
    setNewApplication:React.Dispatch<React.SetStateAction< ApplicationFormData>>;
    errors: { [key: string]: string };
    success:string | null;
    error:string | null;
    subjects: { id: number; code: string; name: string}[];

}

export default function ApplicationForm({
    onSubmit,
    newApplication,
    setNewApplication,
    errors,
    success,
    error,
    subjects

}:ApplicationFormProps){
    return (
        <div>
            <div className=" shadow-sm -space-y-px mb-12 mx-1 bg-red-100 border-2 border-red-500">
                <p className="p-8 text-2xl font-serif text-center mb-8">Application Form for Tutor/ Lab-Assistants Roles</p>
                {success && <p className="text-green-600 text-center font-semibold">{success}</p>}
                {error && (
                    <div className="text-red-600 font-semibold text-center mb-4">
                        {error}
                    </div>
                    )}
                <form onSubmit={onSubmit} className="mt-3 space-y-6">


                    {/* A list of pre-populated courses should be made available for the tutor to select. */}

                    <div className="rounded-md shadow-sm -space-y-px mx-8 mx-8">
                        <label htmlFor="course" className="p-7 text-l font-serif text-center">
                            Select the course interested to Teach.
                        </label>
                        {/* drop down to select course */}
                        <select id="course" name="course"
                            value={newApplication.course}
                            onChange={(e) =>
                                setNewApplication({ ...newApplication, course: e.target.value })

                            }
                            className="border p-2 rounded"
                            tabIndex={1}
                        >
                            <option value="">-- Select a course --</option>
                           {subjects.map((u) => (
                                <option key={u.id} value={u.name}>
                                    {u.name}
                                </option>
                            ))}
                        </select>
                        
                        {errors.course && <p className="text-red-500">{errors.course}</p>}
                    </div>

                    <div className="rounded-md shadow-sm -space-y-px mx-8">
                        <label htmlFor="role" className="p-7 text-l font-serif text-center">
                            Select the Job Role interested to apply
                        </label>
                        {/* drop down to select jobRole */}
                        <select id="role" name="role"
                            value={newApplication.role}
                            onChange={(e) =>
                                setNewApplication({...newApplication,role:e.target.value})
                            }
                            tabIndex={2}
                            className="border p-2 rounded"
                        >
                            <option value="">-- Select a job Role --</option>
                            <option value="tutor">tutor</option>
                            <option value="lab_assistant">lab_assistant</option>
                        </select>
                        {errors.role && <p className="text-red-500">{errors.role}</p>}

                        </div>
                    <div className="rounded-md shadow-sm -space-y-px mx-8">
                        <label htmlFor="availability" className="p-7 text-l font-serif text-center">
                            Select Availability (part-time or full-time)
                        </label>
                        {/* drop down to select availabilty */}
                        <select id="availability" name="availability"
                            value={newApplication.availability}
                            onChange={(e) =>
                                setNewApplication({...newApplication,availability:e.target.value})
                            }
                            tabIndex={3}
                            className="border p-2 rounded"
                        >
                            <option value="">-- Select a availabilty --</option>
                            <option value="full-time">full-time</option>
                            <option value="part-time">part-time</option>
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
                            className="border p-5 rounded w-[70%] h-40"
                            placeholder="Enter your skills with comma(,) separation."
                            value={newApplication.skills}
                            onChange={(e) =>
                                setNewApplication({...newApplication,skills:e.target.value})
                            }
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
                            value={newApplication.academic}
                            onChange={(e) =>
                                setNewApplication({...newApplication,academic:e.target.value})
                            }
                            tabIndex={5}
                        />
                        {errors.academic && <p className="text-red-500">{errors.academic}</p>}
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
                            value={newApplication.previousRole}
                            onChange={(e)=>
                                setNewApplication({...newApplication,previousRole:e.target.value})
                            }
                            tabIndex={6}
                        />
                        {errors.previousRole && <p className="text-red-500">{errors.previousRole}</p>}
                    </div>

                    <div >
                        <button type="submit"
                            // font-semibold rounded-md shadow-sm
                            className=
                            "font-semibold  w-full rounded-md shadow-sm "
                        >
                            Apply
                        </button>
                    </div>
                </form>
            </div>



            {/* Displaying submitted form data */}
            {/* <div className="shadow-sm p-8 bg-gray-100 border-2 border-gray-400">
                <p className="text-2xl font-serif text-center ">Submitted Applications</p>
                {applications.filter(app => app.candidate.id === user?.id).length === 0 ? (
                    <p className="text-center text-gray-500">No applications submitted yet.</p>
                ) : (
                    applications.
                    filter((applicatn=>applicatn.candidate.id===user?.id))
                    .map((application,index) => (
                        <div key={index} className="p-4 border rounded">
                          <h3 className="font-semibold text-xl">JobRole: {application.role}</h3>
                          <p className="text-gray-800">Skills: {application.skills}</p>
                          <p className="text-gray-800">Availability: {application.availability}</p>
                          <p className="text-gray-800 mt-2">Highest Academic Qualification:{application.academic}</p>
                          <p className="text-gray-800">Course Name: {application.course.name}</p>
                          <p className="text-gray-800">Previous Role: {application.previousRole}</p>
                          
                        </div>
                      ))
                )}
            </div> */}
        </div>

    );

}