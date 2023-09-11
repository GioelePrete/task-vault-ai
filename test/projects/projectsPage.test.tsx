import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import ProjectsPage from "@/components/projects/ProjectsPage";

// Mocking required modules or functions
jest.mock("@/hooks/useProjectData", () => ({
    useProjectData: () => [], // Provide mock project data as needed
}));

// Mocking required modules or functions
jest.mock("@/hooks/useSimpleDataFetching", () => ({
    useSimpleDataFetching: jest.fn(() => []),
}));

// Mocking useModalStore and useProjectStore hooks
jest.mock("@/store/ModalStore", () => ({
    useModalStore: jest.fn(() => [true, jest.fn()]), // Example return values
}));

jest.mock("@/store/ProjectStore", () => ({
    useProjectStore: jest.fn(() => [true, jest.fn()]),
}));

describe("ProjectsPage", () => {
    it("renders page title", () => {
        render(<ProjectsPage/>);
        expect(screen.getByText("Projects")).toBeInTheDocument();
    });

    it("filters projects by name", () => {
        render(<ProjectsPage/>);

        const searchInput = screen.getByPlaceholderText("Search by name..");
        fireEvent.change(searchInput, {target: {value: "example name"}});

        expect(searchInput).toHaveValue("example name");
    });

    it("filters projects by owner", () => {
        render(<ProjectsPage/>);

        const searchInput = screen.getByPlaceholderText("Search by owner..");
        fireEvent.change(searchInput, {target: {value: "example owner"}});

        expect(searchInput).toHaveValue("example owner");
    });
});
