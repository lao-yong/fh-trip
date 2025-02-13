<template>
    <div class="comment">
        <detail-section title="热门评论" :more-text="`查看全部${comment.totalCount}条评论`">
            <div class="comment">
                <div class="header">
                    <div class="left">
                        <div class="score">
                            <span class="text">{{ comment.overall }}</span>
                            <div class="line"></div>
                        </div>
                        <div class="info">
                            <div class="title">{{ comment.scoreTitle }}</div>
                            <div class="count">{{ comment.totalCount }}条评论</div>
                            <div class="star">
                                <van-rate v-model="comment.overall" color="#ff9654" size="12" readonly allow-half/>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <template v-for="(item, index) in comment.subScores" :key="index">
                            <span>{{ item }}</span>
                        </template>
                    </div>
                </div>
                <div class="tags">
                    <template v-for="(item, index) in comment.commentTagVo" :key="index">
                        <span class="item" :style="{color: item.color, background: item.background}">
                            {{ item.text }}
                        </span>
                    </template>
                </div>
                <div class="content">
                    <div class="user">
                        <div class="avatar">
                            <img :src="comment.comment.userAvatars" alt="">
                        </div>
                        <div class="profile">
                            <div class="name">{{ comment.comment.userName }}</div>
                            <div class="date">{{ comment.comment.checkInDate }}</div>
                        </div>
                    </div>
                    <div class="text">
                        {{ comment.comment.commentDetail }}
                    </div>
                </div>
            </div>
        </detail-section>
    </div>
</template>



<script setup>
import detailSection from '@/components/detail-section/detail-section.vue';

defineProps({
    comment: {
        type: Object,
        default: () => ({})
    }
})

</script>

<style lang="less" scoped>
.comment {


    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
            display: flex;
            align-items: center;
            
            .score {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .text {
                    font-size: 37px;
                    font-weight: 700;
                    margin-bottom: -6px
                }
                .line {
                    width: 55px;
                    height: 5px;
                    box-sizing: border-box;
                    border-radius: 3px;
                    background-image: var(--theme-linear-gradient);
                   
                }
            }

            .info {
                margin-left: 12px;
                font-size: 12px;

                .count {
                    color: #9b9b9b;
                    margin: 2px 0;
                }

            }
        }

        .right {
            font-size: 12px;
            width: 152px;
            color: #9b9b9b;
           
            span {
                margin: 0 3px;
                margin-top: 3px;
            }
        }
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        font-size: 12px;
        margin-top: 20px;
        color: #9b9b9b;

        .item {
            width: 100px;
            margin: 4px 2px;
        }
    }

    .content {
        margin-top: 20px;
        .user {
            display: flex;

            .avatar {
                img {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                }
            }

            .profile {
                margin-left: 10px;

                .name {
                    font-size: 15px;
                    font-weight: 700;
                }

                .date {
                    font-size: 12px;
                    color: rgb(102, 102, 102);
                    margin-top: 2px;
                }
            }
        }

        .text {
            margin-top: 10px;
        }
    }
}
</style>