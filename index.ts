import 'dotenv/config'
import { runLLM } from './src/llm'
import { addMessages, getMessages } from './src/memory'
import { runAgent } from './src/agent'
import { z } from 'zod'

const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

const getWeather = {
  name: 'get_weather',
  parameters: z.object({
    
  }),
  
}

const response = await runAgent({
  userMessage, 
  tools: [getWeather]
})

console.log(response);