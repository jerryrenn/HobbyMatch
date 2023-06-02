require('dotenv').config();
const { OpenAIApi, Configuration } = require('openai');

const configuration = new Configuration({
  organization: 'org-JJSozU3BIZWcitrWaAKfRcbl',
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

module.exports = {

  getHobby: async (req, res) => {
    try {
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: 'hello world' }
        ]
      });
      console.log(completion.data.choices[0].message);
      res.json({ completion: completion.data.choices[0].message });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
}