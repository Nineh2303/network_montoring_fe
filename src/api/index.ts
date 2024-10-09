import {IBillByCustomer, ILogin, ILoginResponse, IUserData} from "../types/IUser.ts";
import {ApiResponse} from "../types/Response.ts";
import {useCreateClient} from "../configs/AxiosConfig.ts";
import {IBillResponse, ICreateBillRequest, IGetListBillRequest} from "../types/Bill.ts";


export const LoginApi: (request:ILogin)=> Promise<ApiResponse<ILoginResponse>> =  async (request: ILogin) : Promise<ApiResponse<ILoginResponse>> =>{
  const axiosClient =  useCreateClient();
  const response = await axiosClient.post("/api/v1/user/login", request)
  const responseData:ApiResponse<ILoginResponse> = response.data
  return responseData
}
export const CheckAuthorization: () => Promise<ApiResponse<ILoginResponse>> = async (): Promise<ApiResponse<ILoginResponse>> => {
  const axiosClient =  useCreateClient();

  const response = await axiosClient.post("/api/v1/user/check-auth", {})
  const responseData: ApiResponse<ILoginResponse> = response.data
  return responseData
}

export const CreateBilling:(req:ICreateBillRequest)=>Promise<ApiResponse<IBillResponse>> = async(req:ICreateBillRequest) :  Promise<ApiResponse<IBillResponse>> =>{
  const axiosClient =  useCreateClient();

  const response = await axiosClient.post("/api/v1/bill/create", req)
  const responseData: ApiResponse<IBillResponse> = response.data
  return responseData
}

export const GetAllUser :()=>Promise<ApiResponse<IUserData[]>> = async(): Promise<ApiResponse<IUserData[]>> =>{
  const axiosClient = useCreateClient();
  const response = await axiosClient.get("/api/v1/user/all-user", {})
  const responseData: ApiResponse<IUserData[]> = response.data
  return responseData
}
export const getListAmount :(request: IGetListBillRequest)=>Promise<ApiResponse<IBillByCustomer>> = async(request:IGetListBillRequest):Promise<ApiResponse<IBillByCustomer>> =>{
  const axiosClient = useCreateClient();
  const response = await axiosClient.post("/api/v1/bill/get-by-customer", request)
  const responseData: ApiResponse<IBillByCustomer> = response.data
  return responseData
}
export const getAllBillByUser:(request: IGetListBillRequest)=>Promise<ApiResponse<IBillResponse[]>> =  async(request:IGetListBillRequest):Promise<ApiResponse<IBillResponse[]>> =>{
  const axiosClient = useCreateClient();
  const response = await axiosClient.post("/api/v1/bill/all-bill-by-customer", request)
  const responseData: ApiResponse<IBillResponse[]> = response.data
  return responseData
}
export const LogoutRequest:()=>Promise<ApiResponse<any>> = async(): Promise<ApiResponse<any>> =>{
  const axiosClient =  useCreateClient();
  const response = await axiosClient.post("/api/v1/user/log-out",{})
  const responseData: ApiResponse<ILoginResponse> = response.data
  return responseData
}