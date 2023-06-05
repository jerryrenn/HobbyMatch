import React, { useState, useEffect } from "react";


const SavedHobbiesEntry = ({hobby}) => {

  return (
    <div>
      {hobby.title}
      {hobby.description}
    </div>
  );
};

export default SavedHobbiesEntry;
