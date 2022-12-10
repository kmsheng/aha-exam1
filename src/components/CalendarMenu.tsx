import classNames from 'classnames'
import chunk from 'lodash.chunk'
import range from 'lodash.range'
import { useState } from 'react'
import { addDays, addMonths, subMonths, getDay, format, getDaysInMonth,
  startOfMonth, endOfMonth, previousSunday, subYears, addYears, setYear } from 'date-fns'
import IconChevronLeft from '@/icons/IconChevronLeft'
import IconChevronRight from '@/icons/IconChevronRight'

enum Mode { DAY_MODE, YEAR_MODE }

const eq = (d1: Date, d2: Date) => {
  return (d1.getFullYear() === d2.getFullYear()) &&
    (d1.getMonth() === d2.getMonth()) &&
    (d1.getDate() === d2.getDate())
}

type Context = {
  calendarDate: Date,
  setCalendarDate: Function,
  selectedDate: Date,
  setSelectedDate: Function,
  setMode: Function
}

function renderYearCells(context: Context) {
  const { calendarDate, setCalendarDate, selectedDate, setSelectedDate, setMode } = context
  const startDate = subYears(calendarDate, 1)
  const dates = range(20).map(i => addYears(calendarDate, i - 1))
  const currentYear = selectedDate.getFullYear()

  const renderYearCells = () => {
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
      const handleClick = () => {
        const year = d.getFullYear()
        setMode(Mode.DAY_MODE)
        setSelectedDate(setYear(selectedDate, year))
        setCalendarDate(setYear(calendarDate, year))
      }
      return <div key={i} className={className} onClick={handleClick} >{d.getFullYear()}</div>
    })
  }
  return <div className="grid grid-cols-4 gap-x-[9px] gap-y-[24px] w-[270px] font-['Inter'] ml-auto mr-auto">{renderYearCells()}</div>
}

function renderDayCells(context: Context) {

  const { calendarDate, selectedDate, setSelectedDate } = context

  const startDateOfMonth = startOfMonth(calendarDate)
  const endDateOfMonth = endOfMonth(calendarDate)
  const firstDayOfWeek = getDay(startDateOfMonth)
  const lastDayOfWeek = getDay(endDateOfMonth)

  // sunday ?
  const startDateOnCal = (firstDayOfWeek === 0) ? startDateOfMonth : previousSunday(startDateOfMonth)
  const endDateOnCal = (lastDayOfWeek === 6) ? endDateOfMonth : addDays(endDateOfMonth, 7 - (lastDayOfWeek + 1))
  let d = startDateOnCal
  const dates = [d]
  while (! eq(d, endDateOnCal)) {
    d = addDays(d, 1)
    dates.push(d)
  }

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  const renderDayLabels = () => {
    return weekDays.map(day => <div className="w-[36px] text-center" key={day}>{day}</div>)
  }
  const renderCells = () => {
    const calendarMonth = calendarDate.getMonth()
    return dates.map(d => {
      const fixedClasses = ['text-center', 'py-[6px]', 'rounded-full', 'hover:bg-white',
        'hover:text-[#080808]', 'transition-colors', 'duration-300', 'cursor-pointer', 'w-[36px]', 'h-[36px]']
      const isCurrentMonth = d.getMonth() === calendarMonth
      const className = classNames(...fixedClasses, {
        'text-white': isCurrentMonth,
        'bg-[#00a3ff]': isCurrentMonth && eq(d, selectedDate)
      })
      const handleClick = () => isCurrentMonth && setSelectedDate(d)
      return (
        <div className={className} key={format(d, 'yyyy-MM-dd')} onClick={handleClick} >{d.getDate()}</div>
      )
    })
  }

  return (
    <div className="text-[#929292] ml-auto mr-auto border-separate border-spacing-x-[6px] flex flex-col ml-4 mr-4">
      <div className="text-xs flex justify-between">{renderDayLabels()}</div>
      <div className="grid grid-cols-7 gap-[6px] mt-[12px]">{renderCells()}</div>
    </div>
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
  const wrapperClass = classNames(className, 'font-["Inter"] w-[320px] min-h-[469px] py-[16px] flex flex-col')
  const arrowBtnClass = 'w-[48px] h-[48px] flex justify-center items-center'
  const context = {
    calendarDate,
    setCalendarDate,
    selectedDate,
    setSelectedDate,
    setMode
  }
  return (
    <div className={wrapperClass}>
      <div>Text</div>
      <div className="font-bold text-[32px]">{format(calendarDate, 'MMM, yyyy')}</div>
      <div className="flex justify-between items-center py-3 w-full">
        <button className={arrowBtnClass} onClick={toPrev}>
          <IconChevronLeft />
        </button>
        <button onClick={handleBarBtnClick}>{renderBarText(calendarDate, mode)}</button>
        <button className={arrowBtnClass} onClick={toNext}>
          <IconChevronRight />
        </button>
      </div>
      {(mode === Mode.DAY_MODE) ? renderDayCells(context) : renderYearCells(context)}
      <div className="flex justify-end">
        <button className="px-4 py-4" onClick={cancel}>Cancel</button>
        <button className="px-10 py-4">OK</button>
      </div>
    </div>
  )
}

export default CalendarMenu;
