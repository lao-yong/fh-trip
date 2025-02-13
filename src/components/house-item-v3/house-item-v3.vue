<template>
    <div class="house-item">
        <div class="item-inner">
            <div class="cover">
                <img :src="itemData.image.url" alt="">
            </div>
            <div class="info">
                <div class="location">
                    <img src="@/assets/img/location.png" alt="">
                    <span class="area">{{ itemData.location }}</span>
                </div>
                
                <div class="name">{{ itemData.houseName}}</div>
                <div class="summary">{{ itemData.summaryText }}</div>
                <div class="price">
                    <div class="new">￥{{ itemData.finalPrice }}</div>
                    <div class="old item">￥{{ itemData.productPrice }}</div>
                    <div class="tip-box  item">
                        <div class="tip">{{ itemData?.priceTipBadge?.text }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script setup>
const props = defineProps({
    itemData: {
        type: Object,
        default: () => ({})
    }
})

const itemClick = () => {
    console.log("itemClick", props.itemData.houseId)
}
</script>



<style lang="less" scoped>
.house-item {
   
    width: 50%;

    .item-inner {
        position: relative;
        margin: 5px;
        background: #fff;
        border-radius: 6px;
        overflow: hidden;
        background-color: #f7f4f4;

        .cover {
            img {
                width: 100%;
            }
        }
        .info {
            margin: 7px 9px;
            .location {
                display: flex;
                align-items: center;
                color: #898787;
                font-size: 13px;
                img {
                    height: 18px;
                    width: 18px;
                }
                .area {
                    margin-left: 4px;
                }
            }

            .summary {
                font-size: 12px;
                color: #898787;
                margin-top: 6px;
            }
            .name {
                margin: 5px 0;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp:2;
                -webkit-box-orient: vertical;
            }

            .price {
                display: flex;
                align-items: center;
                margin-top: 8px;
                .item {
                    margin-left: 3px;
                }
                .new {
                    font-size: 15px;
                    color: var(--primary-color);
                }
                .old {
                    color: #898787;
                    text-decoration: line-through;
                }
                .tip-box {
                    border: 1px solid var(--theme-linear-price);
                    border-radius: 10px;
                    font-size: 13px;
                    padding: 0 5px;
                    background: var(--theme-linear-price);
                    color: #fff;
                }
            }
        }
    }
}
</style>