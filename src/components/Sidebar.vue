<template>
  <div class="h-full border-r-2 relative transition-all duration-200 mx-2"
       :class="onToggleSidebar? 'w-[250px]' : 'w-[80px]'"
  >
    <ul class="flex flex-col justify-center items-center pt-5">
      <li v-for="menu in MenuList" class="relative w-[95%] mx-[25px] px-2 h-[50px] cursor-pointer flex items-center
      rounded-lg my-2 hover:bg-[#1030bf] hover:text-white">
        <router-link v-if="menu.role === user.role"  :to="menu.endpoint" class="flex ml-[15px] items-center w-full h-full">
          <component :is="menu.icon" class="w-[30px]"/>
          <div class="flex items-center absolute w-full h-full overflow-hidden transition-all  duration-500"
               :class="onToggleSidebar ? 'left-[75px]':'left-[-150px]'">
            <h1 class="absolute font-bold overflow-hidden"
            >
              {{ menu.name }}
            </h1>
          </div>
        </router-link>
      </li>
    </ul>
    <div class="absolute mt-auto bg-white mb-auto top-[-200px] bottom-0 right-[-20px]
          cursor-pointer w-[40px] h-[40px] rounded-full border-2 flex justify-center overflow-visible transition-all duration-300"
         :class="onToggleSidebar ? 'scale-x-[-1]':''"
         @click="onToggleSidebar=!onToggleSidebar">
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {MenuList} from "../types/Menu.ts";
import {useAuthStore} from "../store";
import {storeToRefs} from "pinia";
const authStore= useAuthStore()
const {user} = storeToRefs(authStore) ;

const onToggleSidebar = ref<boolean>(false)

</script>
<style scoped lang="scss">

</style>