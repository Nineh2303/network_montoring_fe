export interface ApiResponse<T> {
  error: boolean,
  msg: string,
  object?: T  ;
}


export interface IActionResponse{
  error: boolean,
  message : string
}