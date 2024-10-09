<template>
  <div class="w-full flex justify-center">
      <div class="w-[1000px] h-[400px] mt-[200px] border-2 rounded-lg flex flex-col items-center">
        <h1 class="font-bold text-2xl mt-[20px]">Đăng nhập</h1>
        <div class="flex flex-col items-center mt-5 space-y-2">
                <input type="text"
                       placeholder="username"
                       class=" flex items-center px-4 w-[500px] h-[40px] rounded-lg border-2 text-[18px]"
                       v-model="loginForm.username">
                <input type="password"
                       placeholder="password"
                       class=" flex items-center px-4 w-[500px] h-[40px] rounded-lg border-2 text-[18px]"
                       v-model="loginForm.password"
                >
        </div>
        <button class="mt-5 w-[250px] h-[40px] bg-blue-600 font-bold text-white rounded-lg"
        @click="handleLogin">Login</button>
      </div>
  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from "../store";
import {ILogin} from "../types/IUser.ts";
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";

const authStore= useAuthStore()
const {loginAction} = authStore
const {isAuthenticated}= storeToRefs(authStore)
const router = useRouter();

const loginForm:ILogin = {
  username:'',
  password:''
}

const handleLogin =async  ()=>{
  await loginAction(loginForm)
  if(isAuthenticated.value) {
    router.push("/")
  }
}

</script>

<style lang="scss" scoped>

</style>