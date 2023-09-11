import {Dialog, Transition} from '@headlessui/react';
import {Fragment} from 'react';
import {useModalStore} from '@/store/ModalStore';
import {FRONTEND_BASE_URL} from '@/utils/constants';

type Props = {
    title: string;
    description: string;
    buttonText: string;
};

const FailedAuthModal = ({title, description, buttonText}: Props) => {
    // Extract modal state and function from the store
    const [failedAuthModalIsOpen, closeFailedAuthModal] = useModalStore((state) => [
        state.failedAuthModalIsOpen,
        state.closeFailedAuthModal,
    ]);

    // Function to navigate to the login page
    const navigateToLogin = () => {
        window.location.replace(`${FRONTEND_BASE_URL}/auth/login`);
    };

    return (
        // Use Transition to control modal animations
        <Transition appear show={failedAuthModalIsOpen} as={Fragment}>
            <Dialog className="relative z-10" onClose={closeFailedAuthModal}>
                {/* Background for transition animation */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25"/>
                </Transition.Child>

                {/* Modal content */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        {/* Child transition for modal panel */}
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            {/* Modal panel */}
                            <Dialog.Panel
                                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left-align-middle
                shadow-xl transition-all"
                            >
                                {/* Modal title */}
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 pb-2">
                                    {title}
                                </Dialog.Title>
                                {/* Modal description */}
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">{description}</p>
                                </div>
                                {/* Button to navigate to login */}
                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={navigateToLogin}
                                    >
                                        {buttonText}
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default FailedAuthModal;
