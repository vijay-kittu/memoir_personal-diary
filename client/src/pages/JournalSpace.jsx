import React, {useContext, useEffect, useState} from 'react'
import JournalsPage from './JournalsPage';
import axios from 'axios';
import { JournalContext } from '../context/JournalContext';
import NewJournal from './NewJournal';
import EditJournal from './EditJournal';
import { AuthContext } from '../context/AuthContext';

const JournalSpace = () => {
    const [createJournal, setCreateJournal] = useState(false);
    const [journalId, setJournalId] = useState('');

    /*const [title, setTitle] = useState('');
    const [journal, setJournal] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const {date, time, getCombinedDateTime} = useContext(JournalContext);


    const handleSave = async () => {
        try{
            const dateTime = getCombinedDateTime(date, time);

            const response = await axios.post(`/api/journals/${dateTime}`, {
                title:title,
                journal: journal,
                
            });
            if(response.data){
                alert("Journal saved!");
            }
            setJournal(''); 
        }
        catch(error){
            console.error('Error saving journal:', error);
            alert('Failed to save journal. Please try again.');
        }   
    };

    const handleEdit = async () => {
        try{
            const response = await axios.patch("/api/journals/", {journal});
            if(response.data){
                alert("Journal edited successfully!");
            }
        }
        catch(error){
            console.error('Error editing journal:', error);
            alert('Failed to edit journal. Please try again.');
        }
    };

    const handleButtonClick = () => {
        setIsEditing(!isEditing);         
    };
    */

    
  return (
    
        <div className='w-[65%] flex flex-col items-center bg-[#606f69] rounded-[10px] m-[5px] '>
            {/*
            <JournalsPage />
            <input value={title} type='text' placeholder="Title" onChange={(event) => setTitle(event.target.value)} className='w-[90%] bg-transparent shadow-[0px_0px_10px_rgba(0,0,0,0.5)] border-0 focus:outline-none py-[5px] mb-[5px] ' />
             {/* Area that shows existing text(if any) along with an edit button, if not, there will only be a text box*}
            <textarea onChange={(event) => setJournal(event.target.value)} disabled={!isEditing} placeholder="What's on your mind today?" rows={25} className={`w-[90%] rounded-[5px] focus:outline-none resize-none ${!isEditing ? 'text-[white]' : ''} `} />
            <div className='w-[90%] flex justify-end  my-[10px]'>
                <button type='submit' onClick={() => {
                    if(isEditing) {
                        handleSave();
                    }
                    handleButtonClick();
                }} className='h-[30px] w-[70px] rounded-[5px] border-transparent cursor-pointer'>
                    {isEditing ? 'Save' : 'Edit'}
                </button>
            </div>
            */}
            {
                createJournal && !journalId ? (
                <NewJournal createJournal={createJournal} setCreateJournal={setCreateJournal} />
                ) : !createJournal && !journalId ? (
                <JournalsPage createJournal={createJournal} setCreateJournal={setCreateJournal} setJournalId={setJournalId} />
                ) : !createJournal && journalId ? (
                <EditJournal journalId={journalId} setJournalId={setJournalId} />
                ) : null
            }
            {/*createJournal ? <NewJournal createJournal={createJournal} setCreateJournal={setCreateJournal} /> : <JournalsPage createJournal={createJournal} setCreateJournal={setCreateJournal} setJournalId={setJournalId} />*/}

        </div>
  )
}

export default JournalSpace