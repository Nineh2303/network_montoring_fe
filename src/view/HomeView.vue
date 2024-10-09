<template>
  <div class="flex flex-col w-full items-center">
    <h1 class="font-bold text-lg uppercase mt-[25px] ml-[10px]">Tổng quan hóa đơn</h1>
    <div>
      <div   v-if="userData.role==='ADMIN'"  class="w-[full] flex items-center rounded-lg px-5">
        <h1 class="pt-[10px] mr-[10px]">Tìm kiếm thông tin theo khách hàng: </h1>
        <ASelect
            :options="options"
            @change="handleChange"

            class="w-[450px] h-[50px] flex items-center"
        ></ASelect>
      </div>
    </div>
    <div class="flex w-full px-[50px]">

      <div class="w-full">
        <ColumnChart :customer-id="customerId"/>
      </div>
    </div>
    <div class="w-[80%] flex flex-row justify-end">
      <router-link to="/create-bill">
        <button v-if="userData.role==='ADMIN'" class="w-[200px] h-[40px] bg-blue-600 rounded-lg mx-5 my-5 font-bold text-white">Thêm</button>

      </router-link>
    </div>
    <PaymentTable/>
  </div>
</template>

<script setup lang="ts">

import ColumnChart from "../components/ColumnChart.vue";
import {useAuthStore} from "../store";
import {storeToRefs} from "pinia";
import PaymentTable from "../components/PaymentTable.vue";
import {onMounted, ref, watch} from "vue";
import {message, SelectProps} from "ant-design-vue";
import {ApiResponse} from "../types/Response.ts";
import {IUserData} from "../types/IUser.ts";
import {GetAllUser} from "../api";
import {IDropdownType} from "../types/Menu.ts";

const authStore = useAuthStore()
const {getListBill,getAmountData} = authStore
const {userData} = storeToRefs(authStore)
const customerId= ref<string>("")
watch(userData,async()=>{
  await getListBill(userData.value._id)
  await getAmountData(userData.value._id)
  customerId.value=  userData.value._id

})
const options = ref<SelectProps>([] as SelectProps)
const userOption:IDropdownType[] = []

onMounted(async()=>{
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

const handleChange= async(value:string)=>{
  await getListBill(value)
  customerId.value= value

}
</script>

<style lang="scss" scoped>

</style>