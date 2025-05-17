import { FaSpinner } from "react-icons/fa";

export default function Loading({ size = 30}) {
    return (
        <div className="flex justify-center items-center">
            <FaSpinner size={size} className="text-[#049663] dark:text-white text-5xl animate-spin" />
        </div>
    );
}
