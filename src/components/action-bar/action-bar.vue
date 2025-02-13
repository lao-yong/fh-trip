<template>
    <div class="action-bar">
        <van-action-bar>
            <van-action-bar-icon icon="chat-o" text="客服" color="#ee0a24" @click="btnClickinfo"/>
            <van-action-bar-icon icon="cart-o" text="订单" @click="btnClickorder"/>
            <van-action-bar-icon icon="star" text="已收藏" color="#ff5000" @click="btnClickfavor"/>
            <van-action-bar-button type="warning" text="加入订单" @click="btnClickaddOrder"/>
            <van-action-bar-button type="danger" text="立即预定" @click="btnClickpay"/>
        </van-action-bar>
    </div>
</template>



<script setup>
import router from '@/router'

const btnClickinfo = () => {
    console.log("客服")
}

const btnClickorder = () => {
    router.push("/order")
}

const btnClickfavor = () => {
    console.log("收藏")
}

const btnClickaddOrder = () => {
    console.log("加入订单")
}

const btnClickpay = () => {
     console.log("立即预定")
}
</script>



<style lang="less" scoped>

</style>