require('dotenv').config();
const { OpenAIApi, Configuration } = require('openai');
const {getHobbiesFromDB} = require('../models/models.js');

const configuration = new Configuration({
  organization: process.env.ORGANIZATION,
  apiKey: process.env.PAT,
});

const openai = new OpenAIApi(configuration);


module.exports = {

  generateHobby: async (req, res) => {
    console.log('generateHobby initiated...');
    const { budget, activityLevel, availableTime, indoorOutdoor, participants, type} = req.body;

    let messages = [
      { role: 'system', content: 'You are an article writer, that generates interesting and unqiue hobbies based on user preferences' },
      { role: 'user', content: `I need you to generate a random hobby based on my preferences, it can be literally any hobby you can think of. Be creative! I have a budget of ${budget} & "${availableTime} a week. I am ${activityLevel}.  I want the recommendation to be an ${indoorOutdoor} activity. The activity should include ${participants} participants and should be ${type}. Don't be boring and recommend rock climbing or gardening, think outside the box! Start your response the hobby as a title with a colon after it. In a paragraph below, give a 4 sentence introduction of the hobby. In another paragraph, write me 4 sentences on how to get started with the hobby. There should be 3 line separations, please include \n for the line separations."` },
    ];

    try {
      if (req.body.message) {
        messages.push({ role: 'user', content: req.body.message });
      }
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 1.0,
        max_tokens: 200,
      });
      const response = completion.data.choices[0].message.content;
      res.json({ result: response });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  getHobbies: async (req, res) => {
    try {
      const hobbies = await getHobbiesFromDB();
      res.status(200).json(hobbies);
    } catch (error) {
      console.error('Error retrieving hobbies:', error);
      res.status(500).json({ error: 'Failed to retrieve hobbies' });
    }
  }
}
