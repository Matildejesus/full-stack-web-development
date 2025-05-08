import React from "react";
import Footer from "../components/Footer";
import SubjectList from "../components/SubjectList";
import Header from "../components/Header";
import { useRouter } from "next/router";

export default function TutorApplicant() {

  const router = useRouter();
  return (
    <>
      <Header />
      <div className="p-8">
        <p className="text-2xl bg-white-800 p-7 font-serif bg-red-100 border-2 border-red-500">
          Opportunities</p>
        <section className="p-5 rounded-md shadow-sm -space-y-px mx-8">
          <p className="text-l font-serif">
            The School of Computer Science has opportunities for casual tutors and lab assistants for the courses available in the current semester.
          </p>
        </section>

        <p className="text-2xl bg-white-800 p-7 font-serif bg-red-100 border-2 border-red-500">
          Available subjects in Semester 1 2025
        </p>

        <SubjectList />
        <button type="button"  onClick={() => router.push("/applicationPage")}
          // font-semibold rounded-md shadow-sm
          className=
          "font-semibold  w-full rounded-md shadow-sm "
      >
          Apply
      </button>
        </div>

        <Footer />
    </>
  );
};