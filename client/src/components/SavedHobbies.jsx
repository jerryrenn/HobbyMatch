import React, { useState, useEffect } from "react";
import SavedHobbiesEntry from './SavedHobbiesEntry';


const SavedHobbies = ({ uid, hobbies, filterHobbies }) => {

  return (
    <div>
      {hobbies.length === 0 ? (
        <p>Generate and Save a Hobby!</p>
      ) : (
        hobbies.map((hobby, i) => <SavedHobbiesEntry key={i} hobby={hobby} uid={uid} filterHobbies={filterHobbies} />)
      )}
    </div>
  );
};

export default SavedHobbies;