import React from 'react';
import classNames from 'classnames';
import range from 'lodash.range';
import {useState} from 'react';
import {addDays, addMonths, subMonths, getDay, format,
  startOfMonth, endOfMonth, previousSunday, subYears,
  addYears, setYear, setMonth} from 'date-fns';
import IconChevronLeft from '@/icons/IconChevronLeft';
import IconChevronRight from '@/icons/IconChevronRight';
import '@/components/DateMenu.css';

enum Mode {
  YEAR_MODE,
  MONTH_MODE,
  DAY_MODE,
}

const eq = (d1: Date, d2: Date) => {
  return (d1.getFullYear() === d2.getFullYear()) &&
    (d1.getMonth() === d2.getMonth()) &&
    (d1.getDate() === d2.getDate());
};

type Context = {
  calendarDate: Date,
  setCalendarDate: React.Dispatch<React.SetStateAction<Date>>,
  selectedDate: Date,
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>,
  setMode: React.Dispatch<React.SetStateAction<Mode>>,
  onConfirm: (date: Date) => void,
}

function renderYearCells(context: Context) {
  const {calendarDate, setCalendarDate, selectedDate,
    setSelectedDate, setMode} = context;
  const dates = range(20).map((i) => addYears(calendarDate, i - 1));
  const selectedYear = selectedDate.getFullYear();
  const renderCells = () => {
    return dates.map((d, i) => {
      const fixedClasses = ['text-center', 'py-[1px]',
        'hover:bg-white', 'hover:text-[#080808]', 'transition-colors',
        'duration-300', 'cursor-pointer',
      ];
      const isSameYear = d.getFullYear() === selectedYear;
      const className = classNames(...fixedClasses, {
        'text-white': isSameYear,
        'bg-[#00a3ff]': isSameYear,
      });
      const handleClick = () => {
        const year = d.getFullYear();
        setMode(Mode.MONTH_MODE);
        setSelectedDate(setYear(selectedDate, year));
        setCalendarDate(setYear(calendarDate, year));
      };
      return (
        <div key={i} className={className}
          onClick={handleClick} >{d.getFullYear()}</div>
      );
    });
  };
  return (
    <div className="grid grid-cols-4 gap-x-[9px] gap-y-[24px]
      w-[270px] font-['Inter'] ml-auto mr-auto">{renderCells()}</div>
  );
}

function renderMonthCells(context: Context) {
  const {selectedDate, setSelectedDate, calendarDate,
    setCalendarDate, setMode} = context;
  const selectedMonth = selectedDate.getMonth();
  const cells = range(12).map((i) => {
    const date = new Date(2022, i, 1);
    const fixedClass = `text-center cursor-pointer
    hover:bg-white hover:text-[#080808] transition-colors
    duration-300 hover:bg-white hover:text-[#080808]
    transition-colors duration-300`;
    const isSameMonth = i === selectedMonth;
    const className = classNames(fixedClass, {
      'bg-[#00a3ff]': isSameMonth,
      'text-white': isSameMonth,
    });
    const handleClick = () => {
      setSelectedDate(setMonth(selectedDate, i));
      setCalendarDate(setMonth(calendarDate, i));
      setMode(Mode.DAY_MODE);
    };
    return <div className={className}
      key={i} onClick={handleClick}>{format(date, 'MMM')}</div>;
  });
  return (
    <div className="grid grid-cols-3 gap-x-[9px] gap-y-[24px]
      w-[270px] ml-auto mr-auto">{cells}</div>
  );
}

function renderDayCells(context: Context) {
  const {calendarDate, selectedDate, setSelectedDate} = context;
  const startDateOfMonth = startOfMonth(calendarDate);
  const endDateOfMonth = endOfMonth(calendarDate);
  const firstDayOfWeek = getDay(startDateOfMonth);
  const lastDayOfWeek = getDay(endDateOfMonth);

  // sunday ?
  const startDateOnCal = (firstDayOfWeek === 0) ?
    startDateOfMonth : previousSunday(startDateOfMonth);
  const endDateOnCal = (lastDayOfWeek === 6) ?
    endDateOfMonth : addDays(endDateOfMonth, 7 - (lastDayOfWeek + 1));
  let d = startDateOnCal;
  const dates = [d];
  while (! eq(d, endDateOnCal)) {
    d = addDays(d, 1);
    dates.push(d);
  }
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const dayLabels = weekDays.map((day) => {
    return <div className="w-[36px] text-center" key={day}>{day}</div>;
  });
  const renderCells = () => {
    const calendarMonth = calendarDate.getMonth();
    return dates.map((d) => {
      const fixedClasses = `text-center py-[6px] rounded-full
      hover:bg-white hover:text-[#080808] transition-colors
      duration-300 cursor-pointer w-[36px] h-[36px]`;
      const isCurrentMonth = d.getMonth() === calendarMonth;
      const className = classNames(fixedClasses, {
        'text-white': isCurrentMonth,
        'bg-[#00a3ff]': isCurrentMonth && eq(d, selectedDate),
      });
      const handleClick = () => {
        if (isCurrentMonth) {
          setSelectedDate(d);
        }
      };
      return (
        <div className={className} key={format(d, 'yyyy-MM-dd')}
          onClick={handleClick} >{d.getDate()}</div>
      );
    });
  };

  return (
    <div className="text-[#929292] ml-auto mr-auto
      border-separate border-spacing-x-[6px] flex flex-col ml-4 mr-4">
      <div className="text-xs flex justify-between">{dayLabels}</div>
      <div className="grid grid-cols-7 gap-[6px]
        mt-[12px]">{renderCells()}</div>
    </div>
  );
}

function renderBarText(calendarDate: Date, mode: Mode) {
  const pattern = (mode === Mode.DAY_MODE) ? 'MMMM yyyy' : 'yyyy';
  return format(calendarDate, pattern);
}

type Props = {
  className?: string;
  style?: React.CSSProperties;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
}

function DateMenu({className = '', style, onConfirm, onCancel}: Props) {
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mode, setMode] = useState(Mode.MONTH_MODE);
  const handleBarBtnClick = () => setMode(Mode.YEAR_MODE);
  const toPrev = () => {
    mode === Mode.DAY_MODE ?
      setCalendarDate(subMonths(calendarDate, 1)) :
      setCalendarDate(subYears(calendarDate, 1));
  };
  const toNext = () => {
    mode === Mode.DAY_MODE ?
      setCalendarDate(addMonths(calendarDate, 1)) :
      setCalendarDate(addYears(calendarDate, 1));
  };
  const cancel = () => {
    if (mode === Mode.YEAR_MODE) {
      return setMode(Mode.DAY_MODE);
    }
    if (mode === Mode.MONTH_MODE) {
      return setMode(Mode.DAY_MODE);
    }
    onCancel();
  };
  const wrapperClass = classNames(className,
      'date-menu bg-[#1b1b1b] font-["Inter"] w-[320px]' +
      ' min-h-[469px] py-[16px] flex flex-col text-white');
  const arrowBtnClass = 'w-[48px] h-[48px] flex justify-center items-center';
  const context = {
    calendarDate,
    setCalendarDate,
    selectedDate,
    setSelectedDate,
    setMode,
    onConfirm,
  };
  const renderCells = () => {
    switch (mode) {
      case Mode.YEAR_MODE:
        return renderYearCells(context);
      case Mode.MONTH_MODE:
        return renderMonthCells(context);
      case Mode.DAY_MODE:
        return renderDayCells(context);
      default:
        throw new Error(`Unexpected mode: ${mode}`);
    }
  };
  const onConfirmBtnClick = () => onConfirm(selectedDate);
  return (
    <div className={wrapperClass} style={style}>
      <div className="px-[24px]">
        <div>Text</div>
        <div className="font-bold text-[32px]">
          {format(calendarDate, 'MMM, yyyy')}
        </div>
      </div>
      <div className="flex justify-between items-center py-3 w-full">
        <button className={arrowBtnClass} onClick={toPrev}>
          <IconChevronLeft />
        </button>
        <button onClick={handleBarBtnClick}>
          {renderBarText(calendarDate, mode)}
        </button>
        <button className={arrowBtnClass} onClick={toNext}>
          <IconChevronRight />
        </button>
      </div>
      {renderCells()}
      <div className="flex justify-end">
        <button className="px-4 py-4" onClick={cancel}>Cancel</button>
        <button className="px-10 py-4" onClick={onConfirmBtnClick}>OK</button>
      </div>
    </div>
  );
}

export default DateMenu;
