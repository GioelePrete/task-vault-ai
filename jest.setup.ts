// Importing the '@testing-library/jest-dom' library, which provides additional custom jest matchers for DOM testing.
import '@testing-library/jest-dom';

// Defining a global mock for the ResizeObserver class, which is commonly used for tracking element size changes.
// This mock implementation allows us to spy on the methods of the ResizeObserver instance.

// The constructor for the ResizeObserver class is provided a callback function that will be called whenever a size change is observed.

// Defining the constructor function for the mock ResizeObserver class.
global.ResizeObserver = function ResizeObserver(callback) {
    // Mocking the observe method, which is used to start observing a target element for size changes.
    // We use the jest.fn() to create a spy on this method, so we can later check if and how it was called.
    this.observe = jest.fn();

    // Mocking the disconnect method, which is used to stop observing a target element.
    // Similar to observe, we create a spy on this method using jest.fn().
    this.disconnect = jest.fn();
};
