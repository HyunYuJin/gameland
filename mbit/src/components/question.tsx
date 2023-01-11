import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { QuestionType, AnswerType } from '../types/type'
import data from '../datas/data.json'

function Question () {
  let { questionId } = useParams()
  const { questions, answers } = data
  const mbitList: QuestionType[] = []

  const getData = () => {
    questions.forEach((question) => {
      const answerArray:AnswerType[] = []
      answers.forEach((answer) => {
        if (question.pk === answer.question) {
          answerArray.push(answer)
        }
      })
      mbitList.push(Object.assign(question, {
        answers: answerArray
      }))
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="question" id="question">
      <div className="question-form" data-index={questionId}>
        {
          mbitList.map(mbit => (<h3>Q{mbit.pk}. {mbit.content}</h3>))
        }
      </div>
    </div>
  )
}

export default Question
