export interface Subject {
    id: string;
    code: string;
    name: string;
};

export const DEFAULT_SUBJECTS: Subject[] = [
    {id: "1", code: "COSC1010", name: "Introduction to Programming"},
    {id: "2", code: "COSC1020", name: "Data Structures and Algorithms"},
    {id: "3", code: "COSC1030", name: "Computer Networks"},
    {id: "4", code: "COSC1040", name: "Introduction to Database Systems"},
    {id: "5", code: "COSC1050", name: "Introduction to Software Engineering"}
]