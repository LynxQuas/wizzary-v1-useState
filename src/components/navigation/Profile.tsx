import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Profile = ({ className }: { className: string }) => {
    const { user: curUser } = useAuth();
    return (
        <Link to="/profile" className={className}>
            <span>{curUser?.name}</span>
            <CgProfile size={30} />
        </Link>
    );
};

export default Profile;
