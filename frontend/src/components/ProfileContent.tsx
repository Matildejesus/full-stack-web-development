import { LecturerCoursesResponse } from "@/services/api";
import { LecturerCourse, Role, User } from "@/types/types"
import { Button, Input } from "@chakra-ui/react";

interface ProfileContentProps {
    user: User;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    lecturerCourses: LecturerCoursesResponse[] | undefined;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ user, onSubmit, onChange, lecturerCourses }) => {
    return(
        <div className="p-8">
            <div className="rounded-full w-24 h-24 bg-gray-300 mb-4">
                {user?.avatarUrl && 
                    <img
                        src={user.avatarUrl}
                        alt="avatar"
                        className="rounded-full object-cover mb-4"
                    />
                }
            </div>
            <form method="post" onSubmit={onSubmit}>
                <Input 
                    name="file" 
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={onChange}
                ></Input>
                <Button type="submit">Upload</Button>
            </form>
            <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role: </strong> {user?.role}</p>
            <p><strong>Date of Joining:</strong> {user?.createdAt && new Date(user.createdAt).toLocaleDateString()}</p>
            {user?.role === Role.LECTURER && lecturerCourses && (
            <>
                <p><strong>My Courses</strong></p>
                <ul className="list-disc pl-6">
                    {lecturerCourses.length > 0 ? (
                        lecturerCourses.map(({ course, semester }) => (
                            <div key={course.id}>
                                <p><strong>Course Name: </strong>{course.name}</p>
                                <p> <strong>Course Code: </strong>{course.code}</p>
                                <p><strong>Teaching Semester:</strong> {semester}</p>
                            </div>
                        ))
                    ) : (
                        <li>No courses found</li>
                    )}
                </ul>
            </>
        )}
        </div>
    )
}

export default ProfileContent;