<template>
  <div class="w-full flex justify-center">
    <div class="w-[60%] h-[700px] flex flex-col items-center pt-10 border-2 rounded-lg mt-10 space-y-5">
      <h1 class="uppercase font-bold text-lg my-[25px]">Tạo hóa đơn sử dụng dịch vụ</h1>
      <div class="flex items-center justify-center">
        <h1 class="w-[150px]">Mã khách hàng</h1>
        <div class="w-[500px]  rounded-lg px-5">
          <ASelect
              :v-model="createBillRequest.customerId"
              :options="options"
              @change="handleChange"

              class="w-[450px] h-[50px] flex items-center"
          ></ASelect>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <h1 class="w-[150px]">Mã sản phẩm</h1>
        <input type="text" class="w-[500px] h-[50px] border-2 rounded-lg px-5" v-model="createBillRequest.productId">
      </div>
      <div class="flex items-center justify-center">
        <h1 class="w-[150px]">Ngày thành tiền</h1>
        <DatePicker class="w-[500px] h-[50px] border-2 rounded-lg px-5"
                    @change="onChangeDate"
        />
      </div>

      <div class="flex items-center justify-center">
        <h1 class="w-[150px]">Mô tả dịch vụ</h1>
        <input type="text" class="w-[500px] h-[50px] border-2 rounded-lg px-5"  v-model="createBillRequest.serviceDescription">
      </div>
      <div class="flex items-center justify-center">
        <h1 class="w-[150px]">Trạng thái</h1>
        <input type="text" class="w-[500px] h-[50px] border-2 rounded-lg px-5" v-model="createBillRequest.status">
      </div>
      <div class="flex items-center justify-center">
        <h1 class="w-[150px]">Thành tiền</h1>
        <input type="text"
               class="w-[500px] h-[50px] border-2 rounded-lg px-5"
               placeholder="..VNĐ" v-model="createBillRequest.amount">
      </div>
      <button class="border-2 bg-blue-600 text-white w-[150px] h-[40px] rounded-lg hover:opacity-75"
              @click="onHandleCreate"
      >Tạo đơn hàng
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {SelectProps} from 'ant-design-vue';
import {DatePicker, message} from "ant-design-vue";
import {IBillResponse, ICreateBillRequest} from "../types/Bill.ts";
import {onBeforeMount, ref} from "vue";
import {ApiResponse} from "../types/Response.ts";
import {CreateBilling, GetAllUser} from "../api";
import {IUserData} from "../types/IUser.ts";
import {IDropdownType} from "../types/Menu.ts";
import router from "../routes";
import type { Dayjs } from 'dayjs';


const createBillRequest: ICreateBillRequest = {
    customerId : "",
  productId :"",
  paymentDate : new Date(),
  serviceDescription: "",
  status:"",
  amount: null
}

const onHandleCreate = async () => {
  const response:ApiResponse<IBillResponse>  = await CreateBilling(createBillRequest) ;
  if(!response.error) {
    message.success("Tạo hóa đơn thành công")
    setTimeout(()=>{
      router.push("/")
    }, 1000)
  }
  console.log(createBillRequest)
}
const userOption:IDropdownType[] = []
const options = ref<SelectProps>([] as SelectProps)
const onChangeDate =(date:Dayjs | string)=>{
  createBillRequest.paymentDate= new Date(date as string)
}
onBeforeMount(async()=>{
  const allUser:ApiResponse<IUserData[]> = await  GetAllUser();
  if(!allUser.error){
    allUser?.object?.forEach(e=>{
      const option:IDropdownType ={
        value:e._id,
        label:e.fullName

      }
      userOption.push(option)
    })
    options.value=userOption as SelectProps
  } else {
     message.error("Không tìm thấy thông tin khách hàng")
  }
  console.log(userOption)
})
const handleChange = (value:string)=>{
  createBillRequest.customerId=value
}
</script>

<style lang="css" scoped>

</style>