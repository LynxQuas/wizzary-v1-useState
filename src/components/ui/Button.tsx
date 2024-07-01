import React from "react";

interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}

const Button = ({ className, onClick, label, ...rest }: buttonProps) => {
    return (
        <button className={className} onClick={onClick} {...rest}>
            {label}
        </button>
    );
};

export default Button;
