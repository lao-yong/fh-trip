<template>
    <div class="section">
        <div class="header">
            <h2 class="title">{{ title }}</h2>
        </div>
        <div class="content">
            <slot>
                <h3>默认值</h3>
            </slot>
        </div>
        <div class="footer" v-if="moreText.length">
            <span class="more">{{ moreText }}</span>
            <van-icon name="arrow"/>
        </div>
    </div>
</template>



<script setup>
defineProps({
    title: {
        type: String,
        default: "默认值"
    },
    moreText: {
        type: String,
        default: ""
    }
})
</script>



<style lang="less" scoped>
.section {
    padding: 0 15px;
    margin-top: 12px;
    background-color: #fff;

    .header {
        height: 50px;
        line-height: 50px;
        border-top: 5px solid #f2f3f4;
        border-bottom: 1pz solid #eee;

        .title {
            font-size: 20px;
            color: #333;
        }
    }

    .content {
        padding: 8px 0;
    }

    .footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 44px;
        line-height: 44px;
        color: #ff9645;
        font-size: 14px;
        font-weight: 600;
    }
}
</style>