<template>
    <div class="intro">
        <h2 class="title">{{ priceIntro.title }}</h2>
        <div class="content">
            {{ priceIntro.introduction }}
        </div>
    </div>
</template>



<script setup>
defineProps({
    priceIntro: {
        type: Object,
        default: () => ({})
    }
})
</script>



<style lang="less" scoped>
.intro {
    padding: 16px 12px;
    border-top: 5px solid #f2f3f4;
    
    .title {
        font-size: 20px;
        color: #333;
        font-weight: 700;
    }
    .content {
        margin-top: 8px;
        color: rgb(102, 102, 102);
    }
}
</style>