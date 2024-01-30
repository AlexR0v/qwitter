export interface IRegister {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  dateOfBirth: string
  code: string
  isAgree: boolean
}

export interface IRegisterRequest {
  firstName: string
  lastName: string
  email: string
  dateOfBirth: string
}

export interface IRegisterResponse {
  userId: number
  firstName: string
  lastName: string
  email: string
  phone: string | null,
  dateOfBirth: string
  username: string
  enabled: boolean
  authorities: [
    {
      roleId: number
      authority: string
    }
  ]
}