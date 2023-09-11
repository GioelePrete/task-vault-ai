import React from 'react';
import {render, screen} from '@testing-library/react';
import FailedAuthModal from '@/components/others/FailedAuthModal';

// Mock the useModalStore hook
jest.mock('@/store/ModalStore', () => ({
    useModalStore: jest.fn(() => [true, jest.fn()]), // Mock open modal state and close function
}));

describe('FailedAuthModal', () => {
    it('renders the modal with provided props', () => {
        const title = 'Authentication Failed';
        const description = 'Your authentication attempt has failed.';
        const buttonText = 'Go to Login';

        render(<FailedAuthModal title={title} description={description} buttonText={buttonText}/>);

        // Check if title, description, and button text are rendered
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(description)).toBeInTheDocument();
        expect(screen.getByText(buttonText)).toBeInTheDocument();
    });
});
