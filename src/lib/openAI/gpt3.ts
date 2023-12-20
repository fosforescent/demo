/* eslint camelcase: 0 */
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function (goalAndContext: any, taskDescription: any) {
  if (!configuration.apiKey) {
    console.error({
      error: {
        message: 'OpenAI API key not configured, please follow instructions in README.md',
      },
    })
    throw new Error('OpenAI API key not configured, please follow instructions in README.md')
  }

  const nullCheckedPrompt = taskDescription || ''
  if (nullCheckedPrompt.trim().length === 0) {
    console.error({
      error: {
        message: 'Please enter a valid prompt',
      },
    })
    throw new Error('Please enter a valid prompt')
  }

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(goalAndContext, taskDescription),
      temperature: 0.6,
      max_tokens: 1000,
    })
    return completion
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
      console.error({
        error: {
          message: 'An error occurred during your request.',
        },
      })
    }
    throw new Error('An error occurred during your request.')
  }
}

function generatePrompt(summary: any, prompt: any) {
  return `Given this goal and context: ${summary}\ngenerate a json document representing a dependency tree for the subtasks of this task: ${prompt}, where the task keys are "description", "requirements" and "subtasks", and it is the same for each subtask as well please ONLY output a parseable JSON document`
}
