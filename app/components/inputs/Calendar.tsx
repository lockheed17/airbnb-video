'use client';

import {DateRange, Range, RangeKeyDict} from "react-date-range";
import { uk } from 'date-fns/locale'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

interface CalendarProps {
    value: Range,
    onChange: (value: RangeKeyDict) => void,
    disabledDates?: Date[],
}

const Calendar = ({value, onChange, disabledDates}: CalendarProps) => {

    return (
        <DateRange
            locale={uk}
            rangeColors={['#262626']}
            ranges={[value]}
            date={new Date()}
            onChange={onChange}
            direction="vertical"
            showDateDisplay={false}
            minDate={new Date()}
            disabledDates={disabledDates}
        />
    );
}

export default Calendar;