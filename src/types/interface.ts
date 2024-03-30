export interface User {
  _id: string
  avatar: string
  email: string
  firstName: string
  lastName: string
}
export interface UserLoginBody {
  email: string
  password: string
}

export interface UserLoginResponse {
  data: {
    status: string
    user: User
  }
}
export interface UserResponse {
  data: User
}
export interface UserLoginAction {
  (data: UserLoginBody): UserLoginResponse
}

export interface GetUserBody {
  page: number
  per_page: number
}
export interface AddUserPayload {
  first_name: string
  last_name: string
  email: string
}
