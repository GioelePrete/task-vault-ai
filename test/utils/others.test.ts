import {getInputBorderClassName, getParamFromLink, getPriorityColor, getProgressColor} from '@/utils/others'; // Update the path accordingly

describe('Utility Function Tests', () => {
    // Test getInputBorderClassName function
    it('getInputBorderClassName returns correct class for error and touched', () => {
        expect(getInputBorderClassName('error', true)).toBe('border-rose-600');
    });

    it('getInputBorderClassName returns empty string when no error or not touched', () => {
        expect(getInputBorderClassName(undefined, false)).toBe('');
    });

    // Test getPriorityColor function
    it('getPriorityColor returns correct color for priority levels', () => {
        expect(getPriorityColor('High')).toBe('bg-red-500');
        expect(getPriorityColor('Very Low')).toBe('bg-green-500');
        expect(getPriorityColor('Nonexistent')).toBe('bg-gray-500');
    });

    // Test getProgressColor function
    it('getProgressColor returns correct color based on progress', () => {
        expect(getProgressColor(15)).toBe('bg-red-500');
        expect(getProgressColor(45)).toBe('bg-orange-400');
        expect(getProgressColor(60)).toBe('bg-yellow-400');
        expect(getProgressColor(85)).toBe('bg-green-500');
    });

    // Test getParamFromLink function
    it('getParamFromLink extracts parameter value from URL', () => {
        const url = 'http://example.com/?param=value';
        global.window = Object.create(window);
        Object.defineProperty(window, 'location', {
            value: {
                href: url
            }
        });
        expect(getParamFromLink('param')).toBe('value');
    });

    it('getParamFromLink returns null when parameter not found', () => {
        const url = 'http://example.com/';
        global.window = Object.create(window);
        Object.defineProperty(window, 'location', {
            value: {
                href: url
            }
        });
        expect(getParamFromLink('nonexistent')).toBeNull();
    });
});
