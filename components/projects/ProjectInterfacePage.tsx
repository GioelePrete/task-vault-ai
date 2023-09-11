import {Tab} from '@headlessui/react';
import {UsersIcon, ViewColumnsIcon} from "@heroicons/react/24/solid";
import BoardsPage from "@/components/boards/BoardsPage";
import CollaboratorsPage from "@/components/collaborators/CollaboratorsPage";

// This component represents a project interface page with tabbed navigation.
const ProjectInterfacePage = () => {

    return (
        <div>
            {/* Using Tab.Group from @headlessui/react for tabbed navigation */}
            <Tab.Group>
                {/* Tab.List contains the navigation tabs */}
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 w-4/5 mx-auto mt-8">
                    {/* Define styles for each tab button */}
                    <Tab as="button"
                         className={({selected}) => `flex items-center space-x-2 justify-center w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white 
                            ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 
                            ${selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"}`
                         }
                    >
                        {/* Icon for the "Boards" tab */}
                        <ViewColumnsIcon className="w-6 h-6"/>
                        <span>Boards</span>
                    </Tab>

                    {/* Define similar styles for the "Collaborators" tab */}
                    <Tab as="button"
                         className={({selected}) => `flex items-center space-x-2 justify-center w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white 
                            ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 
                            ${selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"}`
                         }
                    >
                        {/* Icon for the "Collaborators" tab */}
                        <UsersIcon className="w-6 h-6"/>
                        <span>Collaborators</span>
                    </Tab>
                </Tab.List>

                {/* Tab.Panels contains the content for each tab */}
                <Tab.Panels>
                    {/* Content of the "Boards" tab */}
                    <Tab.Panel><BoardsPage/></Tab.Panel>
                    {/* Content of the "Collaborators" tab */}
                    <Tab.Panel><CollaboratorsPage/></Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
};

export default ProjectInterfacePage;
