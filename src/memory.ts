import { JSONFilePreset } from "lowdb/node";
import type { AIMessage } from "../types";
import { v4 as uuidv4 } from 'uuid';

export type AIMessageWithMetaData = AIMessage & {
    id: string,
    createdAt: string,
}

export const addMetaData = (message: AIMessage): AIMessageWithMetaData => {
    return {
        ...message,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
    }
}

export const removeMetaData = (message: AIMessageWithMetaData): AIMessage => {
    const { id, createdAt, ...rest} = message;
    return rest;
}

type Data = {
    messages: AIMessageWithMetaData[];
}

const defaultData: Data = { messages: [] }

export const getDb = async () => {
  const db = await JSONFilePreset<Data>('db.json', defaultData)

  return db
}

export const addMessages = async (messages: AIMessage[]) => {
  const db = await getDb()
  db.data.messages.push(...messages.map(addMetaData))
  await db.write()
}

export const getMessages = async (): Promise<AIMessage[]> => {
  const db = await getDb()
  return db.data.messages.map(removeMetaData)
}