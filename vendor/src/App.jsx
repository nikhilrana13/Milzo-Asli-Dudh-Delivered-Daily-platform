import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <div className='w-full'>
      {/* routes */}
      <Routes>
        <Route path='/' element={<HomePage />} />
         
      </Routes>
    </div>
  );
}

export default App;
