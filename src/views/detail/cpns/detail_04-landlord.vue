<template>
    <div class="landlord">
        <detail-section title="房东介绍" more-text="查看房东主页">
            <div class="intro">
                <div class="top" v-if="landLord.topScroll">
                    <img :src="landLord.topScroll" alt="">
                </div>
                <div class="header">
                    <div class="left">
                        <div class="avatar">
                            <img :src="landLord.hotelLogo" alt="">
                        </div>
                        <div class="info">
                            <div class="name">{{ landLord.hotelName }}</div>
                            <div class="tags">
                                <template v-for="(item, index) in landLord.hotelTags">
                                    <div class="item" :style="{ color: item.tagText.color }">
                                        <span>{{ item.tagText.text }}</span>
                                        <span v-if="index !== landLord.hotelTags.length - 1" class="divider">|</span>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="contact">联系房东</div>
                    </div>
                </div>
                <div class="bottom">
                    <template v-for="(item, index) in landLord.hotelSummary">
                        <div class="item">
                            <div class="title">{{ item.title }}</div>
                            <div class="score">{{ item.introduction }}</div>
                            <div class="desc">{{ item.tip }}</div>
                        </div>
                    </template>
                </div>
            </div>
        </detail-section>
    </div>
</template>



<script setup>
import detailSection from '@/components/detail-section/detail-section.vue';

defineProps({
    landLord: {
        type: Object,
        default: () => ({})
    }
})
</script>



<style lang="less" scoped>
.intro {

    .top {
        img {
            width: 100%;
            border-radius: 3px;
        }
    }

    .header {
        display: flex;
        align-items: center;
        margin-top: 4px;
        .left {
            display: flex;
            align-items: center;
            flex: 1;
            .avatar {
                img {
                    width: 55px;
                    height: 55px;
                }
            }

            .info {
                margin-left: 5px;
                .name {
                    font-size: 16px;
                    font-weight: 700;
                    margin-left: 3xp;
                }
                .tags {
                    display: flex;
                    margin-top: 4px;
                    .item {
                        font-size: 12px;
                        .divider {
                            margin: 4px;
                        }
                    }
                }
            }
        }

        .right {
            width: 68px;
            height: 23px;
            border-radius: 4px;
            justify-content: center;
            display: flex;
            align-items: center;
            color: #fff;
            font-size: 12px;
            background-image: var(--theme-linear-gradient)
        }
    }

    .bottom {
        display: flex;
        justify-content: space-between;
        margin-top: 40px;
        .item {
            display: flex;
            flex-direction: column;
            
            .title {
                color: rgb(155, 155, 155);
                font-size: 12px;
            }

            .score {
                font-size: 18px;
                font-weight: 700;
                margin: 3px 3px;
            }

            .desc {
                color:  rgb(155, 155, 155);
                font-size: 12px;
            }
        }
    }
}
</style>