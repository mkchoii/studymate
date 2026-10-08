import './Input.css';

function Input({
    type = 'text',
    placeholder,
    value,
    onChange,
    errorMessage,
    disabled = false,
    className = '',
}) {
    return (
        <div className="input-wrapper">
            <input
                className={`input ${errorMessage ? 'input-error' : ''} ${className}`}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />

            {errorMessage && (
                <p className="error-message">
                    {errorMessage}
                </p>
            )}
        </div>
    );
}

export default Input;