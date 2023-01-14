import { useState, useRef, useEffect, ChangeEvent } from 'react'
import styled from 'styled-components'
import { QuestionType, AnswerType } from '../types'
import { classes } from '@gameland/shared'
import data from '../datas/data.json'

function Question () {
  const { questions, answers } = data
  const [params, setParams] = useState(1)
  const form = useRef(null)
  const [mbits, setMbits] = useState<QuestionType[]>([])
  const [selected, setSelected] = useState<boolean>(false)
  
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

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event

    if (target) {
      setSelected(true)
    }
  }

  const onIncrease = () => {
    if (selected) {
      setParams(params => params + 1)
      setSelected(false)
    } else {
      return
    }
  }

  const onDecrease = () => {
    setSelected(true)
    setParams(params => params - 1)
  }
  
  useEffect(() => {
    getData()
  }, [])

  return (
    <Wrapper ref={form}>
      {mbits && mbits.map(mbit => (
        <Form key={mbit.pk} className={classes({current: mbit.pk === params})} data-index={mbit.pk}>
          <Pk>Q{mbit.pk}. {mbit.content}</Pk>
          <Answers>
            {mbit.answers && mbit.answers.map((answer, index) => (
              <Answer key={answer.content}>
                <input type="radio" id={`answer-${answer.pk}`} name={mbit.content} value={answer.content} onChange={onChange} />
                <Content htmlFor={`answer-${answer.pk}`} pk={index + 1}>{answer.content}</Content>
              </Answer>
            ))}
          </Answers>
        </Form>
      ))}

      <Buttons>
        <Prev onClick={onDecrease}>이전</Prev>
        <Next onClick={onIncrease}>다음</Next>
      </Buttons>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 300px;
  min-width: 280px;
  margin: 0 auto;
  padding: 45px;
`

const Form = styled.div`
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
`

const Prev = styled.button`
  width: 100px;
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
`

const Next = styled.button`
  width: 100px;
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
`

export default Question