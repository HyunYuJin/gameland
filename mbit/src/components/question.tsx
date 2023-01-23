import { useState, useEffect, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
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
    
    await fetch('http://localhost:3000/submit', {
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
        <Current>{params} / 10</Current>
        <Progress status={params}></Progress>
      </Status>

      <Form onSubmit={onSubmit} action="" id="question-form" method="post">
        {mbits && mbits.map(mbit => (
          <Question key={mbit.pk} className={classes({current: mbit.pk === params})} data-index={mbit.pk}>
            <Pk>Q{mbit.pk}. {mbit.content}</Pk>
            <Answers>
              {mbit.answers && mbit.answers.map((answer, index) => (
                <Answer key={answer.content}>
                  <input type="radio" id={`answer-${answer.pk}`} name={`question-${mbit.pk}`} value={answer.developer} onChange={($event) => onChange($event, index)} />
                  <Content htmlFor={`answer-${answer.pk}`} pk={index + 1}>{answer.content}</Content>
                </Answer>
              ))}
            </Answers>
          </Question>
        ))}

        <Buttons>
          {params !== 1 && <Prev type="button" onClick={onDecrease}>이전</Prev>}
          {params !== mbits.length ? <Next type="button" onClick={onIncrease}>다음</Next>
          : <Next type="submit">검사 결과</Next>}
        </Buttons>
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 300px;
  min-width: 280px;
  margin: 0 auto;
  padding: 0 45px;
`

const Status = styled.div`
  margin-bottom: 40px;
`

const Current = styled.span`
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  color: var(--primary);
`

const Progress = styled.div<{status: number}>`
  width: 100%;
  height: 6px;
  background-color: #FFF;

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

export default Questions