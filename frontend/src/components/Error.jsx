import { MdOutlineError } from "react-icons/md";

export default function Error({ message, size = 30}) {
    return (
        <div className="flex justify-center items-center">
            <MdOutlineError size={size} className="text-[#049663] dark:text-white text-5xl mr-1" />
            <div className="text-[#049663] dark:text-white text-2xl flex justify-center">Error: {message}</div>;
        </div>
    );
}
