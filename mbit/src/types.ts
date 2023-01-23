export interface QuestionType {
  pk: number,
  content: string
  answers: AnswerType[]
}

export interface SelectType {
  [key: string]: number
}

export interface AnswerType {
  pk: number,
  content: string,
  developer: number,
  question: number
}

export interface DevloperType {
  pk: number,
  name: string,
  title: string,
  img: string,
  features: string[]
}