import { CATEGORIES } from '../../categories';
import CategoryChip from '../CategoryChip';
import './StudyCategoryFilter.css';

function StudyCategoryFilter({
    selectedCategory,
    onSelectCategory,
}) {
    return (
        <div className="study-category-filter">
            {CATEGORIES.map((category) => (
                <CategoryChip
                    key={category.value}
                    category={category}
                    isSelected={
                        selectedCategory === category.value
                    }
                    onClick={() =>
                        onSelectCategory(category.value)
                    }
                />
            ))}

            <button
                type="button"
                className={`study-all-chip ${
                    selectedCategory === 'ALL'
                        ? 'selected'
                        : ''
                }`}
                onClick={() => onSelectCategory('ALL')}
            >
                전체
            </button>
        </div>
    );
}

export default StudyCategoryFilter;