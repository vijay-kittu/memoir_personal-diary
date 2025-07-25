import { set } from 'date-fns';
import React, {createContext, useContext, useState} from 'react'

export const JournalContext = createContext();

export const JournalProvider = ({children}) => {
    const [date, setDate] = useState(null);
    const [time, setTime] = useState('00:00');

  const handleDate = (date) => {
    setDate(date);
    console.log('Selected date:', date);
  };

  const handleTime = (time) => {
    setTime(time);
    console.log('Selected time:', time);
  };

  
const getCombinedDateTime = (date, time) => {
  if (!date || !time) return null;

  const [hours, minutes] = time.split(':').map(Number);

  const combined = set(date, {
    hours,
    minutes,
    seconds: 0,
    milliseconds: 0,
  });

  return combined;
};



  return (
    <JournalContext.Provider value={{date, time, handleDate, handleTime, getCombinedDateTime}}>
      {children}
    </JournalContext.Provider>
  )
}

export const useJournalContext = () => {
    return useContext(JournalContext);
}