<template>
  <div class="home">
    welcome{{userInfoStore.name}}！！Go to Redis testing system
  </div>
</template>

<script lang="ts">
export default {
  name: 'Home',
}
</script>
<script lang="ts" setup>
import { useUserInfoStore } from '@/stores/userInfo';

const userInfoStore = useUserInfoStore()

</script>

<style scoped>
.home {
    width: 100%;
    height: 100%;
    padding: 20px;
    letter-spacing: 5px;
    color: transparent;
    font-size: 40px;
    -webkit-text-stroke: 1px #2d3030;
    font-family: '楷体';
  }
</style>
