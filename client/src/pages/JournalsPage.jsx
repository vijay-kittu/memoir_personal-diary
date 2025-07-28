import React, {  useContext, useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { format } from 'date-fns';

import { JournalContext } from '../context/JournalContext';
import { PlusSquareIcon } from 'lucide-react';

const JournalsPage = ({openEditor, setOpenEditor}) => {

    const [journalsList, setJournalsList] = useState(null);
    const {user} = useContext(AuthContext);
    const {date} = useContext(JournalContext);
    

    const getJournals = async () => {
      try{
        const res = await axios.get(`http://localhost:5000/api/journals/${user.id}`);
        setJournalsList(res.data);
        console.log("These are the journals: ", res.data);
      }
      catch(error){
        console.error("Error fetching journals:", error);
      }
    };

    useEffect(() => {
        getJournals();
        
    }, []);
    
  return (
    <div className='flex flex-col h-full w-full bg-[#a9cfe0]'>
      
        
        {/*(journalsList && journalsList.length !== 0) ? <div>We have some journals</div> : <div>Sorry, no journals to show</div> */}
        {(!openEditor) && (!journalsList || journalsList.length === 0) ? (
          <div className='flex flex-col w-full justify-center items-center'>
            <p>You dont have any journals to show on this day.</p>
            <button className='p-[20px]' onClick={() => setOpenEditor(true)} >Create a new journal</button>
          </div>
          ) : (
          <div className='flex flex-col'>
            <PlusSquareIcon onClick={() => {
              console.log(date);
              setOpenEditor(true);}} className='rounded-[5px] h-[32px] w-[32px] m-[10px] bg-[white] place-self-end ' />
            
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[50px]'>
              {journalsList.map((journal, journalIndex) => {
                return(
                  <div key={journalIndex} className='flex flex-col rounded-[20px] items-start text-[white] bg-[#606f69] m-[5px] w-fit p-[20px] h-full '>
                    <p className='m-[0px]'>{format(new Date(journal.dateTime), "dd-MM-yyyy HH:mm")}</p>
                    <p className='m-[0px]'><span>Title: </span>{journal.title}</p>
                    <p className='m-[0px]'>{journal.journal}</p>
                    
                  </div>
                );
              })}
            </div>
          </div>
        ) }
        
    </div>
  )
}

export default JournalsPage