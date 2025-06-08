import { useState } from "react";
import { AppRole ,Semester} from "@/types/types";
import { applicationService } from "@/services/api";

export interface NewAppPayload {
  course: string;
  role: AppRole;
  skills: string;
  previousRole: string;
  academic: string;
  availability: string;
  candidateId: number;
  semester:Semester
}
export type ApplicationFormData = Omit<NewAppPayload, "candidateId">;
export function useApplicationForm(onSuccess: () => void) {
  const [form, setForm] = useState<NewAppPayload>({
    course: "",
    role: AppRole.TUTOR,
    skills: "",
    previousRole: "",
    academic: "",
    availability: "",
    candidateId: 0,
    semester:Semester.ONE
  });

  const update = (patch: Partial<ApplicationFormData>) => {
    setForm(prev => ({ ...prev, ...patch }));
  };

  const [errors, setErrors] = useState<Record<keyof NewAppPayload, string>>(
    {} as any
  );
  const [status, setStatus] = useState<"idle" | "saving">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const validate = (): boolean => {
    const required: (keyof NewAppPayload)[] = [
      "course",
      "role",
      "skills",
      "previousRole",
      "academic",
      "availability",
    ];
    const errs: any = {};
    required.forEach(k => {
      if (!form[k]) errs[k] = "Required";
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const save = async () => {
    if (!validate()) return;
    setStatus("saving");
    try {
      await applicationService.saveApplication(form);
      setSuccessMsg("Application submitted!");
      setServerError(null);
      onSuccess();
      setForm(prev => ({
        ...prev,
        course: "",
        role: AppRole.TUTOR,
        skills: "",
        previousRole: "",
        academic: "",
        availability: "",
      }));
    } catch {
      setServerError("Failed to save application");
    } finally {
      setStatus("idle");
    }
  };

  return {
    form,
    update,
    save,
    status,
    errors,
    serverError,
    successMsg,
    setSuccessMsg,
    setForm,
  };
}