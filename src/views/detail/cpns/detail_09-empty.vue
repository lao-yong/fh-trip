<template>
    <div class="empty top-page">
        <van-nav-bar
            title="民宿详情"
            left-text="旅途"
            left-arrow
            @click-left="onClickLeft"
            />
        <van-empty class="empty" description="该房源暂无数据，请查看其他房源吧~"/>
    </div>
</template>



<script setup>
import router from '@/router';

const onClickLeft = () => {
    router.back()
}
</script>



<style lang="less" scoped>
.empty {
    margin: auto auto;
}
</style>