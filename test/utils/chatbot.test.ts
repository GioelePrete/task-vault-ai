// Import the functions to be tested
import {
    fetchChatbotAnswer,
    handleAddProject,
    handleAddTask,
    isValidAddTaskArgs,
    isValidMessage,
    isValidTasks,
} from '@/utils/chatbot'; // Update with the correct module path

describe('Unit Tests', () => {

    const mockBoard = {
        columns: new Map([
            ['todo', {tasks: []}],
            ['inProgress', {tasks: []}],
            ['done', {tasks: []}],
        ]),
    };

    // Test handleAddTask function
    it('handleAddTask should return the correct task object', () => {
        const task = handleAddTask('New Task', 'todo', 1);
        expect(task).toEqual({
            role: 'assistant',
            content: 'Successfully added task "New Task" with status "todo"',
            newTask: {
                title: 'New Task',
                status: 'todo',
                columnOrder: 1,
            },
        });
    });

    // Test handleAddProject function
    it('handleAddProject should return the correct project object', () => {
        const project = handleAddProject('New Project', 'Project Description', 'notStarted', 'low', 50);
        expect(project).toEqual({
            role: 'assistant',
            content: 'Successfully added project: "New Project - Project Description"',
            newProject: {
                name: 'New Project',
                description: 'Project Description',
                status: 'notStarted',
                priority: 'low',
                progress: 50,
            },
        });
    });

    // Mock axios for fetchChatbotAnswer testing
    jest.mock('axios');
    const axios = require('axios');

    // Test fetchChatbotAnswer function success
    it('fetchChatbotAnswer should return the correct response on success', async () => {
        axios.post.mockResolvedValue({
            status: 200,
            data: {
                role: 'user',
                content: 'Question',
                newtask: null,
                newProject: null,
            },
        });

        const message = {role: 'user', content: 'Question'};
        const response = await fetchChatbotAnswer(message, mockBoard);

        expect(response.message.role).toBe('assistant');
        expect(response.newTask).toBe(undefined);
        expect(response.newProject).toBe(undefined);
    });

    // Test isValidMessage function
    it('isValidMessage should return content for a valid message', () => {
        const message = {role: 'user', content: 'Hello'};
        expect(isValidMessage(message)).toBeTruthy()
    });

    // Test isValidTasks function
    it('isValidTasks should return true for a valid tasks array', () => {
        const tasks = [{id: 1, title: 'Task 1', status: 'todo'}];
        expect(isValidTasks(tasks)).toBeTruthy();
    });

    // Test isValidAddTaskArgs function
    it('isValidAddTaskArgs should return true for valid arguments', () => {
        const args = {task: 'New Task', status: 'todo', columnOrder: 1};
        expect(isValidAddTaskArgs(args)).toBeTruthy();
    });
});
