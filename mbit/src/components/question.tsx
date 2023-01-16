import { useState, useRef, useEffect, ChangeEvent } from 'react'
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import { QuestionType, AnswerType } from '../types'
import { classes } from '@gameland/shared'
import data from '../datas/data.json'

function Question () {
  const navigate = useNavigate()
  const { questions, answers } = data
  const [params, setParams] = useState(1)
  const form = useRef(null)
  const [mbits, setMbits] = useState<QuestionType[]>([])
  const [selecteds, setSelecteds] = useState<number[]>([])
  const [select, setSelect] = useState<boolean>(false)
  
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

  const onChange = (event: ChangeEvent<HTMLInputElement>, pk: number): void => {
    const { target } = event

    if (target) {
      setSelecteds([...selecteds, pk])
      setSelect(true)
    }
  }

  const onIncrease = () => {
    if (select) {
      setParams(params => params + 1)
      setSelect(false)
    } else {
      return
    }
  }

  const onDecrease = () => {
    setSelect(true)
    setParams(params => params - 1)
  }

  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('Test', 'test')

    await fetch('http://localhost:3000/submit', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: formData
    })
    .then(response => {
      response.json()
      navigate('/result')
    })
    .catch((err) => {
      console.error(err)
    })
  }
  
  useEffect(() => {
    getData()
  }, [])

  return (
    <Form ref={form} onSubmit={onSubmit} action="" id="question-form" method="post">
      {mbits && mbits.map(mbit => (
        <Wrapper key={mbit.pk} className={classes({current: mbit.pk === params})} data-index={mbit.pk}>
          <Pk>Q{mbit.pk}. {mbit.content}</Pk>
          <Answers>
            {mbit.answers && mbit.answers.map((answer, index) => (
              <Answer key={answer.content}>
                <input type="radio" id={`answer-${answer.pk}`} name={`question-${mbit.content}`} value={answer.developer} onChange={($event) => onChange($event, answer.pk)} />
                <Content htmlFor={`answer-${answer.pk}`} pk={index + 1}>{answer.content}</Content>
              </Answer>
            ))}
          </Answers>
        </Wrapper>
      ))}
      <Buttons>
        {params !== 1 && <Prev type="button" onClick={onDecrease}>이전</Prev>}
        {params <= mbits.length ? <Next type="button" onClick={onIncrease}>다음</Next>
        : <Next type="submit">검사 결과</Next>}
      </Buttons>
    </Form>
  )
}

const Form = styled.form`
  max-width: 300px;
  min-width: 280px;
  margin: 0 auto;
  padding: 45px;
`

const Wrapper = styled.div`
  display: none;

  &.current {
    display: block;
  }
`

const Pk = styled.h3`
  font-weight: 900;
  font-size: 18px;
  line-height: 26px;
  display: flex;
  align-items: center;
  color: #000000;
`

const Answers = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 30px;
`

const Answer = styled.li``

const Content = styled.label<{pk: number}>`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  color: #000000;
  
  &::before {
    content: '${props => props.pk}. ';
    padding-left: 8px;
  }
`

const Buttons = styled.div`
  padding-top: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 100px;
`

const Prev = styled.button`
  flex-basis: 100px;
  height: 40px;
  background-color: #FFFFFF;
  color: var(--primary);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  border: 1.5px solid #191919;
  border-radius: 10px;
  font-weight: 900;
  font-size: 16px;
  line-height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`

const Next = styled.button`
  flex-basis: 100px;
  height: 40px;
  background-color: #FFFFFF;
  color: var(--primary);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  border: 1.5px solid #191919;
  border-radius: 10px;
  font-weight: 900;
  font-size: 16px;
  line-height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`

export default Question