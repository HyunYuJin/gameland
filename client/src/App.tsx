import { User, greetUser } from '@gameland/shared'

function App () {
  const user: User = {
    firstName: '사용자',
    lastName: '이평범',
    email: 'clientuser@test.com',
    isAdmin: false
  }

  const onGreetClicked = () => {
    greetUser(user)
  }

  return (
    <div className="App">
      <h1>사용자 페이지</h1>
      <button onClick={onGreetClicked}>사용자에게 인사!</button>
    </div>
  )
}

export default App