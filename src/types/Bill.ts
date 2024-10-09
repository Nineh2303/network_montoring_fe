
export interface ICreateBillRequest {
  customerId: string,
  productId: string,
  paymentDate: Date,
  serviceDescription:any,
  status: string,
  amount: number | null
}

export interface IBillResponse {
  _id: string
  customerId: string,
  productId: string,
  paymentDate: string,
  serviceDescription:any,
  status: string,
  amount: number
}

export interface IGetListBillRequest{
  customerId: string
}