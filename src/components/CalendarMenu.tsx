import classNames from 'classnames'
import chunk from 'lodash.chunk'
import range from 'lodash.range'
import { useState } from 'react'
import { addDays, addMonths, subMonths, getDay, format, getDaysInMonth,
  startOfMonth, endOfMonth, previousSunday, subYears, addYears, setYear } from 'date-fns'
import IconChevronLeft from '@/icons/IconChevronLeft'
import IconChevronRight from '@/icons/IconChevronRight'

enum Mode { DAY_MODE, YEAR_MODE }

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const eq = (d1: Date, d2: Date) => {
  return (d1.getFullYear() === d2.getFullYear()) &&
    (d1.getMonth() === d2.getMonth()) &&
    (d1.getDate() === d2.getDate())
}

function renderYearCells(calendarDate: Date, selectedDate: Date, setSelectedDate: Function) {
  const startDate = subYears(calendarDate, 1)
  const dates = range(20).map(i => addYears(calendarDate, i - 1))
  const rows = chunk(dates, 4)
  const currentYear = selectedDate.getFullYear()
  const renderTds = (dates: Date[]) => {
    return dates.map((d, i) => {
      const fixedClasses = ['text-center', 'py-[1px]',
        'hover:bg-white', 'hover:text-[#080808]', 'transition-colors',
        'duration-300', 'cursor-pointer'
      ]
      const isSameYear = d.getFullYear() === currentYear
      const className = classNames(...fixedClasses, {
        'text-white': isSameYear,
        'bg-[#00a3ff]': isSameYear
      })
      return <td
        key={i}
        className={className}
        onClick={() => setSelectedDate(setYear(selectedDate, d.getFullYear()))}
      >{d.getFullYear()}</td>;
    })
  }
  const renderTrs = () => {
    return rows.map((row, i) => {
      return <tr key={'row-' + i}>{renderTds(row)}</tr>;
    });
  };
  const className = classNames('font-["Inter"]', 'w-[320px]')
  return (
    <table className={className}>
      <tbody>{renderTrs()}</tbody>
    </table>
  )
}

function renderThs() {
  return weekDays.map(day => <th className="font-normal py-2" key={day}>{day}</th>)
}

type WeekRow = {
  key: number,
  dates: Array<Date>
}

function renderTrTds(rows: Array<WeekRow>, calendarDate: Date, selectedDate: Date, setSelectedDate: Function) {
  const currentMonth = calendarDate.getMonth()
  const renderWeek = (dates: Array<Date>) => dates.map(d => {
    const fixedClasses = ['text-center', 'py-[6px]', 'rounded-full',
      'hover:bg-white', 'hover:text-[#080808]', 'transition-colors',
      'duration-300', 'cursor-pointer'
    ]
    const className = classNames(...fixedClasses, {
      'text-white': d.getMonth() === currentMonth,
      'bg-[#00a3ff]': eq(d, selectedDate)
    })
    return (
      <td
        className={className}
        key={format(d, 'yyyy-mm-dd')}
        onClick={() => setSelectedDate(d)}
      >{d.getDate()}</td>
    )
  })
  return rows.map((row: WeekRow) => {
    return (
      <tr key={row.key}>{renderWeek(row.dates)}</tr>
    )
  })
}

function renderDayCells(calendarDate: Date, selectedDate: Date, setSelectedDate: Function) {

  const startDateOfMonth = startOfMonth(calendarDate)
  const endDateOfMonth = endOfMonth(calendarDate)
  const firstDayOfWeek = getDay(startDateOfMonth)
  const lastDayOfWeek = getDay(endDateOfMonth)

  // sunday ?
  const startDateOnCal = (firstDayOfWeek === 0) ? startDateOfMonth : previousSunday(startDateOfMonth)
  const endDateOnCal = (lastDayOfWeek === 6) ? endDateOfMonth : addDays(endDateOfMonth, 6 - lastDayOfWeek + 1)
  let d = startDateOnCal
  const dates = [d]
  while (! eq(d, endDateOnCal)) {
    d = addDays(d, 1)
    dates.push(d)
  }
  const rows = chunk(dates, 7)
    .map((dates, i) => ({ dates, key: i }))

  return (
    <table className="text-[#929292] ml-auto mr-auto w-[300px] border-separate border-spacing-x-[6px]">
      <thead className="text-xs">
        <tr>{renderThs()}</tr>
      </thead>
      <tbody>
        {renderTrTds(rows, calendarDate, selectedDate, setSelectedDate)}
      </tbody>
    </table>
  )
}

function renderBarText(calendarDate: Date, mode: Mode) {
  const pattern = (mode === Mode.DAY_MODE) ? 'MMMM yyyy' : 'yyyy'
  return format(calendarDate, pattern)
}

type CalendarMenuProps = {
  className?: string
}

function CalendarMenu({ className = '' }: CalendarMenuProps) {
  const [calendarDate, setCalendarDate] = useState(new Date())
  const [selectedDate, setSelectedDate] =  useState(new Date())
  const [mode, setMode] = useState(Mode.DAY_MODE)
  const handleBarBtnClick = () => setMode(Mode.YEAR_MODE)
  const wrapperClass = classNames(className, 'font-["Inter"]', 'w-[320px]')
  const arrowBtnClass = 'p-4'
  const toPrev = () => {
    mode === Mode.DAY_MODE ?
      setCalendarDate(subMonths(calendarDate, 1)) :
      setCalendarDate(subYears(calendarDate, 1))
  }
  const toNext = () => {
    mode === Mode.DAY_MODE ?
      setCalendarDate(addMonths(calendarDate, 1)) :
      setCalendarDate(addYears(calendarDate, 1))
  }
  const cancel = () => {
    if (mode === Mode.YEAR_MODE) {
      setMode(Mode.DAY_MODE)
    }
  }
  return (
    <div className={wrapperClass}>
      <div>Text</div>
      <div className="font-bold text-[32px]">{format(calendarDate, 'MMM, yyyy')}</div>
      <div className="flex justify-between items-center py-3">
        <button className={arrowBtnClass} onClick={toPrev}>
          <IconChevronLeft />
        </button>
        <button onClick={handleBarBtnClick}>{renderBarText(calendarDate, mode)}</button>
        <button className={arrowBtnClass} onClick={toNext}>
          <IconChevronRight />
        </button>
      </div>
      {(mode === Mode.DAY_MODE) ?
        renderDayCells(calendarDate, selectedDate, setSelectedDate) :
        renderYearCells(calendarDate, selectedDate, setSelectedDate)}
      <div className="flex justify-end">
        <button className="px-4 py-4" onClick={cancel}>Cancel</button>
        <button className="px-10 py-4">OK</button>
      </div>
    </div>
  );
}

export default CalendarMenu;
