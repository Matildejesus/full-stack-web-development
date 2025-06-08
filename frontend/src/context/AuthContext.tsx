import React, { createContext, useContext, useEffect, useState } from "react";
import { userService, courseService, lecturerCourseService, applicationService, candidateService,lecturerService } from "@/services/api";
import { Application, Candidate, Course, LecturerCourse, LecturerSelection, User ,Role, Lecturer} from "@/types/types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  updateUserProfile: (user: User) => Promise<User | null>;
  saveSelection: (selection: LecturerSelection[]) => boolean;

  // Lecturer-specific data
  lecturerId: number | null;
  lecturerCourseIds: number[];
  lecturerCourses: LecturerCourse[];
  assignedApplications: Application[];
  candidatesLec: Candidate[];
  courses: Course[];
  loadingLecturerData: boolean;
  cUsers:User[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [candiate, setCandidate] = useState<Candidate | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const[lecturers,setLecturer]=useState<Lecturer>();
  const [cUsers, setCUsers] = useState<User[]>([]);
  // Lecturer-specific stat
  const [lecturerId, setLecturerId] = useState<number | null>(null);
  const [lecturerCourses, setLecturerCourses] = useState<LecturerCourse[]>([]);
  const [lecturerCourseIds, setLecturerCourseIds] = useState<number[]>([]);
  const [assignedApplications, setAssignedApplications] = useState<Application[]>([]);
  const [candidatesLec, setCandidates] = useState<Candidate[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingLecturerData, setLoadingLecturerData] = useState<boolean>(false);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  //fecthing lecture data
  useEffect(() => {
    if (!user || user.role !== Role.LECTURER) return;

    const fetchLecturerData = async () => {
      if (!user ) 
        {
          console.log("No USERS IN")
          return;
        }
      setLoadingLecturerData(true);
      const lecId = (await lecturerService.getLecturer(user.id)).id
      
      
      setLecturerId(lecId);
      console.log("Mycourses")
      try {
        const [lecCourses, allApps, allCands, allCourses, allLecs,cUsers] = await Promise.all([
          lecturerCourseService.getAllLecturerCourses(),
          applicationService.getAllApplications(),
          candidateService.getAllCandidates(),
          courseService.getAllCourses(),
          lecturerService.getAllLecturers(),
          userService.getAllUsers()
        ]);
        console.log("Mycourses, ",lecId)
        const myCourses = lecCourses.filter(lc => lc.lecturerId === lecId);
        
        const courseIds = myCourses.map(lc => lc.courseId);
        const myApps = allApps.filter(app => courseIds.includes(app.course.id));
        const myCandidates=myApps.map(app => app.candidate);
        
        setLecturerCourses(myCourses);
        setLecturerCourseIds(courseIds);
        setAssignedApplications(myApps);
        setCandidates(myCandidates);
        setCourses(allCourses);
        setCUsers(cUsers);
      } catch (error) {
        console.error("Failed to load lecturer data:", error);
      } finally {
        setLoadingLecturerData(false);
      }
    };

    fetchLecturerData();
  }, [user]);

  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      const userData = await userService.login(email, password);
      if (userData) {
        setUser(userData);
        localStorage.setItem("currentUser", JSON.stringify(userData));
        return userData;
      }
      return null;
    } catch (err) {
      console.log("Login failed:", err);
      return null;
    }
  };
  const logout = async () => {
    try {
      await userService.logout();
      setUser(null);
      localStorage.removeItem("currentUser");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  const updateUserProfile = async (user: User): Promise<User | null> => {
    try {
      if (user.avatarUrl != null) {
        const updatedUser = await userService.updateUser(user.id, { avatarUrl: user.avatarUrl });
        setUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        return updatedUser;
      }
      return null;
    } catch (err) {
      console.log("Could not update user avatar.");
      return null;
    }
  };

  const saveSelection = (selection: LecturerSelection[]): boolean => {
    if (!candiate) return false;

    const updatedUsers = users.map((u) =>
      u.email === candiate.user.email
        ? { ...u, lecturerSelection: [...(u.lecturer?.lecturerSelections || []), ...selection] }
        : u
    );

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    if (!user) return false;
    const updatedUser = updatedUsers.find((u) => u.email === user.email);
    if (updatedUser) {
      setUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }

    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUserProfile,
        saveSelection,

        // lecturer-specific values
        lecturerId,
        lecturerCourseIds,
        lecturerCourses,
        assignedApplications,
        candidatesLec,
        courses,
        loadingLecturerData,
        cUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}