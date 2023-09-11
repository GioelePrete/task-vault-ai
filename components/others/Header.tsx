"use client";

// Import necessary libraries and modules
import React, {useState} from "react";
import Image from "next/image";
import Avatar from "react-avatar";
import {FaSignOutAlt} from "react-icons/fa";
import Cookies from "js-cookie";
import {useGlobalStore} from "@/store/GlobalStore";
import {FRONTEND_BASE_URL, LOGO_PATH} from "@/utils/constants";

// Define the props interface for the Header component
interface Props {
    userFullname?: string;
}

// Header component definition
const Header = ({userFullname}: Props) => {

    // Access the setUserLoggedIn function from the global store
    const setUserLoggedIn = useGlobalStore((state) => state.setUserLoggedIn);

    const handleLogout = () => {
        // Remove the authentication token
        Cookies.remove('authToken');
        // Redirect to the frontend base URL
        window.location.replace(FRONTEND_BASE_URL);
        // Set the user as logged out
        setUserLoggedIn(false);
    };

    return (
        <header>
            {/* Header container with logo, user avatar, and logout button */}
            <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500">
                {/* Gradient overlay for the header */}
                <div
                    className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-black to-gray-500 rounded-md filter blur-3xl opacity-50 -z-50"
                />

                {/* Logo image */}
                <Image
                    src={LOGO_PATH}
                    alt="logo"
                    width={300}
                    height={100}
                    className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
                />

                {/* User avatar and logout button if user is logged in */}
                <div className="flex items-center space-x-5 flex-1 justify-end w-full">
                    {userFullname && (
                        <>
                            {/* User avatar */}
                            <Avatar
                                round
                                name={userFullname}
                                size="55"
                            />
                            {/* Logout button */}
                            <button
                                className="bg-gray-50 text-gray-500 p-2 rounded-full hover:bg-rose-500 hover:text-gray-50"
                                onClick={handleLogout}>
                                {/* Logout icon */}
                                <FaSignOutAlt className="w-9 h-9"/>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};


export default Header;
