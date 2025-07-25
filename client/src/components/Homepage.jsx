import React from 'react'
import CalendarSpace from '../pages/CalendarSpace'
import JournalSpace from '../pages/JournalSpace'

const Homepage = () => {
  return (
    <div className='w-full min-h-screen'>
        <div className='flex '>
            <CalendarSpace />
            <JournalSpace />
        </div>
        
    </div>
  )
}

export default Homepage