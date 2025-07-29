import React, {  useContext, useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { format } from 'date-fns';
import {motion} from "framer-motion";
import { JournalContext } from '../context/JournalContext';
import { Trash, Edit, PlusSquareIcon } from 'lucide-react';

const JournalsPage = ({createJournal, setCreateJournal, setJournalId}) => {

    const [journalsList, setJournalsList] = useState(null);
    const [journalsListonDate, setJournalsListonDate] = useState(null);
    
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

    const getJournalsOnDate = async () => {
      try{
        const dateObj = new Date(date);
        const pad = (n) => n.toString().padStart(2, "0");
        const formattedDate = `${pad(dateObj.getDate())}-${pad(dateObj.getMonth() + 1)}-${dateObj.getFullYear()}`;

        const res = await axios.get(`http://localhost:5000/api/journals/${user.id}/${formattedDate}`);
        setJournalsList(res.data);
        console.log(`These are the journals written on date: ${date} : ${res.data}`);
      }
      catch(error){
        console.error(`Error fetching journals on date: ${date}: `, error);
      }
    };

    const deleteJournal = async(journalId) => {
      try{
        const res = await axios.delete(`http://localhost:5000/api/journals/${journalId}`);
        setJournalsList((prev) => prev.filter((journal) => journal._id !== journalId));

        console.log("Journal dleeted successfully!");
      }
      catch(error){
        console.error(`Error deleting journal: `, error);
      }
    };

    useEffect(() => {
        getJournals();
        
    }, []);
    
  return (
    <div className='flex flex-col h-full w-full bg-[#a9cfe0]'>
      
        
        {/*(journalsList && journalsList.length !== 0) ? <div>We have some journals</div> : <div>Sorry, no journals to show</div> */}
        {(!createJournal) && (!journalsList || journalsList.length === 0) ? (
          <div className='flex flex-col w-full justify-center items-center'>
            <p>You dont have any journals.</p>
            <button className='p-[20px]' onClick={() => setCreateJournal(true)} >Create a new journal</button>
          </div>
          ) : (
          <div className='flex flex-col'>
            <PlusSquareIcon onClick={() => {
              console.log(date);
              setCreateJournal(true);}} className='rounded-[5px] h-[32px] w-[32px] m-[10px] bg-[white] place-self-end cursor-pointer ' />
            
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[50px]'>
              {journalsList.map((journal, journalIndex) => {
                return(
                  <motion.div
                   initial={{opacity: 0, x: -10}}
                   whileInView={{opacity: 1, x: 0}}
                   whileHover={{x: 5, scale: 1.05}}
                   transition={{duration: 0.3}}
                   viewport={{once: true, amount: 0.4}}  key={journalIndex}
                   className='flex flex-col jsutify-between rounded-[20px] items-start text-[white] bg-[#606f69] m-[5px] w-[30%] p-[10px] h-full cursor-pointer '>
                    <div className='flex w-full justify-between'>
                      <Trash onClick={() =>{
                         deleteJournal(journal._id);
                         getJournals();
                         }} className='  mb-[10px] hover:shadow-[0px_0px_5px_rgba(0,0,0,0.5)] ' />
                      <Edit onClick={() => setJournalId(journal._id)} className=' mb-[10px] hover:shadow-[0px_0px_5px_rgba(0,0,0,0.5)] ' />
                    </div>
                    
                    <div className='flex flex-col justify-around items-start'>
                      <p className='m-[0px]'>{`${journal.date} ${journal.time}`}</p>
                      <p className='m-[0px]'><span>Title: </span>{journal.title}</p>
                      <p className='m-[0px]'>{journal.journal}</p>
                    </div>
                    
                    
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) }
        
    </div>
  )
}

export default JournalsPage