import React, { useContext, useEffect, useState } from 'react'
import { JournalContext } from '../context/JournalContext';
import axios from 'axios';

const EditJournal = ({journalId, setJournalId}) => {
    const [title, setTitle] = useState('');
    const [journal, setJournal] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const {date, time, handleDate, handleTime, dateTime, handleDateTime, getCombinedDateTime} = useContext(JournalContext);



    const getJournal = async () => {
        try{
            console.log(journalId);
            const response = await axios.get(`http://localhost:5000/api/journals/${journalId}`);
            console.log("There is response!: ", response.data);
            const {journal} = response.data;
            setJournal(journal.journal);
            setTitle(journal.title);
            const date = journal.date;
            const timeWithSeconds = journal.time;
            const dateTime = `${date}T${timeWithSeconds}`;
            handleDateTime(dateTime);
        }
        catch(error){
            console.log("Error fetching the journal: ", error);
        }

    }

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

    useEffect(() => {
        getJournal();
        
    }, []);
  return (
    <div className='w-full h-full flex flex-col items-center justify-end '>
        <div className='flex flex-col items-start h-fit w-[90%]'>
            <input type="datetime-local" onChange={(event) => {
                handleDateTime(event.target.value);
                console.log(dateTime)
                }} value={dateTime} className='bg-transparent border-[0] py-[5px] text-[white] shadow-[0px_0px_10px_rgba(0,0,0,0.5)] ' />
            <input value={title} type='text' placeholder="Title" onChange={(event) => setTitle(event.target.value)} className='w-full bg-transparent shadow-[0px_0px_10px_rgba(0,0,0,0.5)] border-0 focus:outline-none py-[5px] my-[5px] ' />
            
        </div>
        
             {/* Area that shows existing text(if any) along with an edit button, if not, there will only be a text box*/}
            <textarea value={journal} onChange={(event) => setJournal(event.target.value)}  rows={25} className={`w-[90%] rounded-[5px] focus:outline-none resize-none text-[black] `} />
            <div className='w-[90%] flex justify-end  my-[10px]'>
                <button type='submit' onClick={() => {
                    if(isEditing) {
                        handleSave();
                        setOpenEditor(false);
                    }
                    handleButtonClick();
                }} className='h-[30px] w-[70px] rounded-[5px] border-transparent cursor-pointer'>
                    {isEditing ? 'Save' : 'Edit'}
                </button>
            </div>
    </div>
  )
}

export default EditJournal