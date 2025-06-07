import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ApplicationForm from "@/components/ApplicationForm";
import DisplayApplications from "@/components/DisplayApplications";
import { useEffect } from "react";
import { useApplicationsData } from "@/hooks/useApplicationsData";
import { useApplicationForm } from "@/hooks/useApplicationForm";
import { NewAppPayload } from "@/hooks/useApplicationForm";

export type ApplicationFormData = Omit<NewAppPayload, "candidateId">;
export default function ApplicationPage() {
  const {
    loading,
    error,
    courses,
    applications,
    candidates,
    meAsCandidate,
    refreshApps,
  } = useApplicationsData();

  if (loading) return <p className="p-8">Loading …</p>;
  if (!meAsCandidate) return <p className="p-8">Candidate profile not found.</p>;

  const {
    form,
    update,
    save,
    status,
    errors,
    serverError,
    successMsg,
    setSuccessMsg,
    setForm
  } = useApplicationForm(refreshApps);

    useEffect(() => {
        if (meAsCandidate && form.candidateId === 0) {
        setForm((prev) => ({ ...prev, candidateId: meAsCandidate.id }));
        }
    }, [meAsCandidate, form.candidateId, setForm]);

    if (loading) return <p className="p-8">Loading …</p>;
    if (!meAsCandidate) return <p className="p-8">Candidate profile not found.</p>;



  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6 space-y-10">
        <ApplicationForm
          onSubmit={save}
          newApplication={form}
          setNewApplication={update}
          subjects={courses}
          errors={errors}
          success={successMsg}
          error={serverError ?? error}
          status={status}
          clearSuccess={() => setSuccessMsg(null)}
        />

        <DisplayApplications
          userId={meAsCandidate.user.id}
          applications={applications}
          candidates={candidates}
        />
      </main>

      <Footer />
    </div>
  );
}
