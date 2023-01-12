import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { QuestionType, AnswerType } from '../types'
import { classes } from '@gameland/shared'
import data from '../datas/data.json'

function Question () {
  const [params, setParams] = useState(1)
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

  const onIncrease = () => {
    setParams(params => params + 1)
  }

  const onDecrease = () => {
    setParams(params => params - 1)
  }
  
  useEffect(() => {
    getData()
  }, [])

  return (
    <Wrapper>
      {mbits && mbits.map(mbit => (
        <Form key={mbit.pk} className={classes({current: mbit.pk === params})} data-index={mbit.pk}>
          <Pk>Q{mbit.pk}. {mbit.content}</Pk>
          <Answers>
            {mbit.answers && mbit.answers.map(answer => (
              <Answer key={answer.content}>
                <input type="radio" />
                <Content pk={answer.pk}>{answer.content}</Content>
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

const Content = styled.span<{pk: number}>`
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