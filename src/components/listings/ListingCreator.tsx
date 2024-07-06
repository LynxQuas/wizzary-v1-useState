import { Link } from "react-router-dom";
import { User } from "../../types";
import { timeFormatter } from "../../utils/helper";
import { useAuth } from "../../context/AuthContext";

interface LisingControlsProps {
    creator: User | null;
    createdAt: string | undefined;
}

const ListingCreator = ({ creator, createdAt }: LisingControlsProps) => {
    const { user: curUser } = useAuth();
    return (
        <div className="flex gap-8 items-center md:mb-2">
            <div className="flex items-center gap-4">
                <img
                    src={creator?.profile_image}
                    alt="profile"
                    className="rounded-full w-10 h-10"
                />
                <Link to="/profile" className="font-bold  hover:text-blue-500">
                    {creator?.name}
                </Link>
                {creator?.id === curUser?.id && (
                    <div className="bg-blue-500 py-1 px-2 rounded-md">
                        <span className="text-white">You</span>
                    </div>
                )}
                <p className="text-gray-400">{timeFormatter(createdAt!)}</p>
            </div>
        </div>
    );
};

export default ListingCreator;
