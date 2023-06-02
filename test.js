const { OpenAIApi, Configuration } = require('openai');

const configuration = new Configuration({
  organization: 'org-JJSozU3BIZWcitrWaAKfRcbl',
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

async function performChatCompletion() {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'user', content: 'hello world' }
    ]
  });
  console.log(completion.data.choices[0].message);
}

performChatCompletion();