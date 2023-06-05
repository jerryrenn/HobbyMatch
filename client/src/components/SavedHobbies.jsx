import React, { useState, useEffect } from "react";
import axios from 'axios';
import SavedHobbiesEntry from './SavedHobbiesEntry';


const SavedHobbies = () => {
  {/* grab prop, and then map through prop, and display in SavedHobbiesEntry */}
  const [hobbies, setHobbies] = useState([]);

  useEffect(() => {
    grabHobbies()
  }, [])

  const grabHobbies = async () => {
    try {
      const response = await axios.get("http://localhost:3000/hobby");
      setHobbies(response.data);
    } catch (error) {
      console.error("Error retrieving hobbies:", error);
    }
  };

  return (
    <div>
      {hobbies.map((hobby) => <SavedHobbiesEntry hobby={hobby}/>)}
    </div>

  );
};

export default SavedHobbies;