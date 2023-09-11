import Link from "next/link";

// This component represents the guest homepage.
const GuestHomepage = () => {
    return (
        <main className="container mx-auto text-center py-20">
            {/* Heading for the guest homepage */}
            <h3 className="text-6xl font-bold mb-5">Welcome to Task Vault AI</h3>

            {/* Message prompting users to sign in or register */}
            <p className="text-lg mb-5">To access the app, please sign in or register.</p>

            {/* Buttons for signing in and registering */}
            <div className="flex justify-center space-x-5">
                {/* Link to the login page */}
                <Link href="/auth/login">
                    <span className="px-8 py-2 rounded-sm bg-[#6b7280] text-white cursor-pointer">
                        Sign In
                    </span>
                </Link>

                {/* Link to the registration page */}
                <Link href="/auth/register">
                    <span className="px-8 py-2 rounded-sm border border-[#6b7280] text-[#6b7280] cursor-pointer">
                        Register
                    </span>
                </Link>
            </div>
        </main>
    );
};

export default GuestHomepage;
