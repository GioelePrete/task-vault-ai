"use client";

// Import necessary dependencies and components
import Link from "next/link";
import {AtSymbolIcon, FingerPrintIcon} from "@heroicons/react/24/solid";
import React, {useState} from "react";
import {useFormik} from "formik";
import axios from "axios";
import Header from "@/components/others/Header";
import {useModalStore} from "@/store/ModalStore";
import FailedAuthModal from "@/components/others/FailedAuthModal";
import {useGlobalStore} from "@/store/GlobalStore";
import {BACKEND_BASE_URL, FRONTEND_BASE_URL, LOGIN_FAILED,} from "@/utils/constants";
import {getInputBorderClassName} from "@/utils/others";

// Define the Login component
export default function Login() {

    // State to manage password visibility
    const [showPassword, setShowPassword] = useState<boolean>(false);

    // Custom hook to access modal state
    const openFailedAuthModal = useModalStore((state) => state.openFailedAuthModal);

    // Custom hook to access global store for validation
    const loginValidation = useGlobalStore((state) => state.loginValidation);

    // Formik setup for form handling and validation
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validate: (values) => loginValidation(values),
        onSubmit: (values) => onSubmit(values), // onSubmit function to handle form submission
    });

    // Function to handle form submission
    const onSubmit = async (values: { email: string; password: string }) => {
        try {
            // Sending login request to the backend
            await axios.post(
                `${BACKEND_BASE_URL}/auth/login`,
                {
                    email: values.email,
                    password: values.password
                },
                {withCredentials: true}
            );

            // Redirecting to the frontend home page after successful login
            window.location.replace(FRONTEND_BASE_URL);
        } catch (error: any) {
            if (error.response.status === 401) {
                // Opening failed authentication modal for invalid credentials
                openFailedAuthModal();
            } else {
                // Handling other errors during login process
                console.error("Error logging in:", error);
                throw error;
            }
        }
    };

    return (
        <main>
            <Header/> {/* Display header component */}
            <div>
                <div className="mx-auto my-44 bg-slate-50 rounded-lg w-1/3 shadow-gray-500 shadow-2xl">
                    <div className="right flex flex-col justify-evenly">
                        <div className="text-center py-10">
                            <div className="w-3/4 mx-auto flex flex-col gap-10">
                                <div className="title">
                                    {/* Display title and description */}
                                    <h1 className="text-gray-800 text-4xl font-bold py-4">Login</h1>
                                    <p className="w-3/4 mx-auto text-gray-400">
                                        Welcome back! Keep track of your projects, manage tasks,
                                        collaborate with team members, and more. Your productivity journey starts here!
                                    </p>
                                </div>
                                <form
                                    className="flex flex-col gap-5"
                                    onSubmit={formik.handleSubmit}
                                >
                                    <div
                                        // Applying input border style based on errors and touched status
                                        className={`input-group ${getInputBorderClassName(
                                            formik.errors.email,
                                            formik.touched.email
                                        )}`}
                                    >
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            {...formik.getFieldProps("email")}
                                        />
                                        <AtSymbolIcon className="w-6 h-6 m-auto mr-3"/>
                                    </div>
                                    <div
                                        // Applying input border style based on errors and touched status
                                        className={`input-group ${getInputBorderClassName(
                                            formik.errors.password,
                                            formik.touched.password
                                        )}`}
                                    >
                                        <input
                                            type={`${showPassword ? "text" : "password"}`}
                                            placeholder="Password"
                                            {...formik.getFieldProps("password")}
                                        />
                                        <FingerPrintIcon
                                            // Handling click to toggle password visibility
                                            className="w-6 h-6 m-auto mr-3 cursor-pointer hover:text-[#6366f1]"
                                            onClick={() => setShowPassword(!showPassword)}
                                        />
                                    </div>
                                    <div className="input-button">
                                        <button className="loginBtn" type="submit">
                                            Login
                                        </button>
                                    </div>
                                </form>
                                <p className="text-center text-gray-400">
                                    You don't have an account yet?{" "}
                                    {/* Link to the registration page */}
                                    <Link href={"/auth/register"}>
                                        <span className="text-blue-700">Sign Up</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FailedAuthModal
                title="Login Failed"
                description={LOGIN_FAILED} // Using constant for error message
                buttonText="Try Again!"
            />
        </main>
    );
}
