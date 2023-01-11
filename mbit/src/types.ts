export interface QuestionType {
  pk: number,
  content: string
}

export interface AnswerType {
  pk: number,
  content: string,
  developer: number,
  question: number
}