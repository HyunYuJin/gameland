import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { QuestionType, AnswerType } from '../types/type'
import data from '../datas/data.json'

function Question () {
  let { questionId } = useParams()
  // let configure = useRef<AnswerType[]>([])

  const getData = () => {
    const { questions, answers } = data

    questions.forEach((question) => {
      const configure: any = []
      answers.forEach((answer) => {
        if (question.pk === answer.question) {
          configure.push(answer)
        }
      })
      initQuestion(question, configure)
    })

  }

  const initQuestion = (question: QuestionType, configure: AnswerType) => {
    const questionItem = document.createElement('div')

    questionItem.innerHTML = `
      <div class="status-box">
        <span> ${question.pk}/10 </span>
        <div class="status-bar"></div>
      </div>
    `

    document.querySelector('#question')?.appendChild(questionItem)
  }


  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="question" id="question">
      <>
        
      </>
    </div>
  )
}

export default Question
