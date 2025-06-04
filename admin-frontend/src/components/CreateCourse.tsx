import { Semester } from "@/types/types";
import { Button, FormControl, FormLabel, Input, Select, Text, VStack } from "@chakra-ui/react"

/**
 * Presenter Component:
 * Handles UI rendering related to:
 *   - displaying form to add or update course
 * 
 * Receives props from courses/index.tsx and course/[id].tsx (container)
 */

interface CreateCourseProps {
    handleCreateCourse: (e: React.FormEvent) => void;
    isAdding?: boolean;
    currentEvent: string;
    name: string;
    setName: (value: string) => void;
    code: string;
    setCode: (value: string) => void;
    semester: Semester;
    setSemester: (value: Semester) => void;
    createCourseClick?: () => void;
    createError: string;
}

export default function CreateCourse({
    handleCreateCourse, 
    isAdding,
    name,
    setName,
    code,
    setCode,
    semester,
    setSemester,
    createCourseClick,
    createError,
    currentEvent
}: CreateCourseProps) {
    return (
        <div className="p-3 border rounded hover:bg-gray-50 cursor-pointer text-black w-[70%]">
            {!isAdding && currentEvent === "create" &&
                <Button
                    type="button"className="z-50 px-6 py-4"
                    onClick={createCourseClick}
                >
                    Add New Course
                </Button>
            }
            {isAdding && (
                <form onSubmit={handleCreateCourse} >
                    <VStack gap={4}>
                        <FormControl isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input
                                name="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Code</FormLabel>
                            <Input
                                name="code"
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Enter your password"
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Semester</FormLabel>
                            <Select
                                name="semester"
                                value={semester}
                                onChange={(e) => setSemester( e.target.value as Semester) }
                                placeholder="Select semester">
                                    <option value="one">semester one</option>
                                    <option value="two">semester two</option>
                                    <option value="both">both semester</option>
                            </Select>
                        </FormControl>
                        <Text color="red.500">{createError}</Text>
                        {currentEvent === "create" ? (
                            <Button
                                type="submit"
                            >
                                Add Course
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                            >
                                Update
                            </Button>
                        )}
                    </VStack>
                </form>
            )}
        </div>
    )
}