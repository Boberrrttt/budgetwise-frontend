interface InputFieldAuthProps {
    label: string,
    margin?: string,
    value: string,
    error: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputFieldAuth = ({ label, margin, onChange, value, error }: InputFieldAuthProps) => {
    return (
        <>
            <label htmlFor="email" className={`text-xl ${margin} ${error && 'text-red-500'} mb-2`}>{label}</label>
            <input type="text" value={value} onChange={onChange} className="px-3 py-2 border-2 rounded-xl border-black " />
            {error && <p className="text-red-500 mt-1">{error}</p>}
        </>
    )
}

export default InputFieldAuth