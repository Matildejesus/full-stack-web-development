import React, { createContext, useContext, useEffect, useState } from "react";
// import { User, DEFAULT_USERS } from "../types/user";
import { Candidate, User } from "@/services/api";
import { LecturerSelection } from "../types/lecturerSelection";
import { JobSummary } from "../types/JobSummary";
import { userApi } from "@/services/api";

interface AuthContextType {
  candidate:Candidate|null;
  user: User | null;
  // users: User[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  saveJobApplication: (application:JobSummary)=>boolean;
  updateJobApplications: (selectedCandidates: LecturerSelection) => boolean;
  getJobApplications: (userId: string) => JobSummary[];
  saveSelection: (selection:LecturerSelection[]) => boolean;
  getSelection: (userId: string, course: string) => LecturerSelection[];
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const userData = await userApi.getUserByEmailPassword(email, password);
  
    if (userData) {
      setUser(userData as User); // Save full user object
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const saveJobApplication = (application: JobSummary): boolean => {
    if (!user) return false;
    const isDuplicate = user.jobSummary.some(
      (existingApplication) => existingApplication.course === application.course
  );

  if (isDuplicate) {
      alert("You have already applied for this course.");
      return false;
  }
  
    const updatedUsers = user.map((u) =>
      u.email === user.email
        ? { ...u, jobSummary: [...(u.jobSummary || []), application] }
        : u
    );
  
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  
    const updatedUser = updatedUsers.find((u) => u.email === user.email);
    if (updatedUser) {
      setUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
    return true;
  };
  
  const updateJobApplications = (selectedCandidate: LecturerSelection): boolean => {

    const updatedUser = user.map((u) =>
      u.id === selectedCandidate.userId 
        ?  { ...u, jobSummary: u.jobSummary.map(summary =>
          summary.course === selectedCandidate.course
            ? { ...summary, selectedCount: summary.selectedCount + 1 }
            : summary
          )
      } : u
       
    );
  
    setUsers(updatedUser);
    localStorage.setItem("users", JSON.stringify(updatedUser));
  
    return true;
  }

  
  // const getJobApplications = (userId: string): JobSummary[] => {
  //   const foundUser = user.find((u) => u.email === userId);
  //   return foundUser?.jobSummary || [];
  // };

  const saveSelection = (selection: LecturerSelection[]): boolean => {
    if (!user) return false;
  
    const updatedUsers = users.map((u) =>
      u.email === user.email
        ? { ...u, lecturerSelection: [...(u.lecturerSelection || []), ...selection] }
        : u
    );
  
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  
    const updatedUser = updatedUsers.find((u) => u.email === user.email);
    if (updatedUser) {
      setUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
    return true;
  }

  const getSelection = (userId: string, course: string): LecturerSelection[] => {
    const foundUser = users.find((u) => u.email === userId);
    return foundUser?.lecturerSelection.filter(selection => selection.course === course) || [];
  }
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      // users, 
      login, 
      logout, 
      // saveJobApplication,
      // getJobApplications, 
      // updateJobApplications,
      // saveSelection,
      // getSelection
     }}>
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
