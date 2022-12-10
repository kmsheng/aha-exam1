import React from 'react';
import PasswordInputContainer from '@/containers/PasswordInputContainer';
import CalendarMenu from '@/components/CalendarMenu';

function App() {
  return (
    <div className="App bg-[#181818] text-[#fff]
      min-h-screen flex justify-center items-center">
      <div className="flex">
        <PasswordInputContainer />
        <CalendarMenu className="ml-20" />
      </div>
    </div>
  );
}

export default App;
