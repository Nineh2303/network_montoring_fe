<template>
  <div class="fixed  top-0 left-0 w-full h-full">
        <div class="w-full h-full bg-white opacity-50"/>
    <a-spin :indicator="indicator" class="fixed top-[400px] left-0 right-0" />
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { LoadingOutlined } from '@ant-design/icons-vue';
const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '100px',
  },
  spin: true,
});
</script>

<style lang="scss" scoped>

</style>