import { Course, Role, User } from "@/types/types"
import { Button, Input } from "@chakra-ui/react";

interface ProfileContentProps {
    user: User;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    courses: Course[] | undefined;
}


const ProfileContent: React.FC<ProfileContentProps> = ({ user, onSubmit, onChange, courses }) => {
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
            {user?.role === Role.LECTURER && courses && (
            <>
                <h2 className="text-xl font-semibold mt-6">My Courses</h2>
                <ul className="list-disc pl-6">
                    {courses.length > 0 ? (
                        courses.map((course) => (
                            <li key={course.id}>
                                {course.name} ({course.code})
                            </li>
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