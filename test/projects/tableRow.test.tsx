import React from "react";
import {render, screen} from "@testing-library/react";
import ProjectTableRow from "@/components/projects/ProjectTableRow";

describe("ProjectTableRow", () => {
    const mockProject = {
        id: 1,
        owner: "John Doe",
        name: "Test Project",
        description: "A test project",
        status: "pending",
        progress: 50,
        priority: "high",
    };

    const mockProps = {
        project: mockProject,
        index: 0,
        setProjectModalMode: jest.fn(),
        openProjectModal: jest.fn(),
        deleteProject: jest.fn(),
    };

    it("renders project data in the table row", () => {
        render(<ProjectTableRow {...mockProps} />);

        expect(screen.getByText(mockProject.owner)).toBeInTheDocument();
        expect(screen.getByText(mockProject.name)).toBeInTheDocument();
        expect(screen.getByText(mockProject.description)).toBeInTheDocument();
        expect(screen.getByText(mockProject.status)).toBeInTheDocument();
        expect(screen.getByText(`${mockProject.progress}%`)).toBeInTheDocument();
        expect(screen.getByText(mockProject.priority)).toBeInTheDocument();
    });

    it("displays correct project index", () => {
        render(<ProjectTableRow {...mockProps} />);
        const indexCell = screen.getByText(`${mockProps.index + 1}`);
        expect(indexCell).toBeInTheDocument();
    });

});
