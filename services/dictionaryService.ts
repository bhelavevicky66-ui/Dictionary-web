
import { WordEntry } from '../types';

export const fetchWordData = async (word: string): Promise<WordEntry[]> => {
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Word not found in our database.");
    }
    throw new Error("Failed to fetch word data. Please try again later.");
  }
  
  const data = await response.json();
  return data;
};
