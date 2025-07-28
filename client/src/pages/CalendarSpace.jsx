import React from 'react'
import Navbar from './Navbar'
import Calendar from '../pages/Calendar';
import { PlusCircleIcon } from 'lucide-react';

const CalendarSpace = () => {
  return (
    <div className='w-[35%] h-screen flex flex-col  border-transparent  rounded-[5px] '>
        <Navbar />
        <div className='h-full m-[5px] flex flex-col justify-center items-center rounded-[5px] bg-[#a9cfe0]'>
          {/*<div className=' w-[90%] flex justify-end items-end '>
            
          </div>*/}
          <div className='w-[70%] h-[80%] flex flex-col  bg-[white] rounded-[50px] '>
            
            <Calendar />
          </div>
        </div>
    </div>
  )
}

export default CalendarSpace