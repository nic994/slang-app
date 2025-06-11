export interface SlangWordsEntry {
  word: string;
  meaning: string;
  example: string;
}
export interface SlangWordsResponse {
  statusCode: number;
  term: string;
  found: boolean;
  data: SlangWordsEntry[];
}
