import React, { createContext, useContext, useEffect, useState } from "react";
import { User, DEFAULT_USERS } from "../types/user";

import { LecturerSelection } from "@/types/lecturerSelection";
import { JobSummary } from "@/types/JobSummary";


interface AuthContextType {
  user: User | null;
  users: User[];
  login: (username: string, password: string) => User | null;
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
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (!storedUsers) {
      localStorage.setItem("users", JSON.stringify(DEFAULT_USERS));
      setUsers(DEFAULT_USERS);
    } else {
      setUsers(JSON.parse(storedUsers));
    }

    // Check for existing login
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string):  User | null => {
    console.log('Attempting to log in with:', email, password);
    console.log(users);
    const foundUser = users.find(
      

      (u) => u.email === email && u.password === password

    );
    if (foundUser) {
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const latestUser = storedUsers.find((u: User) => u.email === foundUser.email);

    if (latestUser) {
      setUser(latestUser);
      localStorage.setItem("currentUser", JSON.stringify(latestUser));
      return latestUser;
    }
    
      console.log('User found:', foundUser); // Log the found user details
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return foundUser;
    } else {
      console.log('No user found with the provided credentials.');
      return null;
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
  
    const updatedUsers = users.map((u) =>
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

    const updatedUser = users.map((u) =>
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

  
  const getJobApplications = (userId: string): JobSummary[] => {
    const foundUser = users.find((u) => u.email === userId);
    return foundUser?.jobSummary || [];
  };

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
      users, 
      login, 
      logout, 
      saveJobApplication,
      getJobApplications, 
      updateJobApplications,
      saveSelection,
      getSelection
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
