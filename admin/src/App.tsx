import { User, greetUser } from '@gameland/shared'

function App () {
  const user: User = {
    firstName: '관리자',
    lastName: '김뽀삐',
    email: 'adminuser@test.com',
    isAdmin: true
  }

  const onGreetClicked = () => {
    greetUser(user)
  }

  return (
    <div className="App">
      <h1>관리자 페이지</h1>
      <button onClick={onGreetClicked}>관리자에게 인사!</button>
    </div>
  )
}

export default App
