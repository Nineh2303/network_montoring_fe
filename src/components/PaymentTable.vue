<template>
  <table class="w-[90%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      <th v-for="label in PaymentTableHeader" scope="col" class="px-6 py-3">
        {{ label }}
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="bill  in userBills"  class="bg-white border-b">
      <th scope="row"
          class="px-2 py-4 text-gray-900 whitespace-nowrap font-bold flex">
        {{ bill?._id }}
      </th>
      <td class="px-2 py-4 font-bold text-[15px]">
            Payment
      </td>
      <td class="px-6 py-4 text-lg">
        {{ FormatDate(bill?.paymentDate as string) }}
      </td>
      <td class="px-6 py-4 text-lg">
        {{bill?.serviceDescription}}
      </td>
      <td class="px-6 py-4 text-lg">
        {{formatVND(bill?.amount)}}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">

import {PaymentTableHeader} from "../types/Table.ts";
import {useAuthStore} from "../store";
import {storeToRefs} from "pinia";
import {FormatDate, formatVND} from "../helpers/FormatDate.ts";
const authStore = useAuthStore();
const {userBills}  = storeToRefs(authStore)
</script>

<style lang="scss" scoped>

</style>