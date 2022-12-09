import classNames from 'classnames'
import chunk from 'lodash.chunk'
import { useState } from 'react'
import {
  addDays,
  getDay, format, getDaysInMonth, startOfMonth, endOfMonth,
  previousSunday, isToday
} from 'date-fns'
import IconChevronLeft from '@/icons/IconChevronLeft'
import IconChevronRight from '@/icons/IconChevronRight'

enum Mode {
  DAY_MODE,
  YEAR_MODE
}

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function renderYearCells(date: Date) {
  return (
    <div></div>
  )
}

function renderThs() {
  return weekDays.map(day => <th className="font-normal py-2" key={day}>{day}</th>)
}

type WeekRow = {
  key: number,
  dates: Array<Date>
}

function renderTrTds(rows: Array<WeekRow>, date: Date) {
  const currentMonth = date.getMonth()
  const renderWeek = (dates: Array<Date>) => dates.map(d => {
    const className = classNames({
      'text-center': true,
      'py-[6px]': true,
      'text-white': d.getMonth() === currentMonth,
      'bg-[#00a3ff]': isToday(d),
      'rounded-full': true,
      'hover:bg-white': true,
      'hover:text-[#080808]': true,
      'transition-colors': true,
      'duration-300': true,
      'cursor-pointer': true
    })
    return (
      <td className={className} key={format(d, 'yyyy-mm-dd')}>{d.getDate()}</td>
    )
  })
  return rows.map((row: WeekRow) => {
    return (
      <tr key={row.key}>{renderWeek(row.dates)}</tr>
    )
  })
}

function renderDayCells(date: Date) {

  const startDateOfMonth = startOfMonth(date)
  const endDateOfMonth = endOfMonth(date)
  const firstDayOfWeek = getDay(startDateOfMonth)
  const lastDayOfWeek = getDay(endDateOfMonth)

  // sunday ?
  const startDateOnCal = (firstDayOfWeek === 0) ? startDateOfMonth : previousSunday(startDateOfMonth)
  const endDateOnCal = (lastDayOfWeek === 6) ? endDateOfMonth : addDays(endDateOfMonth, 6 - lastDayOfWeek + 1)

  const eq = (d1: Date, d2: Date) => {
    return (d1.getFullYear() === d2.getFullYear()) &&
      (d1.getMonth() === d2.getMonth()) &&
      (d1.getDate() === d2.getDate())
  }
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
        {renderTrTds(rows, date)}
      </tbody>
    </table>
  )
}

function renderBarText(date: Date, mode: Mode) {
  const pattern = (mode === Mode.DAY_MODE) ? 'MMMM yyyy' : 'yyyy'
  return format(date, pattern)
}

type CalendarMenuProps = {
  className?: string
}

function CalendarMenu({ className }: CalendarMenuProps) {
  const [date, setDate] = useState(new Date())
  const [selectedDate, setSelectedDate] =  useState(new Date())
  const [mode, setMode] = useState(Mode.DAY_MODE)
  const handleBarBtnClick = () => setMode(Mode.YEAR_MODE)
  return (
    <div className={className + ' font-["Inter"] w-[320px]' }>
      <div>Text</div>
      <div className="font-bold text-[32px]">Jan, 2022</div>
      <div className="flex justify-between items-center py-3">
        <IconChevronLeft />
        <button onClick={handleBarBtnClick}>{renderBarText(date, mode)}</button>
        <IconChevronRight />
      </div>
      {(mode === Mode.DAY_MODE) ? renderDayCells(date) : renderYearCells(date)}
      <div className="flex justify-end">
        <button className="px-4 py-4">Cancel</button>
        <button className="px-10 py-4">OK</button>
      </div>
    </div>
  );
}

export default CalendarMenu;
