import { set } from 'date-fns';
import React, {createContext, useContext, useState} from 'react'



export const JournalContext = createContext();

export const JournalProvider = ({children}) => {
    const [date, setDate] = useState(null);
    const [time, setTime] = useState('00:00');
    const [dateTime, setDateTime] = useState("");

  const handleDate = (date) => {
    setDate(date);
    console.log('Selected date:', date);
  };

  const handleTime = (time) => {
    setTime(time);
    console.log('Selected time:', time);
  };

  const handleDateTime = (dateTime) => {
    setDateTime(dateTime);
  }

  return (
    <JournalContext.Provider value={{date, time, handleDate, handleTime, dateTime, handleDateTime}}>
      {children}
    </JournalContext.Provider>
  )
}

export const useJournalContext = () => {
    return useContext(JournalContext);
}