import styled from 'styled-components'
import { Link } from 'react-router-dom'
import mbit from '../assets/images/mbit.png'

function Intro () {
  return (
    <Wrapper>
      <Logo>나의 MBIT</Logo>
      <Paragraph1>My Best IT personalities</Paragraph1>
      <Paragraph2>“ 나의 개발 유형은⁈ ”</Paragraph2>

      <Image src={mbit} alt="mbit" />
      
      <Button to="/questions" className="start">시작하기</Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 300px;
  min-width: 280px;
  margin: 0 auto;
  padding: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
`

const Logo = styled.h1`
  font-family: 'GmarketSansMedium';
  font-style: normal;
  font-weight: 700;
  font-size: 45px;
  line-height: 45px;
  color: #000000;
`

const Paragraph1 = styled.p`
  padding-top: 10px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: var(--primary);
`

const Paragraph2 = styled.em`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  padding-top: 36px;
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
  height: 52px;
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

export default Intro