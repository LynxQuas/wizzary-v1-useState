import { NavLink } from "react-router-dom";
import Profile from "./Profile";

const navLinkContents = [
    { href: "/", name: "Home" },
    { href: "/active-listings", name: "Active Listings" },
    { href: "/about", name: "About" },
    { href: "/contact", name: "Contact" },
];

type NavlistProps = {
    className: string;
    onCloseMenu?(): void;
};

const NavLists = ({ className, onCloseMenu }: NavlistProps) => {
    return (
        <ul className={className} onClick={onCloseMenu}>
            {navLinkContents.map((link) => (
                <li key={link.name}>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? " text-yellow-500" : ""
                        }
                        to={link.href}
                    >
                        {link.name}
                    </NavLink>
                </li>
            ))}
            <Profile className="flex flex-row-reverse items-center justify-end gap-4 py-10 md:hidden " />
        </ul>
    );
};

export default NavLists;
