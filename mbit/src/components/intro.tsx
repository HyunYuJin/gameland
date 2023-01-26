import styled from 'styled-components'
import { Link } from 'react-router-dom'
import mbit from '../assets/images/mbit.png'

function Intro () {
  return (
    <Wrapper>
      <Image src={mbit} alt="mbit" />

      <Paragraph1>My Best IT personalities</Paragraph1>
      <Paragraph2>“ 나의 개발 유형은⁈ ”</Paragraph2>
      <Logo>My MBIT</Logo>
      
      <Button to="/questions" className="start">Start!</Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 400px;
  min-width: 280px;
  margin: 0 auto;
  padding: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
`

const Paragraph1 = styled.p`
  padding-top: 15px;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: var(--primary);
`

const Paragraph2 = styled.em`
  padding-top: 6px;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 23px;
  color: #000000;
`

const Logo = styled.h1`
  padding-top: 24px;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 45px;
  color: #000000;
`

const Image = styled.img`
  padding-top: 36px;
  width: 100%;
  height: 100%;
`

const Button = styled(Link)`
  margin-top: 36px;
  max-width: 300px;
  width: 100%;
  height: 40px;
  background-color: var(--primary);
  color: var(--light);
  box-shadow: var(--box-shadow);
  border: 1px solid var(--primary);
  border-radius: 24px;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Intro