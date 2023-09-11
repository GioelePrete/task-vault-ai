import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import ProjectsFilters from "@/components/projects/ProjectsFilters";

jest.mock("@/hooks/useSimpleDataFetching", () => ({
    useSimpleDataFetching: () => [],
}));


describe("ProjectsFilters", () => {
    const mockProps = {
        searchName: "",
        searchOwner: "",
        searchStatus: {name: "Pending"},
        searchPriority: {name: "High"},
        setProjectModalMode: jest.fn(),
        openProjectModal: jest.fn(),
        setSearchName: jest.fn(),
        setSearchOwner: jest.fn(),
        setSearchStatus: jest.fn(),
        setSearchPriority: jest.fn(),
    };

    it("renders the 'Add' button", () => {
        render(<ProjectsFilters {...mockProps} />);
        const addButton = screen.getByTestId("add-button");
        expect(addButton).toBeInTheDocument();
    });

    it("updates searchName state when input value changes", () => {
        render(<ProjectsFilters {...mockProps} />);

        const searchInput = screen.getByPlaceholderText("Search by name..");
        fireEvent.change(searchInput, {target: {value: "example name"}});

        expect(mockProps.setSearchName).toHaveBeenCalledWith("example name");
    });

    it("updates searchOwner state when input value changes", () => {
        render(<ProjectsFilters {...mockProps} />);

        const searchInput = screen.getByPlaceholderText("Search by owner..");
        fireEvent.change(searchInput, {target: {value: "example owner"}});

        expect(mockProps.setSearchOwner).toHaveBeenCalledWith("example owner");
    });

});
