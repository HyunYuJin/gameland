import { useState, useEffect, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { QuestionType, SelectType, AnswerType } from '../types'
import { classes } from '@gameland/shared'
import data from '../datas/data.json'

function Questions () {
  const navigate = useNavigate()
  const { questions, answers } = data
  const [params, setParams] = useState(1)
  const [mbits, setMbits] = useState<QuestionType[]>([])
  const [selectList, setSelectList] = useState<SelectType[]>([])
  const [select, setSelect] = useState<SelectType | null>(null)
  
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

  const onChange = (event: ChangeEvent<HTMLInputElement>, index: number): void => {
    const { target } = event

   setSelect({[target.name]: index + 1})
  }
  
  const onIncrease = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    if (select && Object.keys(select).length) {
      setSelectList([...selectList, select])
      setParams(params => params + 1)
      setSelect(null)

      return
    } else {
      alert('1개 이상 선택하세요!')
      return
    }
  }

  const onDecrease = (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setParams(params => params - 1)
  }

  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    
    await fetch('http://3.90.81.98:3000/submit', {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify([...selectList, select])
    })

    navigate('/result')
  }
  
  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    setSelect(select)
    setSelectList(selectList)
  }, [select, selectList])

  return (
    <Wrapper>
      <Status>
        <Current>{params} of 10</Current>
        <Progress status={params}></Progress>
      </Status>

      <Form onSubmit={onSubmit} action="" id="question-form" method="post">
        {mbits && mbits.map(mbit => (
          <Question key={mbit.pk} className={classes({current: mbit.pk === params})} data-index={mbit.pk}>
            <Pk>Question{mbit.pk}</Pk>
            <Inquiry>{mbit.content}</Inquiry>
            <Answers>
              {mbit.answers && mbit.answers.map((answer, index) => (
                <Answer key={answer.content}>
                  <RadioButton type="radio" id={`answer-${answer.pk}`} name={`question-${mbit.pk}`} value={answer.developer} onChange={($event) => onChange($event, index)} />
                  <Content htmlFor={`answer-${answer.pk}`}>{answer.content}</Content>
                </Answer>
              ))}
            </Answers>
          </Question>
        ))}

        <Buttons>
          {params !== 1 && <Prev type="button" onClick={onDecrease}>Prev</Prev>}
          {params !== mbits.length ? <Next type="button" onClick={onIncrease}>Next</Next>
          : <Next type="submit">검사 결과</Next>}
        </Buttons>
      </Form>
    </Wrapper>
  )
}

const fadeInCheckbox = keyframes` 
  from {
    opacity: 0;
    transform: rotateZ(-20deg);
  }

  to {
    opacity: 1;
    transform: rotateZ(0deg);
  }
`

const Wrapper = styled.div`
  max-width: 400px;
  min-width: 280px;
  margin: 0 auto;
  padding: 0 45px;
  color: var(--dark);
`

const Status = styled.div`
  margin-bottom: 20px;
`

const Current = styled.span`
  font-weight: 500;
  font-size: 12px;
  line-height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`

const Progress = styled.div<{status: number}>`
  width: 100%;
  height: 4px;
  background-color: rgba(0, 0, 0, .07);
  border-radius: 24px;
  overflow: hidden;

  &::before {
    content: '';
    display: block;
    width: calc(${props => props.status} * 10%);
    height: 100%;
    background-color: var(--primary);
    transition: width .3s;
  }
`

const Form = styled.form``

const Question = styled.div`
  display: none;

  &.current {
    display: block;
  }
`

const Pk = styled.h3`
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  display: flex;
  align-items: center;
`

const Inquiry = styled.p`
  font-weight: 500;
  padding-top: 8px;
  font-size: 14px;
`

const Answers = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 20px;
`

const Answer = styled.li`
  padding: 6px 12px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid transparent;
  border-radius: 10px;
  background-color: #FFF;
  color: #333333;
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:has(input[type="radio"]:checked) {
    border: 2px solid var(--primary);
    transition: border 0.3s;

    &::after {
      content: '';
      position: absolute;
      right: 5px;
      top: 5px;
      width: 16px;
      height: 16px;
      background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='32px' height='32px' stroke-width='1.74' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' color='%23719ec9'%3E%3Cpath d='M7 12.5l3 3 7-7' stroke='%23719ec9' stroke-width='1.74' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z' stroke='%23719ec9' stroke-width='1.74' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/svg%3E");
      background-size: contain;
      animation: ${fadeInCheckbox} 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }
`

const Content = styled.label`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 23px;
  width: 100%;
  cursor: pointer;
  padding: 6px 10px 0 0;
`

const RadioButton = styled.input`
  display: none;
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
  background-color: var(--primary);
  color: var(--light);
  box-shadow: var(--box-shadow);
  border: 1px solid var(--primary);
  border-radius: 24px;
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
  background-color: var(--primary);
  color: var(--light);
  box-shadow: var(--box-shadow);
  border: 1px solid var(--primary);
  border-radius: 24px;
  font-weight: 900;
  font-size: 16px;
  line-height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`

export default Questions