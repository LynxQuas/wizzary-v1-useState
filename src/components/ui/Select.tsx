interface Option {
    value: string;
    label: string;
}
interface selectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
    options: Option[];
    label?: string;
}

const Select = ({
    className,
    name,
    value,
    id,
    onChange,
    options,
    ...rest
}: selectProps) => {
    return (
        <select
            className={className}
            name={name}
            value={value}
            onChange={onChange}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
