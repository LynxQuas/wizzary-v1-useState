import { FaEdit } from "react-icons/fa";
import { IoBookmark } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useUser } from "../../ctx/authContext";

const LisingControls = ({ name }: { name: string | undefined }) => {
    const { token, user } = useUser();

    if (!token) {
        return;
    }

    if (token && user._id !== name) {
        return (
            <div className="absolute flex right-0 m-4 md:m-1 gap-4">
                <IoBookmark
                    size={30}
                    className="text-amber-600 cursor-pointer"
                />
            </div>
        );
    } else {
        return (
            <div className="absolute flex right-0 m-4 md:m-1 gap-4">
                <Link to="edit">
                    <FaEdit
                        size={30}
                        className="text-blue-500 cursor-pointer"
                    />
                </Link>
                <MdDelete size={30} className="text-red-500 cursor-pointer" />
                <IoBookmark
                    size={30}
                    className="text-amber-600 cursor-pointer"
                />
            </div>
        );
    }
};

export default LisingControls;
