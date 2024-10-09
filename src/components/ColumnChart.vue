<template>
  <apexchart type="bar" height="400" :options="chartOptions" :series="series"></apexchart>
</template>

<script setup lang="ts">


import {onMounted, reactive, watch} from "vue";
import {IBillByCustomer} from "../types/IUser.ts";
import {IGetListBillRequest} from "../types/Bill.ts";
import {ApiResponse} from "../types/Response.ts";
import {getListAmount} from "../api";
import {message} from "ant-design-vue";
import {useAuthStore} from "../store";
import {storeToRefs} from "pinia";

const authStore = useAuthStore()
const {setLoading} = authStore
const {initBillAmount, initBillDate} = storeToRefs(authStore)
interface ChartProps {
  customerId:  string | ""
}

const props =defineProps<ChartProps>()
const billAmount:number[] = []
const billDate:string[] = []

onMounted(()=>{
  initBillAmount.value.forEach(e=>billAmount.push(e))
  initBillDate.value.forEach(e=>billDate.push(e))
})

const series = reactive( [{
  name: "Số tiền thanh toán",
  data: billAmount
}])
let chartOptions = reactive({
  chart: {
    height: 350,
    type: 'bar',
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      dataLabels: {
        position: 'top', // top, center, bottom
      },
    }
  },
  dataLabels: {
    enabled: true,
    formatter: function (val:string|number) {
      return `${val} VNĐ`;
    },
    offsetY: -20,
    style: {
      fontSize: '12px',
      colors: ["#304758"]
    }
  },

  xaxis: {
    categories: billDate,
    position: 'top',
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    crosshairs: {
      fill: {
        type: 'gradient',
        gradient: {
          colorFrom: '#D8E3F0',
          colorTo: '#BED1E6',
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        }
      }
    },
    tooltip: {
      enabled: true,
    }
  },
  yaxis: {
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
      formatter: function (val:string) {
        return val + "%";
      }
    }

  },
  title: {
    text: 'Thống kê thanh toán trong 20 ngày gần nhất',
    floating: true,
    offsetY: 380,
    align: 'center',
    style: {
      color: '#444',
      fontFamily:"Roboto, san-serif"
    }
  }
})
  watch(props,async()=>{
    try {
      const getListBillRequest:IGetListBillRequest={
        customerId: props.customerId
      }
      billAmount.length=0
      billDate.length=0
      series.length=0
      await setLoading(true)
      const apiResponse: ApiResponse<IBillByCustomer> = await getListAmount(getListBillRequest);
      if(!apiResponse.error){
         apiResponse.object?.billAmount.forEach(e=> billAmount.push(e))
         apiResponse.object?.billDate.forEach(e=> billDate.push(e))
      }
      series.push({
        name: "Số tiền thanh toán",
        data: billAmount
      })
      series[0].data = billAmount
      chartOptions.xaxis.categories =  billDate
      await setLoading(false)
    } catch (err){
      message.error("Lỗi")
    }
  })



</script>

<style lang="scss" scoped>

</style>