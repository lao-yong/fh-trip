<template>
    <div class="city">
       <div class="top">
         <!-- 搜索框 -->
         <van-search
          v-model="searchValue"
          shape="round"
          show-action
          placeholder="城市/区域/位置"
          @cancel="cancelClick"
          />

        <!-- tab切换 -->
          <van-tabs v-model:active="tabActive" color="#ff9854">
            <template v-for="(value, key, index) in allCities":key="key">
              <van-tab :title="value.title" :name="key"></van-tab>
            </template>
          </van-tabs>
       </div>
       <div class="content">
           <template v-for="(value, key, index) in allCities">
              <cityGroup v-show="tabActive === key" :group-data="value"/>
           </template>
       </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
// import { getCityAll } from '@/services'
import useCityStore from '@/stores/modules/city';
import cityGroup from './cpns/city-group-item.vue';
import router from '@/router';

//搜索框
const searchValue = ref("")
const cancelClick = () => {
    router.back()
}

//tab切换
const tabActive = ref()

//网络请求:请求城市数据
// const allCity = ref({})
// getCityAll().then(res => {
//     allCity.value = res.data
// })
//从store中获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

//获取标签选选中后的数据
//获取正确的key
const currentGroup = computed(() => allCities.value[tabActive.value])

</script>



<style lang="less" scoped>
.city {

  // .top {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  // }
  // .content {
  //   margin-top: 98px;
  // }

  //局部滚动
  .top {
    position: relative;
    z-index: 9;
  }
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>