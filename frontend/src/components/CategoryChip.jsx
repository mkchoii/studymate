import './CategoryChip.css';

function CategoryChip({
    category,
    label,
    isSelected = false,
    onClick,
    size = 'default',
}) {
    const className = `category-chip category-${category.value.toLowerCase()} ${
        isSelected ? 'selected' : ''
    } ${size === 'small' ? 'small' : ''}`;

    // 클릭 기능이 있는 경우
    if (onClick) {
        return (
            <button
                type="button"
                className={className}
                onClick={onClick}
            >
                {label ?? category.label}
            </button>
        );
    }

    // 클릭 기능이 없는 경우
    return (
        <span className={className}>
            {label ?? category.label}
        </span>
    );
}

export default CategoryChip;