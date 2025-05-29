import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/types";

interface MainContentProps {
    user: User | null;
}

const MainContent: React.FC<MainContentProps> = ({ user }) => {
    return (
        <main className="p-8 pb-16" >

            {/* Section 1: Overview */}
            <section className="p-4 mx-8 mb-1 ">
                <p className="p=4 mx-8 text-2xl font-serif font-semibold text-blue-800">
                    Welcome to TeachTeam: Simplifying the Tutor Hiring Process
                </p>
                <div className="mt-6 flex flex-col md:flex-row gap-6">
                {/* Tutor Applicants --later add signup thing to make it long */}
                    <div className="flex-1 p-6 rounded-md shadow-lg bg-red-100 border-2 border-red-500">
                        <p className="mt-4 font-serif text-gray-700 ">
                            TeachTeam (TT) is a web platform designed to streamline the process of hiring casual tutors for courses
                            offered at the School of Computer Science. With our user-friendly interface, tutor applicants can easily submit
                            their applications, and lecturers can review and select the most suitable candidates.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 2: How It Works */}
            <section className="p-4  mx-8 mb-12">
                <p className="text-xl font-serif font-semibold text-blue-800">How It Works</p>
                <div className="mt-6 flex flex-col md:flex-row gap-6">
                {/* Tutor Applicants --later add signup thing to make it long */}
                    <div className="flex-1 bg-gray-100 p-6 rounded-md shadow-lg">
                        <p className="text-xl font-serif font-semibold text-blue-800">For Tutor Applicants</p>
                        <p className="mt-4 font-serif text-gray-700">
                            As an applicant, you can submit your credentials, teaching experience, and areas of expertise through
                            our simple application form. Once submitted, lecturers can review your profile and contact you if they are
                            interested in your skills.
                        </p>
                    </div>

                    {/* Lecturers */}
                    <div className="flex-1 bg-gray-100 p-6 rounded-md shadow-lg">
                        <p className="text-xl font-serif font-semibold text-blue-800">For Lecturers</p>
                        <p className="mt-4 font-serif  text-gray-700">
                            Lecturers can browse through tutor profiles, review their qualifications and experience, and leave comments
                            to help make the selection process easier. You can also choose the best candidates based on your course's
                            needs.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 3: Key Features for Applicants */}
            <section className=" p-8 mb-6">
                <h3 className="text-2xl font-serif font-semibold text-blue-800">Features for Tutor Applicants</h3>
                <ul className="mt-4 list-disc list-inside font-serif">
                    <li>Submit your application with detailed academic credentials and teaching experience.</li>
                    <li>Highlight your areas of expertise and preferred subjects to teach.</li>
                    <li>Stay updated on your application status and get feedback from lecturers.</li>
                </ul>
            </section>

            {/* Section 4: Key Features for Lecturers */}
            <section className="p-8 ">
                <h3 className="text-2xl font-serif font-semibold text-blue-800">Features for Lecturers</h3>
                <ul className="font-serif mt-4 list-disc list-inside">
                    <li>Review tutor applicants’ profiles and qualifications.</li>
                    <li>Leave comments on applicants' profiles to aid in the selection process.</li>
                    <li>Select tutors based on your course's needs and teaching requirements.</li>
                </ul>
            </section>

            {/* Section 5: Call to Action */}
            {!user && 
                <section className="text-center mt-12">
                <h4 className="text-xl font-semibold font-serif text-blue-800">
                    Ready to join TeachTeam?
                </h4>
                <p className="mt-4 text-gray-700 font-serif">
                    Whether you're a tutor looking to apply or a lecturer ready to find the perfect candidate, start now by{" "} 
                    <Link href="/signUp">
                    <span className="text-blue-600 underline hover:text-blue-800">Signing up!</span>
                    </Link>
                </p>
                <div className="mt-6">
                    <h4 className="text-xl font-semibold font-serif text-blue-800">
                    If you already have an account?{" "}
                    <Link href="/signIn">
                    <span className="underline text-blue-600 hover:text-blue-800">Sign In Now</span>
                    </Link> 
                    </h4>
                </div>
            </section>
            }
        </main>
    );
};

export default MainContent;
