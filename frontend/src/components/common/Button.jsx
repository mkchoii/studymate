import './Button.css';

function Button({ children, disabled = false, onClick }) {
    return (
        <button
            className="button"
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;