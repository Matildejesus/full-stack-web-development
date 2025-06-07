import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useApplicantStats } from "../hooks/useApplicantStats";

export default function ApplicantStatus() {
  const {
    mostChosen,
    mostChosenCount,
    leastChosen,
    leastChosenCount,
    notChosen,
    byCandidate 
  } = useApplicantStats();


  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-6 p-6">

        {/* Most Chosen */}
        <section>
          <p className="p-4 mx-8 text-2xl font-serif font-semibold text-blue-800">
            Most Chosen Applicants (Total Count: {mostChosenCount})
          </p>
          {mostChosen.length > 0 && (
            <div className="mt-6 flex flex-col md:flex-row gap-6">
              <div className="flex-1 p-6 rounded-md shadow-lg bg-red-100 border-2 border-red-500">
                <ul className="list-disc list-inside ml-4">
                  {mostChosen.map((applicant, index) => (
                    applicant ? (
                    <li key={index}>
                      {applicant.firstName ?? "Unknown"} - ({applicant.email ?? "No email"})
                    </li>
                  ) : (
                    <li key={index}>Invalid user</li>
                    )
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>

        {/* Least Chosen */}
        <section>
          <p className="p-4 mx-8 text-2xl font-serif font-semibold text-blue-800">
            Least Chosen Applicants (Total Count: {leastChosenCount})
          </p>
          {leastChosen.length > 0 && (
            <div className="mt-6 flex flex-col md:flex-row gap-6">
              <div className="flex-1 p-6 rounded-md shadow-lg bg-red-100 border-2 border-red-500">
                <ul className="list-disc list-inside ml-4">
                  {leastChosen.map((applicant, index) => (
                    <li key={index}>
                      {applicant.firstName} - ({applicant.email})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>

        {/* Not Selected */}
        <section>
          <p className="p-4 mx-8 text-2xl font-serif font-semibold text-blue-800">
            Applicants Not Selected
          </p>
          {notChosen.length > 0 && (
            <div className="mt-6 flex flex-col md:flex-row gap-6">
              <div className="flex-1 p-6 rounded-md shadow-lg bg-red-100 border-2 border-red-500">
                <ul className="list-disc list-inside ml-4">
                  {notChosen.map((applicant, index) => (
                        applicant ? (
                        <li key={index}>
                            {applicant.firstName} - ({applicant.email})
                        </li>
                        ) : (
                            
                        <li key={index}>In valid user</li>
                        
                        )
                    ))}
                </ul>
              </div>
            </div>
          )}
        </section>

      </main>
      <Footer />
    </div>
  );
}
