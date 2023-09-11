import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import CustomRadioGroup from '@/components/others/CustomRadioGroup';

// Mocking the necessary dependencies or data
const mockConfig = [
    {id: 1, name: 'Option 1', description: 'Description 1', color: 'bg-blue-500'},
    {id: 2, name: 'Option 2', description: 'Description 2', color: 'bg-green-500'},
];
const mockOnChange = jest.fn();

describe('CustomRadioGroup', () => {
    it('renders without crashing', () => {
        render(<CustomRadioGroup value={1} onChange={mockOnChange} config={mockConfig}/>);
    });

    it('renders correct radio options', () => {
        const {getByText} = render(
            <CustomRadioGroup value={1} onChange={mockOnChange} config={mockConfig}/>
        );

        expect(getByText('Option 1')).toBeInTheDocument();
        expect(getByText('Option 2')).toBeInTheDocument();
    });

    it('calls onChange when an option is selected', () => {
        const {getByLabelText} = render(
            <CustomRadioGroup value={1} onChange={mockOnChange} config={mockConfig}/>
        );

        fireEvent.click(getByLabelText('Option 2'));

        expect(mockOnChange).toHaveBeenCalledWith(2);
    });
});
