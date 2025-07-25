import React, {useState} from 'react'
import JournalsPage from './JournalsPage';

const JournalSpace = () => {
    const [journal, setJournal] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = async () => {
        try{
            console.log('Journal saved:', journal);
            await axios.post("/api/journals/:date/:journalId", {journal});
            setJournal(''); // Clear the journal input after saving
        }
        catch(error){
            console.error('Error saving journal:', error);
            alert('Failed to save journal. Please try again.');
        }   
    };

    const handleButtonClick = () => {
        setIsEditing(!isEditing);         
    };
  return (
    
        <div className='w-[65%] flex flex-col justify-end items-center bg-[#606f69] rounded-[10px] m-[5px] '>
            <JournalsPage />
             {/* Area that shows existing text(if any) along with an edit button, if not, there will only be a text box*/}
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
        </div>
  )
}

export default JournalSpace