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

export function classes (props: any, classes = '') {
  return Object.entries(props)
      .filter((entry) => entry[1])
      .map((entry) => entry[0])
      .join(' ')
      .concat(' ')
      .concat(classes)
      .trim()
}