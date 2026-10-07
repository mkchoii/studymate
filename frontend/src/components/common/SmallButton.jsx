import './SmallButton.css';

function SmallButton({
    children,
    onClick,
    disabled = false,
}) {
    return (
        <button
            type="button"
            className="small-button"
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default SmallButton;