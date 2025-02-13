<template>
    <div class="tab-bar">
        <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
            <template v-for="(item, index) in tabbarData">
                <van-tabbar-item :to="item.path">
                    <span>{{ item.title }}</span>
                    <template #icon>
                        <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
                        <img v-else :src="getAssetURL(item.imageActive)" alt="">
                    </template>
                </van-tabbar-item>
            </template>
        </van-tabbar>
        <!-- <template v-for="(item, index) in tabbarData">
            <div 
                class="tab-bar-item" 
                :class="{ active: currentIndex === index }"
                @click="itemClick(index, item)"
                >
                <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
                <img v-else :src="getAssetURL(item.imageActive)" alt="">
                <span class="text">{{ item.title }}</span>
            </div>
        </template> -->
    </div>

    
</template>
<script setup>

import tabbarData from '@/assets/data/tabbar.js';
import { getAssetURL } from '@/utils/load_assets';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const currentIndex = ref(0)
watch(route, (newRoute) => {
    const index = tabbarData.findIndex(item => item.path === newRoute.path)
    if(index === -1) return
    currentIndex.value = index
})



</script>

<style lang="less" scoped>
.tab-bar{
    img {
        height: 28px;
    }
    //找到子组件，让子组件的类也可以生效
    // :deep(.van-tabbar__icon) {
    //     font-size: 30px;
    // }
}
</style>