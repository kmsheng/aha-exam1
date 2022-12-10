import React, {useState} from 'react';
import PasswordInput from '@/components/PasswordInput';
import PasswordHintMenu from '@/components/PasswordHintMenu';
import {getPasswordHints} from '@/consts/password';

function PasswordInputContainer() {
  const [password, setPassword] = useState('');
  const validations = getPasswordHints(password);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  return (
    <div>
      <PasswordInput value={password} onChange={handleInputChange} />
      <PasswordHintMenu className="mt-5" validations={validations} />
    </div>
  );
}

export default PasswordInputContainer;
