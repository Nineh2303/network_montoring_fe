import {IBillByCustomer, ILogin, ILoginResponse, IUserData} from "../types/IUser.ts";
import {defineStore} from "pinia";
import {CheckAuthorization, getAllBillByUser, getListAmount, LoginApi, LogoutRequest} from "../api";
import {ApiResponse, IActionResponse} from "../types/Response.ts";
import {IBillResponse, IGetListBillRequest} from "../types/Bill.ts";
import {message} from "ant-design-vue";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: {} as IUserData,
      isAuthenticated: false as Boolean,
      isLoading: false,
      listBillByUser: [] as IBillResponse[],
      initBillAmount: [] as number[],
      initBillDate: [] as string[],
    }
  },
  getters: {
    userData: (state) => {
      return state.user
    },
    userBills: (state) => {
      return state.listBillByUser
    }
  },
  actions: {
    loginAction: async function (request: ILogin) {
      this.isLoading = true
      try {
        const response: ApiResponse<ILoginResponse> = await LoginApi(request)
        if (!response.error) {
          const token = `Bearer ` + response.object?.token
          localStorage.setItem("access_token", token)
          this.user = response.object?.user as IUserData
          this.isAuthenticated = true
          await this.getListBill(this.user._id)
          await this.getAmountData(this.user._id)
          const actionsRes :IActionResponse ={
            error : false,
            message: "Success"
          }
          return actionsRes
        } else {
          const actionsRes :IActionResponse ={
            error : true,
            message: "Error"
          }
          return actionsRes
        }
      } catch (err) {
        message.error("Lỗi")
        return false
      } finally {
        this.isLoading = false
      }
    },
    checkAuthorization: async function () {
      this.isLoading = true
      try {
        const response = await CheckAuthorization();
        if (!response.error) {
          this.user = response.object?.user as IUserData
          this.isAuthenticated = true as Boolean
        }
      } catch (err) {
        this.isAuthenticated = false
      } finally {
        this.isLoading = false
      }
    },
    getAmountData: async function (customerId: string) {
      this.isLoading = true
      try {
        const getAmountRequest: IGetListBillRequest = {
          customerId: customerId
        }
        const apiResponse: ApiResponse<IBillByCustomer> = await getListAmount(getAmountRequest)
        if (!apiResponse.error && apiResponse.object) {
          this.initBillAmount = apiResponse.object?.billAmount
          this.initBillDate = apiResponse.object?.billDate

        }
      } catch (err) {
        message.error("Lỗi")
      } finally {
        this.isLoading = false
      }
    },
    getListBill: async function (customerId: string) {
      this.isLoading = true
      const request: IGetListBillRequest = {
        customerId: customerId
      }
      try {
        const apiResponse: ApiResponse<IBillResponse[]> = await getAllBillByUser(request)
        if (!apiResponse.error && apiResponse.object) {
          this.listBillByUser = apiResponse.object
        }
      } catch (err) {
        message.error("Lỗi")

      } finally {
        this.isLoading = false
      }
    },
    logOutAction: async function () {
      this.isLoading = true
      try {
        const response = await LogoutRequest();
        if (!response.error) {
          this.user = {} as IUserData
          this.isAuthenticated = false
          localStorage.removeItem("access_token")
        }
      } catch (err) {
        console.log(err)
      } finally {
        this.isLoading = false
      }
    },
    setLoading: async function(value: boolean){
      this.isLoading = value
    }
  }
})