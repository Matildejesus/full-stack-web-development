import { Lecturer, LecturerCourse, Semester } from "@/types/types"
import { Button, Select } from "@chakra-ui/react";

interface LecturerListProps {
    lecturers: LecturerCourse[];
    allLecturers: Lecturer[];
    chosenLecturer: string;
    setChosenLecturer: (value: string) => void;
    addLecturerToCourse: (value: string, lecturerSemester?: Semester) => void;
    lecturerSemester?: Semester;
    setLecturerSemester: (value: Semester) => void;
    courseSemester: Semester;
}

export default function LecturerList({ lecturers, allLecturers, chosenLecturer, setChosenLecturer, addLecturerToCourse, lecturerSemester, setLecturerSemester, courseSemester }: LecturerListProps) {
    return (
        <div>
            <h2>Lecturers</h2>
            {lecturers.map((u) => (
                <div className="bg-white p-6 rounded-lg shadow">
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
            <Button
                type="button" className="z-50 px-6 py-4"
                onClick={() => addLecturerToCourse(chosenLecturer, courseSemester === Semester.BOTH ? lecturerSemester : undefined )}
            >
                Add Lecturer
            </Button>
        </div>
    )
}