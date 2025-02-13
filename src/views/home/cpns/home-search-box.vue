<template>
    <div class="search-box">
        <!-- 位置信息 -->
        <div class="location .bottom-gary-line">
                <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
            <div class="position" @click="positionClick">
                <span class="text">我的位置</span>
                <img src="@/assets/img/定位.png" alt="">
            </div>
        </div>

        <!-- 日期范围 -->
         <div class="section date-range .bottom-gary-line" @click="showCalendar = true">
            <div class="start">
                <div class="date">
                    <span class="tip">入住</span>
                    <span class="time">{{ startDateStr }}</span>
                </div>
                <div class="stay">共{{ stayCount }}晚</div>
            </div>
           
            <div class="end">
                <div class="date">
                    <span class="tip">离店</span>
                    <span class="time">{{ endDateStr }}</span>
                </div>
            </div>
         </div>
         <van-calendar
                 v-model:show="showCalendar"
                 color="#ff9854"
                  @confirm="onConfirm"
                  :round="false"
                  :show-confirm="false"
                  type="range"/>
        
                  <!-- 价格人数输入 -->
        <div class="section price-counter bottom-gary-line ">
            <div class="start">价格不限</div>
            <div class="end">人数不限</div>
        </div>
        <!-- 关键字 -->
        <div class="section keyword bottom-gary-line">关键字/位置/民宿名</div>
        
        <!-- 热门建议 -->
         <div class="section hot-suggest">
            <template v-for="(item, index) in hotSuggests" :key="index">
                <div class="item"
                :style="{color: item.tagText.color, background: item.tagText.background.color}"
                >
                    {{ item.tagText.text }}
                </div>
            </template>
         </div>

         <!-- 搜索按钮 -->
          <div class="section search-btn">
            <div class="btn" @click="searchbtnClick">开始搜索</div>
          </div>
    </div>
</template>

<script setup>
import useCityStore from '@/stores/modules/city';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import { formatMonthDay, getDiffDays } from '@/utils/format_date';
import useHomeStore from '@/stores/modules/home';
import useMainStore from '@/stores/modules/main';

//定义props
// defineProps({
//     hotSuggests: {
//         type: Array,
//         default:() => []
//     }
// })

const router = useRouter()

const cityClick = () => {
    router.push("/city")
}
//获取我的位置
const positionClick = () => {
    navigator.geolocation.getCurrentPosition(res => {
        console.log("获取位置成功", res)
    }, err =>{
        console.log("获取位置失败")
    })
}

//当前城市
const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)

//日期范围处理
const mainStore = useMainStore()
const { startDate, endDate } = storeToRefs(mainStore)

const startDateStr = computed(() => formatMonthDay(startDate.value))
const endDateStr = computed(() => formatMonthDay(endDate.value))

const stayCount = ref(getDiffDays(startDate.value, endDate.value))

const showCalendar = ref(false)

const onConfirm = (value) => {
    //设置日期
    const selectStartDate = value[0]
    const selectEndDate = value[1]
    mainStore.startDate = selectStartDate
    mainStore.endDate = selectEndDate
    stayCount.value = getDiffDays(selectStartDate, selectEndDate)
    //隐藏日历
    showCalendar.value = false
}

   //热门建议
    const homeStore = useHomeStore()
    const { hotSuggests } = storeToRefs(homeStore)

    //开始搜索
    const searchbtnClick = () => {
        router.push({
            path: "/search",
            query: {
                startDate: startDate.value,
                endDate: endDate.value,
                currentCity: currentCity.value.cityName
            }
        })
    }


</script>



<style lang="less" scoped>
.search-box {
    --van-calendar-popup-height: 100%
}

.location {
    display: flex;
    align-items: center;
    padding: 0 20px;

    .city {
        flex: 1;
        margin-top: 8px;
        color: #333;
        font-size: 15px;
    }

    .position {
        width: 74px;
        margin-top: 10px;
        .text {
            font-size: 12px;
            color: #333;
        }

        img {
            width: 16px;
            height: 16px;
            margin-left: 5px;
        }
    }
}


.section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px;
    color: #999;
    margin-top: 8px;

    .start {
        flex: 1;
        display: flex;
        height: 44px;
        align-items: center;
    }
    .end{
        min-width: 30%;
        padding-left: 20px;
    }

    .date {
        display: flex;
        flex-direction: column;

        .tip {
            font-size: 12px;
            color: #999;
        }

        .time {
            margin-top: 9px;
            color: #333;
            font-size: 15px;
            font-weight: 500;
        }
    }
}

.date-range {
    height: 44px;
    margin-top: 8px;
    .stay {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #666;
    }
}

.price-counter {
    .start {
        border-right: 1px solid var(--line-color);
    }
}

.hot-suggest {
    margin: 10px 0;
    height: auto;
    .item {
        padding: 4px 8px;
        border-radius: 14px;
        margin: 4px;
        font-size: 12px;
        // line-height: 1;
    }
}

.search-btn {

    .btn {
        width: 342px;
        height: 38px;
        max-height: 50px;
        font-weight: 500;
        font-size: 18px;
        line-height: 38px;
        text-align: center;
        border-radius: 20px;
        color: #fff;
        background-image: var(--theme-linear-gradient)
    }
}
</style>