<template>
    <div class="detail top-page" ref="detailRef" v-if="detailInfos">
        <tab-control 
            v-if="showTabControl"
            class="tabs"
            :titles="names"
            @tabItemClick="tabClick"
            ref="tabControlRef"
            />
        <van-nav-bar
            title="民宿详情"
            left-text="旅途"
            left-arrow
            @click-left="onClickLeft"
            />
      <div class="main" v-if="mainPart" v-memo="[mainPart]">
        <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"/>
        <detail-infos :top-infos="mainPart.topModule"/>
        <detail-facility name="设施" :ref="getSectionRef" :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"/>
        <detail-landlord name="房东" :ref="getSectionRef" :land-lord="mainPart.dynamicModule.landlordModule"/>
        <detail-comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule"/>
        <detail-notice name="须知":ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>
        <detail-map name="地图" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule"/>
        <detail-intro name="说明" :ref="getSectionRef" :price-intro="mainPart.introductionModule"/>
      </div>
      <div class="footer">
        <img src="@/assets/img/footer.png" alt="">
        <div class="text">千浩旅途，永无止境！</div>
      </div>

      <action-bar class="action-bar"/>
    </div>
    <detail-empty v-else/>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import  { getDetailInfos } from "@/services";
import { computed, ref, watch } from 'vue';
import tabControl from '@/components/tab-control/tab-control.vue';
import DetailSwipe from './cpns/detail_01-swipe.vue';
import DetailInfos from './cpns/detail_02-infos.vue';
import DetailFacility from './cpns/detail_03-facility.vue';
import DetailLandlord from './cpns/detail_04-landlord.vue';
import DetailComment from './cpns/detail_05-comment.vue';
import DetailNotice from './cpns/detail_06-notice.vue';
import DetailMap from './cpns/detail_07-map.vue';
import DetailIntro from './cpns/detail_08-intro.vue';
import DetailEmpty from './cpns/detail_09-empty.vue';
import actionBar from '@/components/action-bar/action-bar.vue';
import useScorll from '@/hooks/useScroll';




const router = useRouter()
const route = useRoute()
const houseId = route.params.id

//发送网络请求
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value?.mainPart)
getDetailInfos(houseId).then(res => {
    detailInfos.value = res.data
})

const onClickLeft = () => {
    router.back()
}

//tabcontrol操作
const detailRef = ref()
const { scrollTop } = useScorll(detailRef)
const showTabControl = computed(() => {
    return scrollTop.value >= 300
})

// const sectionEls = []
// const getSectionRef = (value) => {
//     sectionEls.push(value.$el)
// }

const sectionEls = ref({})
const names = computed(() => {
    return Object.keys(sectionEls.value)
})
const getSectionRef = (value) => {
    if(!value) return
    const name = value.$el.getAttribute("name")
    sectionEls.value[name] = value.$el
}
let isClick = false
let currentDistance = -1
const tabClick = (index) => {
    const key = Object.keys(sectionEls.value)[index]
    const el = sectionEls.value[key]
    let distance = el.offsetTop
    if (index !== 0) {
        distance = distance - 44
    }
    isClick = true
    currentDistance = distance
    detailRef.value.scrollTo({
        top: distance,
        behavior: 'smooth'
        
    })
}

//页面滚动时匹配对应的tabControll的index
const tabControlRef = ref()
watch(scrollTop, (newValue) => {
    if(newValue === currentDistance) {
        isClick = false
    }
    if(isClick) return
    //1、获取所有区域的offsetTops
    const els = Object.values(sectionEls.value)
    const values = els.map(el => el.offsetTop)
    //1、根据newValue匹配想要的索引
    let index = values.length - 1
    for (let i = 0; i < values.length; i++) {
        if (values[i] > newValue + 44) {
            index = i - 1
            break
        }
    }
    tabControlRef.value?.setCurrentIndex(index)
}) 

</script>

<style lang="less" scoped>
.tabs {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
}
.footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 123px;
    margin-bottom: 30px;
    img {
        width: 123px;
    }

    .text {
        margin-top: 12px;
        font-size: 12px;
        color: #7688a7;
    }
}

.action-bar {
    position: fixed;
    z-index: 999;
    bottom: 0;
    right: 0;
    left: 0;
}


</style>