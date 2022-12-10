import React, {useState} from 'react';
import PasswordInput from '@/components/PasswordInput';
import {getPasswordHints} from '@/consts/password';

function PasswordInputContainer() {
  const [password, setPassword] = useState('');
  const validations = getPasswordHints(password);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  return (
    <div>
      <PasswordInput value={password} validations={validations}
        onChange={handleInputChange} />
    </div>
  );
}

export default PasswordInputContainer;
