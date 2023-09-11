// Exporting the configuration object for Jest
module.exports = {
    // Indicate that we are using the jsdom environment for testing browser-like behavior
    testEnvironment: 'jsdom',
    // Disable printing of test execution summary and individual test outputs
    silent: true,
    // Set the verbosity of the test output to false, meaning less detailed output
    verbose: false,
    // Specify the setup files that will be executed before tests start running
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    // Specify patterns for test paths that should be ignored during test discovery
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    // Define module name mappings for importing modules in your tests
    // In this case, it allows you to use '@/' as a shortcut for '<rootDir>/' when importing
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    // Specify patterns for files that should be ignored during transformation
    transformIgnorePatterns: [
        '/node_modules/', // Ignore files in the 'node_modules' directory
        '\\.(jpg|jpeg|png|gif|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$', // Ignore various file types
    ],
};
