import React, { useContext, useState } from 'react'
import { JournalContext } from '../context/JournalContext';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const NewJournal = ({openEditor, setOpenEditor}) => {
    const [title, setTitle] = useState('');
    const [journal, setJournal] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [time, setTime] = useState('00:00');

    const {date, getCombinedDateTime} = useContext(JournalContext);
    const {user} = useContext(AuthContext);


    const handleSave = async () => {
        try{
            const dateTime = getCombinedDateTime(date, time);
            if(!user){
                return alert("No user!");
                
            }
            console.log(dateTime, title, journal);
            const response = await axios.post(`http://localhost:5000/api/journals/${user.id}`, {
                title:title,
                journal: journal,
                dateTime: dateTime,
                
            });
            if(response.data){
                alert("Journal saved!");
                setJournal(''); 
                setOpenEditor(false);
            }
            
            
        }
        catch(error){
            console.error('Error saving journal:', error);
            alert('Failed to save journal. Please try again.');
        }   
    };

    /*const handleEdit = async () => {
        try{
            const getResponse = await axios.get(`/api/journals/${userId}/${dateTime}`);
            if(getResponse){
                const postResponse = await axios.patch(`/api/journals/${getResponse.id}`, {title, journal, dateTime});
                if(postResponse.data){
                    alert("Journal edited successfully!");
                }
            }
            
        }
        catch(error){
            console.error('Error editing journal:', error);
            alert('Failed to edit journal. Please try again.');
        }
    };*/

    const handleButtonClick = () => {
        setIsEditing(!isEditing);
                
    };
  return (
    <div className='w-full h-full flex flex-col relative items-center justify-end '>
        {!date && <div className='w-full h-full flex items-center justify-center rounded-[10px] opacity-50 absolute z-[10] bg-[white] text-[black] '>Select date</div>}
        <div className='flex w-[90%] justify-between items-center'>
            <input value={title} type='text' placeholder="Title" onChange={(event) => setTitle(event.target.value)} className='w-full text-[white] bg-transparent shadow-[0px_0px_10px_rgba(0,0,0,0.5)] border-0 focus:outline-none py-[5px] mb-[5px] mr-[5px]' />
            <input type="time" value={time} onChange={(event) => setTime(event.target.value)} className='p-[3px]  mb-[5px] rounded-[10px] bg-transparent text-[white] ' />
        </div>
        
             {/* Area that shows existing text(if any) along with an edit button, if not, there will only be a text box*/}
            <textarea onChange={(event) => setJournal(event.target.value)} placeholder="What's on your mind today?" rows={25} className='w-[90%] text-[black] rounded-[5px] focus:outline-none resize-none ' />
            <div className='w-[90%] flex justify-end  my-[10px]'>
                <button type='submit' onClick={() => {
                    /*if(isEditing) {
                        handleSave();
                        setOpenEditor(false);
                    }
                    handleButtonClick();*/
                    handleSave();
                }} className='h-[30px] w-[70px] rounded-[5px] border-transparent cursor-pointer'>
                    Save
                </button>
            </div>
    </div>
  )
}

export default NewJournal