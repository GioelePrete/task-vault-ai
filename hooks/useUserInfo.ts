import {useGlobalStore} from "@/store/GlobalStore";
import {useEffect} from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

// Custom hook to fetch user information from a JWT token and set it in the global store.
export const useUserInfo = () => {
    // Destructure states from the global store.
    const [setUserLoggedIn, userData, setUserData] = useGlobalStore((state) => [
        state.setUserLoggedIn,
        state.userData,
        state.setUserData
    ]);

    // This effect runs once when the component mounts.
    useEffect(() => {
        // Retrieve the authentication token from cookies.
        const authToken = Cookies.get('authToken');

        // Check if the authentication token exists.
        if (authToken) {
            try {
                // Decode the JWT token to get user information.
                const decodedToken: UserData = jwtDecode(authToken);

                // Set user data in the global store, derived from the decoded token.
                setUserData({
                    id: decodedToken.id,
                    fullname: decodedToken.fullname,
                    // Extract the first name from the full name.
                    firstname: decodedToken.fullname?.split(" ")[0],
                    email: decodedToken.email,
                    // Encode the email and store it.
                    encodedEmail: Buffer.from(String(decodedToken.email)).toString('base64'),
                    // Set the user's login status to true.
                    isLoggedIn: true,
                });

                // Update the global store to reflect the user's logged-in status.
                setUserLoggedIn(true);
            } catch (error) {
                // Log an error message if JWT token decoding fails.
                console.error('Error decoding JWT token:', error);
            }
        }
    }, []); // Empty dependency array ensures this effect runs only once on mount.

    // Return the user data obtained from the global store.
    return userData;
};
