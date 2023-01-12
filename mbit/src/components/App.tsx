import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Intro from './Intro'
import Question from './Question'
import Result from './Result'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />}></Route> 
          <Route path="/questions" element={<Question />}></Route> 
          <Route path="/result" element={<Result />}></Route> 
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App