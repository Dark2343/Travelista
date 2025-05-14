import { FaSpinner } from "react-icons/fa";

export default function Loading() {
    return (
        <div className="flex justify-center items-center">
            <FaSpinner className="text-white text-5xl animate-spin" />
        </div>
    );
}
