import React from "react";
import {render} from "@testing-library/react";
import ColumnHeader from "@/components/tasks/ColumnHeader";

describe('ColumnHeader Component', () => {
    const mockProps = {
        id: 'todo',
        tasks: [],
        index: 0,
    };

    it('renders without crashing', () => {
        render(<ColumnHeader {...mockProps} />);
    });

    it('displays the correct column name', () => {
        const {getByText} = render(<ColumnHeader {...mockProps} />);
        const columnName = getByText('Todo');
        expect(columnName).toBeInTheDocument();
    });

    it('displays total task count when no search filter applied', () => {
        const tasks = [
            {id: 1, boardID: 1, title: 'Task 1', status: "todo", columnOrder: 0, image: null},
            {id: 2, boardID: 1, title: 'Task 2', status: "todo", columnOrder: 1, image: null}
        ];
        const {getByText} = render(<ColumnHeader {...mockProps} tasks={tasks}/>);
        const totalTaskCount = getByText('2'); // Adjust the expected count based on your tasks array
        expect(totalTaskCount).toBeInTheDocument();
    });

    it('displays filtered task count when search filter applied', () => {
        const tasks = [
            {id: 1, boardID: 1, title: 'Task 1', status: "todo", columnOrder: 0, image: null},
            {id: 2, boardID: 1, title: 'Task 2', status: "todo", columnOrder: 1, image: null},
            {id: 3, boardID: 1, title: 'Another', status: "todo", columnOrder: 2, image: null}
        ];
        const searchTaskCard = 'Task';
        const {getByText} = render(
            <ColumnHeader {...mockProps} tasks={tasks} searchTaskCard={searchTaskCard}/>
        );
        const filteredTaskCount = getByText('2'); // Adjust the expected count based on the filter
        expect(filteredTaskCount).toBeInTheDocument();
    });

    it('displays zero task count when search filter has no match', () => {
        const tasks = [
            {id: 1, boardID: 1, title: 'Task 1', status: "todo", columnOrder: 0, image: null},
            {id: 2, boardID: 1, title: 'Task 2', status: "todo", columnOrder: 1, image: null}
        ];
        const searchTaskCard = 'Nonexistent Task';
        const {getByText} = render(
            <ColumnHeader {...mockProps} tasks={tasks} searchTaskCard={searchTaskCard}/>
        );
        const zeroTaskCount = getByText('0');
        expect(zeroTaskCount).toBeInTheDocument();
    });
});
