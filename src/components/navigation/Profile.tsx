import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useUser } from "../../ctx/authContext";

const Profile = ({ className }: { className: string }) => {
    const { user } = useUser();
    return (
        <Link to="/profile" className={className}>
            <span>{user && user.name}</span>
            {user && <CgProfile size={30} />}
        </Link>
    );
};

export default Profile;
