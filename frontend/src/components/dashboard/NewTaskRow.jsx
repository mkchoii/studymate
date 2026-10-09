import { useState } from 'react';

import checkboxEmptyIcon from '../../assets/icons/checkbox-empty.svg';
import './TaskRow.css';

function NewTaskRow({ onCreate, onCancel }) {
    const [content, setContent] = useState('');

    const handleSubmit = () => {
        const trimmedContent = content.trim();

        if (!trimmedContent) {
            onCancel();
            return;
        }

        onCreate(trimmedContent);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.currentTarget.blur();
        }
    };

    return (
        <div className="task-row new-task-row">
            <div className="task-checkbox-button">
                <img
                    src={checkboxEmptyIcon}
                    alt=""
                    className="task-checkbox-icon"
                />
            </div>

            <input
                type="text"
                className="new-task-input"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleSubmit}
                placeholder="태스크를 입력해주세요"
                enterKeyHint='done'
                autoFocus
            />
        </div>
    );
}

export default NewTaskRow;