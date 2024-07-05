// libaries
import { useState } from "react";
import { Link } from "react-router-dom";

// icons / packages
import { GiHamburgerMenu } from "react-icons/gi";
import { Drawer } from "@mui/material";
import { IoClose } from "react-icons/io5";
import NavLogo from "./NavLogo";
import NavLists from "./NavLists";
import Profile from "./Profile";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();

    const handleCloseMenu = () => {
        setIsOpen((state) => !state);
    };

    return (
        <nav className="flex items-center z-10 justify-between md:px-20 px-10 py-10 fixed text-white bg-neutral-700 w-full top-0 left-0">
            <NavLogo />
            <NavLists className="hidden md:flex gap-10 text-[17px]" />

            <GiHamburgerMenu
                size={30}
                className="block md:hidden"
                onClick={handleCloseMenu}
            />
            <Drawer
                open={isOpen}
                onClose={handleCloseMenu}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: "80%",
                    },
                }}
            >
                <IoClose
                    size={30}
                    onClick={handleCloseMenu}
                    className=" absolute top-0 right-0 m-4 text-white"
                />
                <NavLists
                    onCloseMenu={handleCloseMenu}
                    className=" flex flex-col text-xl gap-4 p-10 bg-neutral-700 text-white h-screen w-full"
                />
            </Drawer>
            {user && <Profile className="hidden md:flex gap-2 items-center" />}

            {!user && <Link to="login">Login</Link>}
        </nav>
    );
};

export default Navbar;
