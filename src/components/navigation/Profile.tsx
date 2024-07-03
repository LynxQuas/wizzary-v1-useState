import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const Profile = ({ className }: { className: string }) => {
    return (
        <Link to="/profile" className={className}>
            <span>username</span>
            <CgProfile size={30} />
        </Link>
    );
};

export default Profile;
