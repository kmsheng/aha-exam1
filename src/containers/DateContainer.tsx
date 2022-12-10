import {useState} from 'react';
import DateInput from '@/components/DateInput';

type Props = {
  className?: string;
}

function DateContainer({className}: Props) {
  const [inputValue, setInputValue] = useState('');
  const onChange = (value: string) => {
    setInputValue(value);
  };
  return (
    <DateInput className={className} onChange={onChange} value={inputValue} />
  );
}

export default DateContainer;
