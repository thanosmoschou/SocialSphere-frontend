type InputProps = {
    label: string;
    name: string;
    type: string;
    placeholder: string;
    required: boolean;
}

export const Input = (props: InputProps) => {
    return (
        <div className="space-y-2">
            <label htmlFor={props.name} className="block text-white">
                {props.label}
            </label>
            <input
                id={props.name}
                name={props.name}
                type={props.type}
                placeholder={props.placeholder}
                className="w-full px-4 py-3 bg-[#1a1a1a] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
            />
            {
                props.label === "Password" && (
                    <p className="text-xs text-gray-400">
                        Must be at least 8 characters.
                    </p>
                )
            }
        </div>
    );
};
