import React, { useState, useEffect } from "react";
import axios from 'axios';

const Form = ({ uid, grabHobbies }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [budget, setBudget] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [indoorOutdoor, setIndoorOutdoor] = useState("");
  const [participants, setParticipants] = useState("");
  const [type, setType] = useState("");
  const [response, setResponse] = useState("");

  const generateHobby = (userPreferences, message) => {
    return axios.post("http://localhost:3000/hobby", { ...userPreferences, message })
      .then((response) => {
        const result = response.data.result;
        const paragraphs = result.split('\n\n');
        const title = paragraphs[0];
        const firstParagraph = paragraphs[1];
        const secondParagraph = paragraphs[2];
        const newResponse = { title, firstParagraph, secondParagraph };
        setResponse(newResponse);
      })
      .catch((error) => {
        console.error("Error generating hobby:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse("");
    setIsLoading(true);
    const userPreferences = {
      budget,
      activityLevel,
      availableTime,
      indoorOutdoor,
      participants,
      type
    };
    await generateHobby(userPreferences);
    setIsLoading(false);
  };

  const handleRegenClick = async (e) => {
    e.preventDefault();
    setResponse("");
    setIsLoading(true);
    const userPreferences = {
      budget,
      activityLevel,
      availableTime,
      indoorOutdoor,
      participants,
      type
    };

    const newMessage = 'I want a completely different recommendation but still with the same user preferences. The format should be the same. Start your response, the hobby, as a title with a colon after it. In a paragraph below, give a 4 sentence introduction of the hobby. In another paragraph, write me 4 sentences on how to get started with the hobby. There should be 3 line separations, please include \n for the line separations.';

    await generateHobby(userPreferences, newMessage);
    setIsLoading(false);
  }

  const handleResartClick = (e) => {
    e.preventDefault();
    setResponse("");
    setBudget("");
    setActivityLevel("");
    setAvailableTime("");
    setIndoorOutdoor("");
    setParticipants("");
    setType("");
  }

  const handleSaveClick = async (e) => {
    e.preventDefault();
    const description = response.firstParagraph + response.secondParagraph;
    const title = response.title;

    const hobbyData = {
      title: title,
      description: description,
      uid: uid
    };

    try {
      console.log(hobbyData);
      await axios.post('http://localhost:3000/saveHobby', hobbyData);
      grabHobbies(uid);
      // Handle success or any additional logic after successful hobby save
    } catch (error) {
      console.error('Error saving hobby from form.jsx:', error);
      // Handle error or display error message to the user
    }
  };

  return (
    <div className="hobby-form">
      <h1>Choose Hobby Preferences</h1>
      <form onSubmit={handleSubmit}>
        <div className='grid-container'>
          <div className='grid-item'>
            <label>
              <span className='pref-title'>Weekly Budget 💵</span>
              <select required className='dropdown' value={budget} onChange={(e) => setBudget(e.target.value)}>
                <option value="">Select a budget</option>
                <option value="0">$0</option>
                <option value="50">$50</option>
                <option value="100">$100</option>
                <option value="200">$200</option>
                <option value="500">$500</option>
              </select>
            </label>
          </div>

          <div className='grid-item'>
            <label>
              <span className='pref-title'>Activity Level 🏃‍♂️</span>
              <select required className='dropdown' value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
                <option value="">Select your activity level</option>
                <option value="Sedentary">Sedentary</option>
                <option value="Lightly Active">Lightly Active</option>
                <option value="Moderately Active">Moderately Active</option>
                <option value="Very Active">Very Active</option>
              </select>
            </label>
          </div>

          <div className='grid-item'>
            <label>
              <span className='pref-title'>Available Time ⏱️</span>
              <select required className='dropdown' value={availableTime} onChange={(e) => setAvailableTime(e.target.value)}>
                <option value="">Select available weekly time</option>
                <option value="Less than 1 hour">Less than 1 hour</option>
                <option value="1-5 hours">1-5 hours</option>
                <option value="5-10 hours">5-10 hours</option>
                <option value="15-20 hours">15-20 hours</option>
                <option value="20+ hours">20+ hours</option>
              </select>
            </label>
          </div>

          <div className='grid-item'>
            <label>
              <span className='pref-title'>Indoor/Outdoor ☀️</span>
              <select required className='dropdown' value={indoorOutdoor} onChange={(e) => setIndoorOutdoor(e.target.value)}>
                <option value="">Select your preference</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="indoor or outdoor">Both!</option>
              </select>
            </label>
          </div>

          <div className='grid-item'>
            <label>
              <span className='pref-title'>Participants 👪</span>
              <select required className='dropdown' value={participants} onChange={(e) => setParticipants(e.target.value)}>
                <option value="">Select # of participants</option>
                <option value="Solo">Solo</option>
                <option value="2-3">2-3</option>
                <option value="3-4">3-4</option>
                <option value="4+">4+</option>
              </select>
            </label>
          </div>

          <div className='grid-item'>
            <label>
              <span className='pref-title'>Adventurous/Relaxing ⛱️</span>
              <select required className='dropdown' value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Select your preference</option>
                <option value="Relaxing">Relaxing</option>
                <option value="Moderate">Moderate</option>
                <option value="Adventurous">Adventurous</option>
                <option value="relaxing or adventurous">Surprise me</option>
              </select>
            </label>
          </div>

        </div>

        {!response && !isLoading && (
          <button type="submit" className='button'>Generate Hobby!</button>
        )}

      </form>

      {isLoading ? <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> : response && (
        <div className='response'>
          <h3><strong>{response.title}</strong></h3>
          <p>{response.firstParagraph}</p>
          <p>{response.secondParagraph}</p>
          <div className="response-button-container">
            <button onClick={handleRegenClick} className='button'>Regenerate</button>
            <button onClick={handleResartClick} className='button'>Restart</button>
            <button onClick={handleSaveClick} className='button'>Save</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Form;

