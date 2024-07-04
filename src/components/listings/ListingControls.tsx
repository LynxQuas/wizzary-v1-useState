import { FaEdit } from "react-icons/fa";
import { IoBookmark } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const LisingControls = ({ onDelete }: { onDelete: () => void }) => {
    return (
        <div className="absolute flex right-0 my-[-2.5rem] md:m-0 gap-4">
            <Link to="edit">
                <FaEdit size={30} className="text-blue-500 cursor-pointer" />
            </Link>
            <MdDelete
                size={30}
                className="text-red-500 cursor-pointer"
                onClick={onDelete}
            />
            <IoBookmark size={30} className="text-amber-600 cursor-pointer" />
        </div>
    );
};

export default LisingControls;
