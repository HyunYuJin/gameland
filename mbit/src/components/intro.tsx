import { Link } from 'react-router-dom'
import mbit from '../assets/images/mbit.png'

function Intro () {
  return (
    <div className="intro">
      <h1 className="logo">나의 MBIT</h1>
      <p>My Best IT personalities</p>
      <em>" 나의 개발 유형은?! "</em>

      <img src={mbit} alt="mbit" />
      <Link to="/questions/1" className="start">시작하기</Link>
    </div>
  )
}

export default Intro