import { FaEdit } from "react-icons/fa";
import { IoBookmark } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { User } from "../../types";

interface LisingControlsProps {
    onDelete: () => void;
    curUser: { name: string; id: string } | null;
    creator: User | null;
}

const LisingControls = ({
    onDelete,
    curUser,
    creator,
}: LisingControlsProps) => {
    if (!curUser?.id) {
        return;
    }

    if (curUser.id !== creator?.id) {
        return (
            <div className="absolute flex right-4 md:right-8 my-[-2rem] md:m-0 gap-4">
                <IoBookmark
                    size={30}
                    className="text-amber-600 cursor-pointer"
                />
            </div>
        );
    }

    if (curUser.id === creator?.id) {
        return (
            <div className="absolute flex right-5 md:right-20 my-[-2.5rem] md:m-0 gap-2">
                <Link to="edit">
                    <FaEdit
                        size={30}
                        className="text-blue-500 cursor-pointer"
                    />
                </Link>
                <MdDelete
                    size={30}
                    className="text-red-500 cursor-pointer"
                    onClick={onDelete}
                />
            </div>
        );
    }
};

export default LisingControls;
