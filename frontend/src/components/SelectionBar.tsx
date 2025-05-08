import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface SelectionBarProps {
    selectedSort: string ;
    setSelectedSort: (value: string) => void;
    selectedSubject: string | null; 
    selectedSearch: string;
    setSelectedSearch: (value: string) => void;
    handleSearchSubmit: () => void;
    inputText: string;
    setInputText: (value: string) => void;
}

const SelectionBar: React.FC<SelectionBarProps>  = ({ 
        selectedSort, 
        setSelectedSort, 
        selectedSubject, 
        selectedSearch, 
        setSelectedSearch, 
        handleSearchSubmit, 
        inputText,
        setInputText
    }) => {
    
    const [placeholder, setPlaceholder] = useState<string>("");

    useEffect(() => {
        if (selectedSearch === "tutor") {
            setPlaceholder("Please enter tutor's name...");
        } else if (selectedSearch === "availability") {
            setPlaceholder("Please enter Fulltime or Parttime...");
        } else if (selectedSearch === "skillset") {
            setPlaceholder("Please enter a skill...");
        } else {
            setPlaceholder("Please select a search option...");
        }
    },[selectedSearch]);

    return(
        <div className="flex justify-between">
            {selectedSubject != "all" && (
                <>
                <select
                    value={selectedSearch}
                    onChange={(e) => setSelectedSearch(e.target.value)}
                    className=" border p-2 rounded w-48 shadow"
                >
                    <option value={""}>Search By</option>
                    <option value="tutor">Tutor Name</option>
                    <option value="availability">Availability</option>
                    <option value="skillset">Skill Set</option>
                </select>
                <div className="pr-10 flex flex-row w-100">
                    <FormControl isRequired>
                        <Input
                        name="search"
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={placeholder}
                        />
                    </FormControl>
                   
                    <Button
                        type="button"
                        className=""
                        onClick={handleSearchSubmit}
                    >
                        Search
                    </Button>
                </div> 
                </>)
            }
          
            <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="border p-2 rounded w-48 shadow"
            >
                <option value={""}>Sort By</option>
                {selectedSubject === "all" && <option value="course">Course</option>}
                <option value="availability">Availability</option>
            </select>
        </div>
    )
}

export default SelectionBar;