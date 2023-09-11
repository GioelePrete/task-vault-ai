import React from 'react';
import {render, screen} from '@testing-library/react';
import BoardsPageModal from '@/components/boards/BoardsPageModal';

// Mocking the store hooks
jest.mock('@/store/ModalStore', () => ({
    useModalStore: jest.fn(() => [true, jest.fn(), 'add']),
}));

jest.mock('@/store/BoardStore', () => ({
    useBoardStore: jest.fn(() => [
        1,
        jest.fn(),
        'Board Name',
        jest.fn(),
        50,
        jest.fn(),
        'inProgress',
        jest.fn(),
        'high',
        jest.fn(),
        'Description',
        jest.fn(),
        jest.fn(),
        jest.fn(),
    ]),
}));

describe('BoardsPageModal Component', () => {
    it('renders without crashing', () => {
        render(<BoardsPageModal/>);
    });

    it('displays the correct modal title for add mode', () => {
        render(<BoardsPageModal/>);
        const modalTitle = screen.getByText('New Board');
        expect(modalTitle).toBeInTheDocument();
    });

    it('displays the correct modal title for edit mode', () => {
        // Mocking the modal mode to 'edit'
        jest.spyOn(require('@/store/ModalStore'), 'useModalStore').mockReturnValue([true, jest.fn(), 'edit']);

        render(<BoardsPageModal/>);
        const modalTitle = screen.getByRole('heading', {name: /edit board/i});
        expect(modalTitle).toBeInTheDocument();
    });

});
