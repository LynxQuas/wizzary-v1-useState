import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";

interface PASSWORD_INPUT_PROPS {
    value: string;
    placeholder: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, input: string) => void;
}

const PasswordInput = ({
    value,
    placeholder,
    name,
    onChange,
}: PASSWORD_INPUT_PROPS) => {
    const [isShow, setIsShow] = useState(false);

    const toggleIsShow = () => {
        setIsShow((prevState) => !prevState);
    };

    return (
        <div className="relative">
            <input
                value={value}
                type={`${!isShow ? "password" : "text"}`}
                placeholder={placeholder}
                name={name}
                onChange={(e) => onChange(e, name)}
                className="w-full h-[3rem] px-2 bg-gray-200 border border-black"
            />
            {isShow ? (
                <BiShow
                    size={30}
                    onClick={toggleIsShow}
                    className="absolute top-[20%] right-0 mx-4 cursor-pointer"
                />
            ) : (
                <BiHide
                    size={30}
                    onClick={toggleIsShow}
                    className="absolute top-[20%] right-0 mx-4 cursor-pointer"
                />
            )}
        </div>
    );
};

export default PasswordInput;
