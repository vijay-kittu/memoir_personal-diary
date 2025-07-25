import React from 'react'
import Navbar from './Navbar'
import Calendar from '../pages/Calendar';

const CalendarSpace = () => {
  return (
    <div className='w-[35%] h-screen flex flex-col  border-transparent  rounded-[5px] '>
        <Navbar />
        <div className='h-full m-[5px] flex justify-center items-center rounded-[5px] bg-[#a9cfe0]'>
          <div className='w-[70%] h-[80%] bg-[white] rounded-[10px] '>
            <Calendar />
          </div>
        </div>
    </div>
  )
}

export default CalendarSpace