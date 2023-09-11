import React from "react";
import {render, screen} from "@testing-library/react";
import ProjectTable from "@/components/projects/ProjectTable";

// Mock the ProjectTableRow component
jest.mock("@/components/projects/ProjectTableRow", () => {
    return function MockProjectTableRow(props) {
        return (
            <tr data-testid="project-row">
                <td>{props.project.id}</td>
                <td>{props.project.name}</td>
                <td>{props.project.description}</td>
                <td>{props.project.status}</td>
                <td>{props.project.progress}</td>
                <td>{props.project.status}</td>
            </tr>
        );
    };
});

describe("ProjectTable", () => {
    const mockProjects = [
        {
            id: 1,
            name: "Project A",
            description: "New description project A",
            status: "pending",
            progress: 20,
            priority: "medium"
        },
        {
            id: 2,
            name: "Project B",
            description: "New description project B",
            status: "completed",
            progress: 100,
            priority: "low"
        },
    ];

    it("renders table rows for each project", () => {
        render(
            <ProjectTable
                projects={mockProjects}
                setProjectModalMode={() => {
                }}
                openProjectModal={() => {
                }}
                deleteProject={() => {
                }}
            />
        );

        const projectRows = screen.getAllByTestId("project-row");
        expect(projectRows).toHaveLength(mockProjects.length);
    });

    it("renders correct project ID in the table row", () => {
        render(
            <ProjectTable
                projects={mockProjects}
                setProjectModalMode={() => {
                }}
                openProjectModal={() => {
                }}
                deleteProject={() => {
                }}
            />
        );

        const projectIDCells = screen.getAllByText(/^1$|^2$/); // Use the corrected regular expression
        expect(projectIDCells).toHaveLength(mockProjects.length); // You should expect 2 cells for each project
    });

    it("matches snapshot", () => {
        const {container} = render(
            <ProjectTable
                projects={mockProjects}
                setProjectModalMode={() => {
                }}
                openProjectModal={() => {
                }}
                deleteProject={() => {
                }}
            />
        );

        expect(container).toMatchSnapshot();
    });
});
