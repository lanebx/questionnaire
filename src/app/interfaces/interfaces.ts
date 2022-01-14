export interface DataInfo {
  status: string;
}

export interface Question {
  id: number;
  question: string;
  answered: boolean;
  answer: string | string[];
  type: 'Single' | 'Multiple' | 'Open';
  date: string;
  dateOfAnswer: string;
  answerOptions: string[];
}
