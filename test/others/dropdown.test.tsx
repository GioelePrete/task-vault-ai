import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Dropdown from '@/components/others/Dropdown';

describe('Dropdown Component', () => {
    const options = [
        {name: 'Option 1'},
        {name: 'Option 2'},
        {name: 'Option 3'},
    ];

    const mockOnChange = jest.fn();

    it('renders the selected option', () => {
        const selectedOption = {name: 'Option 2'};
        render(<Dropdown options={options} value={selectedOption} onchange={mockOnChange}/>);

        const selectedOptionElement = screen.getByText('Option 2');
        expect(selectedOptionElement).toBeInTheDocument();
    });

    it('calls onchange with selected option when an option is clicked', () => {
        render(<Dropdown options={options} value={options[0]} onchange={mockOnChange}/>);

        const button = screen.getByText('Option 1');
        fireEvent.click(button);

        const option2 = screen.getByText('Option 2');
        fireEvent.click(option2);

        expect(mockOnChange).toHaveBeenCalledWith(options[1]);
    });
});
