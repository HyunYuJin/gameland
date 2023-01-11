import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Intro from './components/intro'
import Question from './components/question'
import Result from './components/result'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />}></Route> 
          <Route path="/questions/:questionId" element={<Question />}></Route> 
          <Route path="/result" element={<Result />}></Route> 
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App