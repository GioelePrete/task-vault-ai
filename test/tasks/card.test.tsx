import React from 'react';
import {render} from '@testing-library/react';
import TaskCard from '@/components/tasks/TaskCard';

describe('TaskCard Component', () => {
    const mockTask = {
        id: 1,
        boardID: 1,
        title: 'Test Task',
        status: 'inProgress',
        columnOrder: 0,
        image: 'test-image.jpg'
    };

    const mockProps = {
        task: mockTask,
        index: 0,
        id: 'inProgress',
        innerRef: jest.fn(),
        draggableProps: {'data-testid': 'draggable-props'},
        dragHandleProps: {'data-testid': 'drag-handle-props'}
    };

    it('renders task title correctly', () => {
        const {getByText} = render(<TaskCard {...mockProps} />);
        expect(getByText('Test Task')).toBeInTheDocument();
    });

    it('displays image when image URL is provided', () => {
        const {getByAltText} = render(<TaskCard {...mockProps} />);
        const imageElement = getByAltText('task image');
        expect(imageElement).toBeInTheDocument();
    });

    it('does not display image when image URL is not provided', () => {
        const taskWithoutImage = {...mockTask, image: null};
        const {queryByAltText} = render(<TaskCard {...mockProps} task={taskWithoutImage}/>);
        expect(queryByAltText('task image')).toBeNull();
    });
});