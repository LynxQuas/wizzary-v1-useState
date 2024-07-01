const InputError = ({ err }: { err: string }) => {
    return <span className="text-red-500">{err}</span>;
};

export default InputError;
