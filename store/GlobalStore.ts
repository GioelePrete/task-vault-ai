import {create} from "zustand";

// Define the global state interface with various properties and functions
interface GlobalState {
    userLoggedIn: boolean;
    setUserLoggedIn: (userLoggedIn: boolean) => void;

    userData: UserData;
    setUserData: (userData: UserData) => void;

    loginValidation: (values: AuthValues) => AuthErrors | undefined;
    registerValidation: (values: AuthValues) => AuthErrors | undefined;
    validateEmailAndPassword: (values: AuthValues, errors: AuthErrors) => AuthErrors | undefined;
}

// Create the global store using Zustand
export const useGlobalStore = create<GlobalState>((set, get) => ({
    // Initial state for userLoggedIn
    userLoggedIn: false,
    // Function to update userLoggedIn state
    setUserLoggedIn: (userLoggedIn: boolean) => set({userLoggedIn}),

    // Initial state for userData
    userData: {
        id: 0,
        email: "",
        fullname: "",
        firstname: "",
        encodedEmail: "",
        isLoggedIn: false
    },
    // Function to update userData state
    setUserData: (userData: UserData) => set({userData}),

    // Function to validate login values
    loginValidation: (values: AuthValues) => {
        const errors = {email: "", password: "", fullname: ""};
        // Delegate to validateEmailAndPassword function to check email and password
        return get().validateEmailAndPassword(values, errors);
    },

    // Function to validate registration values
    registerValidation: (values: AuthValues) => {
        const errors = {email: "", password: "", fullname: ""};

        // Check for presence of fullname and format
        if (!values.fullname) {
            errors.fullname = "Fullname required";
        } else if (!values.fullname.includes(" ")) {
            errors.fullname = "Invalid fullname";
        }

        // Delegate to validateEmailAndPassword function to check email and password
        return get().validateEmailAndPassword(values, errors);
    },

    // Function to validate email and password
    validateEmailAndPassword: (values: AuthValues, errors: AuthErrors) => {
        // Check for presence and validity of email
        if (!values.email) {
            errors.email = "Email required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = "Invalid email address";
        }

        // Check for presence and length of password
        if (!values.password) {
            errors.password = "Password required";
        } else if (values.password.length < 8) {
            errors.password = "Must be greater than 8 characters long";
        } else if (values.password.length > 20) {
            errors.password = "Must be less than 20 characters long";
        } else if (values.password.includes(" ")) {
            errors.password = "Invalid password";
        }

        // Check for a combination of errors to determine if there are any validation errors
        if (
            (errors.email === "" && errors.password === "") ||
            (errors.fullname === "" && errors.email === "" && errors.password === "")
        ) {
            return undefined; // No errors
        }

        return errors; // Return the collected errors
    }
}));
