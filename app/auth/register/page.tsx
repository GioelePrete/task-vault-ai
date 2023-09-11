"use client";

import Link from "next/link";
import {AtSymbolIcon, FingerPrintIcon, UserIcon} from "@heroicons/react/24/outline";
import React, {useState} from "react";
import {useFormik} from "formik";
import axios from "axios";
import Header from "@/components/others/Header";
import {useModalStore} from "@/store/ModalStore";
import FailedAuthModal from "@/components/others/FailedAuthModal";
import {useGlobalStore} from "@/store/GlobalStore";
import {BACKEND_BASE_URL, FRONTEND_BASE_URL} from "@/utils/constants";
import {getInputBorderClassName} from "@/utils/others";

export default function Register() {
    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState<boolean>(false);

    // Custom hook to open the failed authentication modal
    const openFailedAuthModal = useModalStore((state) => state.openFailedAuthModal);

    // Custom hook to get the validation function for registration
    const registerValidation = useGlobalStore((state) => state.registerValidation);

    // Form handling using Formik
    const formik = useFormik({
        initialValues: {
            fullname: "",
            email: "",
            password: "",
        },
        // Custom validation function
        validate: (values) => registerValidation(values),
        onSubmit: (values) => onSubmit(values),
    });

    // Function to handle form submission
    async function onSubmit(values: { fullname: string; email: string; password: string }) {
        try {
            // Send a POST request to the backend for registration
            await axios.post(`${BACKEND_BASE_URL}/auth/register`, {
                fullname: values.fullname,
                email: values.email,
                password: values.password,
            });

            // Redirect to the login page after successful registration
            window.location.replace(`${FRONTEND_BASE_URL}/auth/login`);
        } catch (error: any) {
            // Handle registration error
            if (error.response.status === 401) {
                // Open the failed authentication modal if email is already registered
                openFailedAuthModal();
            }
            console.error("Error registering in:", error);
            throw error;
        }
    }

    return (
        <main>
            {/* Render the Header component */}
            <Header/>

            <div>
                <div className="mx-auto my-44 bg-slate-50 rounded-lg w-1/3 shadow-gray-500 shadow-2xl">
                    <div className="right flex flex-col justify-evenly">
                        <div className="text-center py-10">
                            <div className="w-3/4 mx-auto flex flex-col gap-10">
                                <div className="title">
                                    {/* Registration form title */}
                                    <h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>
                                    {/* Registration form description */}
                                    <p className="w-3/4 mx-auto text-gray-400">
                                        Create an account to initiate new projects, streamline task management and foster collaboration among
                                        team members!
                                    </p>
                                </div>

                                <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
                                    {/* Fullname input field */}
                                    <div
                                        className={`input-group ${getInputBorderClassName(formik.errors.fullname, formik.touched.fullname)}`}>
                                        <input type="text"
                                               placeholder="Fullname" {...formik.getFieldProps("fullname")} />
                                        <UserIcon className="w-6 h-6 m-auto mr-3"/>
                                    </div>

                                    {/* Email input field */}
                                    <div
                                        className={`input-group ${getInputBorderClassName(formik.errors.email, formik.touched.email)}`}>
                                        <input type="email" placeholder="Email" {...formik.getFieldProps("email")} />
                                        <AtSymbolIcon className="w-6 h-6 m-auto mr-3"/>
                                    </div>

                                    {/* Password input field */}
                                    <div
                                        className={`input-group ${getInputBorderClassName(formik.errors.password, formik.touched.password)}`}>
                                        <input
                                            type={`${showPassword ? "text" : "password"}`}
                                            placeholder="Password"
                                            {...formik.getFieldProps("password")}
                                        />
                                        <FingerPrintIcon
                                            className="w-6 h-6 m-auto mr-3 cursor-pointer hover:text-[#6366f1]"
                                            onClick={() => setShowPassword(!showPassword)}
                                        />
                                    </div>

                                    {/* Submit button */}
                                    <div className="input-button">
                                        <button className="loginBtn" type="submit">
                                            Register
                                        </button>
                                    </div>
                                </form>

                                {/* Link to login page */}
                                <p className="text-center text-gray-400">
                                    You have an account?{" "}
                                    <Link href={"/auth/login"}>
                                        <span className="text-blue-700">Sign In</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Failed registration modal */}
            <FailedAuthModal
                title="Registration Failed"
                description="The email you provided is already registered. Please try logging in instead"
                buttonText="Go Login!"
            />
        </main>
    );
}
