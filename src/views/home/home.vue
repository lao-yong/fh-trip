<template>
    <div class="home" ref="homeRef">
            <home-nav-bar/>
                <div class="banner">
                    <img src="@/assets/img/home-banner.webp" alt="">
                </div>
        <home-search-box/>
        <home-categories/>
                <div class="search-bar" v-if="isShowSearchBar">
                    <search-bar :start-date="'09.10'"  :end-date="'09.11'"></search-bar>
                </div>
        
        <home-content/>
    </div>
   
</template>

<script>
export default { name: "home" }
</script>

<script setup>
import { computed, onActivated, onMounted, onUnmounted, ref } from 'vue';
import homeNavBar from './cpns/home-nav-bar.vue';
import homeSearchBox from './cpns/home-search-box.vue';
import useHomeStore from '@/stores/modules/home';
import homeCategories from './cpns/home-categories.vue';
import searchBar from '@/components/search-bar/search-bar.vue';
import homeContent from './cpns/home-content.vue';
import useScorll from '@/hooks/useScroll';
import { watch } from 'vue';
// import hyRequest from '@/services/request/index'


//发送请求热门建议
// const hotSuggests = ref([])
// hyRequest.get({
//     url: "/home/hotSuggests"
// }).then(res => {
//     hotSuggests.value = res.data
// })
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesdata()
homeStore.fetchHouselistData()

//监听window窗口滚动
// const scorllListenerHandler = () => {
//     const clientHeight = document.documentElement.clientHeight
//     const scrollTop = document.documentElement.scrollTop
//     const scrollHeight = document.documentElement.scrollHeight
//     if(clientHeight + scrollTop >= scrollHeight - 1) {
//         homeStore.fetchHouselistData()
//     }
// }

// onMounted(() => {
//     window.addEventListener("scroll", scorllListenerHandler)
// })

// onUnmounted(() => {
//     window.removeEventListener("scroll", scorllListenerHandler)
// })
// useScorll(() => {
//     homeStore.fetchHouselistData()
// })
//监听滚动到底部
const homeRef = ref()
const { isReachBottom, scrollTop } = useScorll(homeRef)
watch(isReachBottom, (newValue) => {
    if(newValue) {
        homeStore.fetchHouselistData().then(() => {
            isReachBottom.value = false
        })
       
    }
})

//搜索框显示的控制
// const isShowSearchBar = ref(false)
// watch(scrollTop, (newTop) => {
//     isShowSearchBar.value = newTop > 100
// })

const isShowSearchBar = computed(() => {
    return scrollTop.value >= 360
})

//当跳转回home时保留原来的位置
onActivated(() => {
    homeRef.value?.scrollTo({
        top: scrollTop.value
    })
})
</script>



<style lang="less" scoped>
.home {
    padding-bottom: 60px;
    height: 100vh;
    box-sizing: border-box;
    overflow-y: auto;
}
.banner {
    img {
        width: 100%;
    }
}

.search-bar {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 21px;
    padding: 16px 16px;
}

</style>