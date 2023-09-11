import {LOADER_PATH} from "@/utils/constants";

// The Loader component displays a loading spinner or image.
const Loader = () => {
    // The returned component describes the structure and styling of the loader.
    return (
        <div className="h-1/5 mt-40 object-contain">
            {/* The image source is set to the LOADER_PATH constant */}
            <img src={LOADER_PATH} alt="loader" className="w-1/5 mx-auto"/>
        </div>
    );
}

export default Loader;
