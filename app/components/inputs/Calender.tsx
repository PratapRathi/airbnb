"use client"
import { DateRange, Range, RangeKeyDict } from "react-date-range"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface CalenderProps {
    value: Range
    onChange: (value: RangeKeyDict) => void
    disabledDates?: Date[]
}

const Calender: React.FC<CalenderProps> = ({ value, disabledDates, onChange }) => {
    return (
        <DateRange
            rangeColors={["#f43f5e"]}
            ranges={[value]}
            date={new Date()}
            direction="vertical"
            showDateDisplay={false}
            minDate={new Date()}
            disabledDates={disabledDates}
            onChange={onChange}
        />
    )
}

export default Calender
