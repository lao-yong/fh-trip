<template>
   <div class="loading" 
    v-if="mainStore.isLoaing"
    @click="loadingClick"
   >
        <van-loading size="40px" type="spinner" color="#ff9854" vertical>加载中~</van-loading>
    </div>
</template>



<script setup>
import useMainStore from '@/stores/modules/main';

const mainStore = useMainStore()

//点击蒙版取消加载动画
const loadingClick = () => {
    mainStore.isLoaing = false
}
</script>



<style lang="less" scoped>
.loading {
  position: fixed;
  z-index: 999;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>