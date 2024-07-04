import React from "react";

interface input_props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}
const Input = ({
    type,
    name,
    value,
    className,
    placeholder,
    readOnly,
    onChange,
}: input_props) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            readOnly={readOnly}
            className={className}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
};

export default Input;
