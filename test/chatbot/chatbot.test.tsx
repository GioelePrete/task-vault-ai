import React from 'react';
import {render} from '@testing-library/react';
import Chatbot from '@/components/chatbot/Chatbot';
import ChatbotBubble from '@/components/chatbot/ChatbotBubble';

describe('Chatbot', () => {
    it('renders the component and matches snapshot', () => {
        const {asFragment} = render(<Chatbot onClose={() => {
        }}/>);
        expect(asFragment()).toMatchSnapshot();
    });
});

describe("ChatbotBubble Component", () => {
    it("renders chatbot toggle button by default", () => {
        const {getByTestId} = render(<ChatbotBubble/>);
        const toggleButton = getByTestId("chatbot-toggle-button");
        expect(toggleButton).toBeInTheDocument();
    });
});




