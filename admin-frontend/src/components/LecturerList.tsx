import { Lecturer, LecturerCourse, Semester } from "@/types/types"
import { Button, Select, Text } from "@chakra-ui/react";

/**
 * Presenter Component:
 * Handles UI rendering related to:
 *   - displaying list of lecturers teaching a specific course
 *   - displaying a drop down with lecturers not teaching course
 * 
 * Receives props from course/[id].tsx (container)
 */

interface LecturerListProps {
    lecturers: LecturerCourse[];
    allLecturers: Lecturer[];
    chosenLecturer: string;
    setChosenLecturer: (value: string) => void;
    addLecturerToCourse: (value: string, lecturerSemester?: Semester) => void;
    lecturerSemester?: Semester;
    setLecturerSemester: (value: Semester) => void;
    courseSemester: Semester;
    lecturerError: string | "";
}

export default function LecturerList({ lecturers, allLecturers, chosenLecturer, setChosenLecturer, addLecturerToCourse, lecturerSemester, setLecturerSemester, courseSemester, lecturerError }: LecturerListProps) {
    return (
        <div>
            <h2>Lecturers</h2>
            {lecturers.map((u) => (
                <div key={`${u.lecturerId}-${u.courseId}`} className="bg-white p-6 rounded-lg shadow">
                    <h3>{u.lecturer.user.firstName} {u.lecturer.user.lastName}</h3>
                    <h3>{u.lecturer.user.email}</h3>
                </div>
            ))}
            <h2>Add Lecturer to Course: </h2>
            <Select
                name="lecturers"
                value={chosenLecturer}
                onChange={(e) => setChosenLecturer( e.target.value as string) }
                placeholder="Available lecturers">
                    {allLecturers.map((u) => (
                        <option value={u.id}>{u.user.firstName} {u.user.lastName}</option>
                    )
                    )}
            </Select>
            {courseSemester === Semester.BOTH && (
                <Select
                    name="semester"
                    value={lecturerSemester}
                    onChange={(e) => setLecturerSemester( e.target.value as Semester) }
                    placeholder="Select semester">
                        <option value="one">semester one</option>
                        <option value="two">semester two</option>
                        <option value="both">both semester</option>
                </Select>
            )} 
            {lecturerError && 
                <Text color="red.500">{lecturerError}</Text>
            }
            <Button
                type="button" className="z-50 px-6 py-4"
                onClick={() => addLecturerToCourse(chosenLecturer, lecturerSemester )}
            >
                Add Lecturer
            </Button>
        </div>
    )
}