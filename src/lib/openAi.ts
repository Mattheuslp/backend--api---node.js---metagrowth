import OpenAI from "openai";
import {env} from '../env'

export const openAi = new OpenAI({ apiKey: env.OPENAI_API_KEY });