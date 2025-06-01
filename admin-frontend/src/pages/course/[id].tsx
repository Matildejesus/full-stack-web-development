import { useState, useEffect } from "react";
import { Geist } from "next/font/google";
import { useRouter } from "next/router";
import { Course } from "../../types/types";
import { courseService } from "../../services/api";

export default function PetDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [course, setCourse] = useState<Course | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        if (id) {
            fetchCourse();
        }
    }, [id]);

  const fetchCourse = async () => {
    try {
      const data = await courseService.getCourse(id as string);
      setCourse(data);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };


  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={"min-h-screen p-8 bg-gray-50 text-black"}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-4 text-blue-500 hover:text-blue-600"
            >
              ← Back
            </button>
            <h1 className="text-3xl font-bold text-black">Pet Details</h1>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete Pet
          </button>
        </div>

        {/* <DeleteConfirmationModal
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={handleDelete}
          isDeleting={isDeleting}
          itemName={pet.name}
        />

        <PetInfoCard pet={pet} />

        <ProfileAssociationForm
          onSubmit={handleAssociateProfile}
          profileId={newProfileId}
          onProfileIdChange={setNewProfileId}
          isSubmitting={isSubmitting}
          error={error}
        />

        <AssociatedProfilesList profiles={profiles} /> */}
      </div>
    </div>
  );
}
