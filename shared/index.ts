export interface User {
  firstName: string,
  lastName: string,
  email: string,
  isAdmin: Boolean
}

export function greetUser (user: User) {
  alert(`
    안녕하세요, ${user.firstName} ${user.lastName}!
    당신은 ${user.isAdmin ? '관리자 입니다.' : '일반 사용자 입니다.'}
  `)
}