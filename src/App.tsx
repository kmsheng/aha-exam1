import React from 'react';
import PasswordInputContainer from '@/containers/PasswordInputContainer';
import DateContainer from '@/containers/DateContainer';

function App() {
  return (
    <div className="App bg-[#181818]
    text-[#fff] flex justify-center fixed h-screen w-screen p-10 md:p-32">
      <div className="flex flex-col md:flex-row">
        <PasswordInputContainer />
        <DateContainer className="ml-0 mt-10 md:mt-0 md:ml-20" />
      </div>
    </div>
  );
}

export default App;
