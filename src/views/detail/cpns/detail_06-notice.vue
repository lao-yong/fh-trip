<template>
    <div class="notice">
        <detail-section title="预定须知">
            <div class="notice-inner">
                <template v-for="(item, index) in orderRules" :key="index">
                    <div class="item">
                        <div class="title">{{ item.title }}</div>
                        <div class="intro">{{ item.introduction }}</div>
                        <div class="tip" v-if="item.tip">查看说明</div>
                    </div>
                </template>
            </div>
        </detail-section>
    </div>
</template>



<script setup>
import detailSection from '@/components/detail-section/detail-section.vue';

defineProps({
    orderRules: {
        type: Array,
        default: () => []
    }
})
</script>



<style lang="less" scoped>
.notice-inner {

    .item {
        display: flex;
        margin: 10px 0 20px;
        font-size: 12px;

        .title {
            width: 64px;
            color: #666;
        }

        .intro {
            flex: 1;
            color: #333;
        }
    }
}
</style>