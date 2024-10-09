export interface ILogin {
  username: string,
  password: string
}

export interface ILoginResponse {
  user:IUserData,
  token:string
}
export interface IUserData{
  _id: string
  fullName: string,
  username: string,
  role: string
}
export interface IBillByCustomer{
  billAmount: number[],
  billDate: string[],
}
