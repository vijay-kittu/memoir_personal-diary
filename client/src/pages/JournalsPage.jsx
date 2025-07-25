import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';

const JournalsPage = () => {

    const [journalsList, setJournalsList] = useState(null);

    const getJournals = async () => {
      try{
        const res = await axios.get("http://localhost:5000/api/journals/");
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
    <div>
        {(journalsList && journalsList.length !== 0) ? <div>We have some journals</div> : <div>Sorry, no journals to show</div> }
    </div>
  )
}

export default JournalsPage