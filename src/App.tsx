import React from 'react';
import PasswordInputContainer from '@/containers/PasswordInputContainer';
import DateContainer from '@/containers/DateContainer';

function App() {
  return (
    <div className="App bg-[#181818]
    text-[#fff] flex justify-center fixed h-screen w-screen p-32">
      <div className="flex">
        <PasswordInputContainer />
        <DateContainer className="ml-20" />
      </div>
    </div>
  );
}

export default App;
