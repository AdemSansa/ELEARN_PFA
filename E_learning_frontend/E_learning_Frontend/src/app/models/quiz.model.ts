
export interface Quiz {
    _id: string;
    subjectId: string;
    title: string;
    duration: number;
    questions: Question[];
  }
  
  export interface Question {
    content: string;
    options: string[];
    correctOption: number;
  }