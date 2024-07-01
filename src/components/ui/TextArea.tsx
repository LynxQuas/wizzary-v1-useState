interface textAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}
const TextArea = ({
    className,
    name,
    placeholder,
    onChange,
}: textAreaProps) => {
    return (
        <textarea
            className={className}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
        ></textarea>
    );
};

export default TextArea;
