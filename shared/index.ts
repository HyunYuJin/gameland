export interface User {
  firstName: string,
  lastName: string,
  todayGame: string
}

export function greetUser (user: User) {
  return (`
    안녕하세요, ${user.firstName} ${user.lastName} 친구님!
    오늘은 즐거운 ${user.todayGame} 게임 해볼까요?
  `)
}