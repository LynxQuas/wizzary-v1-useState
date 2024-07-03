interface textAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}
const TextArea = ({
    className,
    name,
    value,
    placeholder,
    onChange,
}: textAreaProps) => {
    return (
        <textarea
            className={className}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        >
            {value}
        </textarea>
    );
};

export default TextArea;
