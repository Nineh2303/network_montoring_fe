<script setup lang="ts">
import {useRouter} from "vue-router";
import {useAuthStore} from "./store";
import {onBeforeMount} from "vue";
import {storeToRefs} from "pinia";


const router = useRouter();
const authStore = useAuthStore()
const {checkAuthorization} = authStore
const {isAuthenticated} = storeToRefs(authStore)
onBeforeMount(async () => {
  await checkAuthorization();
  if (isAuthenticated.value) {
    router.push("/")
  }

})


</script>

<template>
  <RouterView/>
</template>

<style scoped>

</style>
