import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useApplicantStats } from "../hooks/useApplicantStats";
import { AppRole } from "@/types/types";
export default function ApplicantStatus() {
  const {
    mostChosen,
    mostChosenCount,
    leastChosen,
    leastChosenCount,
    notChosen,
  } = useApplicantStats();

  // These should be here, outside any return block
  const tutors = mostChosen
    .map(({ user, applications }) => ({
      user,
      applications: applications.filter((a) =>
        a.role.toLowerCase().includes(AppRole.TUTOR)
      ),
    }))
    .filter((entry) => entry.applications.length > 0);

  const labAssistants = mostChosen
    .map(({ user, applications }) => ({
      user,
      applications: applications.filter((a) =>
        a.role.toLowerCase().includes(AppRole.LAB_ASSISTANT)
      ),
    }))
    .filter((entry) => entry.applications.length > 0);
    

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-6 p-6">

        {/* Most Chosen */}
        <section>
          <p className="p-4 mx-8 text-2xl font-serif font-semibold text-blue-800">
            Most Chosen Applicants (Total Count: {mostChosenCount})
          </p>
          <div className="mt-6 flex flex-col md:flex-row gap-6">
            {/* Tutor Side */}
            <div className="flex-1 p-6 rounded-md shadow-lg bg-red-100 border-2 border-red-500">
              <h3 className="font-bold text-lg mb-2">Tutor</h3>
              <ul className="list-disc list-inside ml-4">
                {tutors.map(({ user, applications }) => (
                  <li key={user.id}>
                    {user.firstName} ({user.email})
                    <ul>
                      {applications.map((app, i) => (
                        <li key={i}>
                          {app.course.name}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lab Assistant Side */}
            <div className="flex-1 p-6 rounded-md shadow-lg bg-red-100 border-2 border-red-500">
              <h3 className="font-bold text-lg mb-2">Lab Assistant</h3>
              <ul className="list-disc list-inside ml-4">
                {labAssistants.map(({ user, applications }) => (
                  <li key={user.id}>
                    {user.firstName} ({user.email})
                    <ul>
                      {applications.map((app, i) => (
                        <li key={i}>
                          {app.course.name} 
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
                  {leastChosen.map(({ user, applications }) => (
                    <li key={user.id}>
                      {user.firstName} ({user.email})
                      <ul>
                        {applications.map((app, i) => (
                          <li key={i}>
                            {app.course.name} – {app.role}
                          </li>
                        ))}
                      </ul>
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
                  {notChosen.map(({ user, applications }) => (
                    <li key={user.id}>
                      {user.firstName} ({user.email})
                      <ul>
                        {applications.map((app, i) => (
                          <li key={i}>
                            {app.course.name} – {app.role}
                          </li>
                        ))}
                      </ul>
                    </li>
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
