require('dotenv').config();
const { OpenAIApi, Configuration } = require('openai');
const {getHobbiesFromDB, saveHobbyToDB, deleteHobbyFromDB} = require('../models/models.js');

const configuration = new Configuration({
  organization: process.env.ORGANIZATION,
  apiKey: process.env.PAT,
});

const openai = new OpenAIApi(configuration);


module.exports = {

  generateHobby: async (req, res) => {
    console.log('generateHobby initiated...', req.body);
    const { budget, activityLevel, availableTime, indoorOutdoor, participants, type, considerations} = req.body;

    let messages = [
      { role: 'system', content: 'You are an article writer, that generates interesting and unqiue hobbies based on user preferences' },
      { role: 'user', content: `I need you to generate a random hobby based on my preferences, it can be literally any hobby you can think of. Be creative! I have a budget of ${budget} & "${availableTime} a week. I am ${activityLevel}.  I want the recommendation to be an ${indoorOutdoor} activity. The activity should include ${participants} participants and should be ${type}. Other considerations include ${considerations}. Don't be boring and recommend rock climbing or gardening, think outside the box! I want the response to be comprised of a title and 2 paragraphs, each separated by paragraph indentations. Start your response with just the hobby as a title with a colon after it. Indent a paragraph, and then in a paragraph below, give a 4 sentence introduction of the hobby. Indent another paragraph, and then in another paragraph below, write me 4 sentences on how to get started with the hobby. There should be 3 line separations, please include \n for the line separations."` },
    ];

    try {
      if (req.body.message) {
        messages.push({ role: 'user', content: req.body.message });
      }
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 1.0,
        max_tokens: 400,
      });
      const response = completion.data.choices[0].message.content;
      res.json({ result: response });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  getHobbies: async (req, res) => {
    const { uid } = req.params;
    try {
      const hobbies = await getHobbiesFromDB(uid);
      res.status(200).json(hobbies);
    } catch (error) {
      console.error('Error retrieving hobbies from controllers:', error);
      res.status(500).json({ error: 'Failed to retrieve hobbies' });
    }
  },

  saveHobby: async (req, res) => {
    try {
      await saveHobbyToDB(req.body);

      res.status(200).json({ message: 'Hobby saved successfully' });
    } catch (error) {
      console.error('Error saving hobby:', error);
      res.status(500).json({ error: 'Failed to save hobby from controller' });
    }
  },

  deleteHobby: async (req, res) => {
    const { uid, title } = req.params;

    try {
      await deleteHobbyFromDB(uid, title);
      res.status(200).send('Hobby deleted successfully');
    } catch (error) {
      console.error('Error deleting hobby from controller:', error);
      res.status(500).send('Failed to delete hobby');
    }
  }
}
