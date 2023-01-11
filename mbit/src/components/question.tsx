import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { QuestionType, AnswerType } from '../types'
import data from '../datas/data.json'

function Question () {
  let { questionId } = useParams()
  const { questions, answers } = data
  const [mbits, setMbits] = useState<QuestionType[]>([])
  
  const getData = () => {
    const mbitList: QuestionType[] = []

    questions.forEach((question) => {
      const answerArray: AnswerType[] = []

      answers.forEach((answer) => {
        if (question.pk === answer.question) {
          answerArray.push(answer)
        }
      })
      mbitList.push(Object.assign(question, {
        answers: answerArray
      }))

      setMbits(mbitList)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="question" id="question">
      <div className="question-form" data-index={questionId}>
        {mbits && mbits.map(mbit => (
          <h3 key={mbit.pk}>Q{mbit.pk}. {mbit.content}</h3>
        ))}
      </div>
    </div>
  )
}

export default Question