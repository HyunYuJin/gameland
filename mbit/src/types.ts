export interface QuestionType {
  pk: number,
  content: string
  answers: AnswerType[]
}

export interface AnswerType {
  pk: number,
  content: string,
  developer: number,
  question: number
}