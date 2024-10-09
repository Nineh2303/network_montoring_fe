<template>
  <div class="h-screen w-full">
    <Header/>
    <div class="flex h-full pt-[80px] overflow-auto">
<!--      <Sidebar/>-->
      <router-view/>
    </div>
    <LoadingView v-if="isLoading"/>

  </div>
</template>

<script setup lang="ts">

import Header from "../components/Header.vue";
import LoadingView from "../view/LoadingView.vue";
import {useAuthStore} from "../store";
import {storeToRefs} from "pinia";
const authStore = useAuthStore()
const {isLoading} = storeToRefs(authStore)
</script>

<style lang="scss" scoped>

</style>