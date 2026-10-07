import './Input.css';

function PasswordInput({ value, onChange, placeholder, errorMessage, onClick }) {
    return (
        <div className="input-wrapper">
            <input
                className={`input ${errorMessage ? 'input-error' : ''}`}
                type="password"
                inputMode="numeric"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                maxLength={4}
                onClick={onClick}
            />

            {errorMessage && (
                <p className="error-message">
                    {errorMessage}
                </p>
            )}
        </div>
    );
}

export default PasswordInput;