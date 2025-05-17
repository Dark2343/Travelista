import { FaSpinner } from "react-icons/fa";

export default function Loading({ size = 30}) {
    return (
        <div className="flex justify-center items-center">
            <FaSpinner color={'gray'} size={size} className="text-white text-5xl animate-spin" />
        </div>
    );
}
