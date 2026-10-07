function WeekCalendar({ selectedDate, onSelectDate }) {
    const dayLabels = ['월', '화', '수', '목', '금', '토', '일'];

    const parseDate = (dateString) => {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const selected = parseDate(selectedDate);

    const jsDay = selected.getDay();
    const mondayOffset = jsDay === 0 ? -6 : 1 - jsDay;

    const monday = new Date(selected);
    monday.setDate(selected.getDate() + mondayOffset);

    const weekDates = Array.from({ length: 7 }, (_, index) => {
        const date = new Date(monday);
        date.setDate(monday.getDate() + index);
        return date;
    });

    // 한 주의 소속 월은 목요일을 기준으로 정한다.
    // 해당 월의 첫 목요일이 포함된 주가 1주차다.
    const thursday = weekDates[3];
    const month = thursday.getMonth() + 1;
    const weekNumber = Math.ceil(thursday.getDate() / 7);

    return (
        <section className="week-calendar">
            <h2 className="week-calendar-title">
                {month}월 {weekNumber}주차
            </h2>

            <div className="week-calendar-list">
                {weekDates.map((date, index) => {
                    const dateString = formatDate(date);
                    const isSelected = dateString === selectedDate;

                    return (
                        <button
                            key={dateString}
                            type="button"
                            className={`week-date-card ${
                                isSelected ? 'selected' : ''
                            }`}
                            onClick={() => onSelectDate(dateString)}
                        >
                            <span>{dayLabels[index]}</span>
                            <strong>{date.getDate()}</strong>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}

export default WeekCalendar;
