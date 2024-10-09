<template>
  <div class="fixed bg-blue-600 w-full px-10 py-2 border-b-2 flex items-center flex-row justify-between h-[80px] z-10">
    <div class="flex items-center">
      <h1 class="font-bold text-white uppercase">Network Monitoring and Payment</h1>
    </div>
    <div class="relative mx-5 ">
      <div @click="profileToggle =!profileToggle">
        <img src="../assets/avt.png" class="w-[60px] h-[60px] object-cover rounded-full cursor-pointer" alt="">
      </div>
      <div class="absolute left-[-140px] top-[65px] w-[240px] bg-white  border-2
                  transition-all duration-500 rounded-lg shadow-gray-500 shadow-sm overflow-hidden"
           :class="[profileToggle  ?'max-h-[200px] opacity-100':'max-h-0 opacity-0']"
      >
        <div class="border-b-2 flex items-center">
          <img src="../assets/avt.png" class="w-[45px] h-[45px] object-cover rounded-full cursor-pointer" alt="">
          <div>
            <h1 class="font-bold text-[15px] overflow-clip px-2 pt-2">{{ user?.fullName }}</h1>
            <p class="px-2 text-[14px] w-[180px] truncate">gmail@gmai.com</p>
          </div>
        </div>
        <ul class="pt-[5px]">
          <li class=" mx-[5px] px-2 h-[30px] flex items-center hover:bg-gray-400 rounded-[5px]">
            <router-link to="/">
              Your Profile
            </router-link>
          </li>
          <li class=" m-[5px] px-2 h-[30px] flex items-center hover:bg-gray-400 rounded-[5px]">
            <button @click="handleSignOut">Log out</button>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useAuthStore} from "../store";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";

const authStore = useAuthStore();
const {user} = storeToRefs(authStore)
const {logOutAction} = authStore
const profileToggle = ref<boolean>(false)
const router = useRouter()
const handleSignOut = async () => {
  await logOutAction();
  router.push("/auth")
}
</script>

<style lang="scss" scoped>

</style>