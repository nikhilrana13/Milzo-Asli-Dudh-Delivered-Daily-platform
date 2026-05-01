import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Vendors from './pages/Vendors';

const App = () => {
  return (
    <>
     <div className='w-full'>
      {/* routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/vendors' element={<Vendors />} /> 

      </Routes>
      
    </div>
    </>
   
  );
}

export default App;
