import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ApplicationForm from "./ApplicationForm";
import { useAuth } from "../context/AuthContext";
import '@testing-library/jest-dom';

// Mock the useAuth context
jest.mock("../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));
window.alert = jest.fn();

describe("ApplicationForm", () => {
  let mockSaveJobApplication: jest.Mock;
  let mockGetJobApplications: jest.Mock;

  beforeEach(() => {
    mockSaveJobApplication = jest.fn(()=>true);
    mockGetJobApplications = jest.fn().mockReturnValue([]);

    (useAuth as jest.Mock).mockReturnValue({
      user: { email: "testuser@example.com" },
      getJobApplications: mockGetJobApplications,
      saveJobApplication: mockSaveJobApplication,
    });
  });

  

// test1
  test("displays error messages when required fields are not filled", async () => {
    render(<ApplicationForm />);

    fireEvent.click(screen.getByRole("button", { name: /Submit/ }));

    await waitFor(() => {
      expect(screen.getByText("Select the course interested to Teach."));
      expect(screen.getByText("Select Availability (part-time or full-time)"));
      expect(screen.getByText("List your Skills"));
      expect(screen.getByText("List your Academic Credentials"));
    });
  });

// Test 2
  test("displays previously submitted applications", () => {
    const mockApplications = [
      {
        course: "Introduction to Programming",
        previousRole: "Web Developer",
        availability: "FullTime",
        skills: ["JavaScript", "React"],
        academic: "BSc IT",
        selectedCount: 1,
      },
    ];

    mockGetJobApplications.mockReturnValue(mockApplications);

    render(<ApplicationForm />);

    expect(screen.getByText("Introduction to Programming"));
    expect(screen.getByText("FullTime"));
  });
// test3
test("submits the form with valid data", async () => {
    render(<ApplicationForm />);
  
    fireEvent.change(screen.getByLabelText(/select the course/i), {
      target: { value: "Introduction to Programming" },
    });
  
    fireEvent.change(screen.getByLabelText(/previous roles/i), {
      target: { value: "Software Engineer" },
    });
  
    fireEvent.change(screen.getByLabelText(/select availability/i), {
      target: { value: "FullTime" },
    });
  
    fireEvent.change(screen.getByLabelText(/list your skills/i), {
      target: { value: "JavaScript, React" },
    });
  
    fireEvent.change(screen.getByLabelText(/academic credentials/i), {
      target: { value: "BSc Computer Science" },
    });
  
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
  
    await waitFor(() => {
      expect(mockSaveJobApplication).toHaveBeenCalledTimes(1);
  
      expect(mockSaveJobApplication).toHaveBeenCalledWith({
        course: "Introduction to Programming",
        
        previousRole: "Software Engineer",
        availability:  "FullTime" ,
        skills: ["JavaScript", "React"],
        academic: "BSc Computer Science",
        selectedCount: 0,
      });
    });
  });
//   test4
    test("renders the form with all required fields", () => {
    render(<ApplicationForm />);
  
    // Check if the form fields are rendered
    expect(screen.getByPlaceholderText("Enter your Previous Role details.")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your skills with comma(,) separation.")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your academic qualification.")).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /Select the course interested to Teach/i })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /Select Availability/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });
  
//   test 5
test("alerts user after successful form submission", async () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    
    render(<ApplicationForm />);
  
    fireEvent.change(screen.getByLabelText(/select the course/i), {
      target: { value: "Introduction to Programming" },
    });
  
    fireEvent.change(screen.getByLabelText(/previous roles/i), {
      target: { value: "Software Engineer" },
    });
  
    fireEvent.change(screen.getByLabelText(/select availability/i), {
      target: { value: "FullTime" },
    });
  
    fireEvent.change(screen.getByLabelText(/list your skills/i), {
      target: { value: "JavaScript, React" },
    });
  
    fireEvent.change(screen.getByLabelText(/academic credentials/i), {
      target: { value: "BSc Computer Science" },
    });
  
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
  
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("Application submitted successfully!");
    });
  
    alertSpy.mockRestore();
  });
  
  
  

});
