import { onMounted, onUnmounted, ref } from "vue"
import {throttle} from 'underscore'


export default function useScorll(elRef) {
    let el = window
    const isReachBottom = ref(false)
    const clientHeight = ref(0)
    const scrollTop = ref(0)
    const scrollHeight = ref(0)
    //监听window窗口滚动
    const scorllListenerHandler = throttle(() => {
       if(el ===  window) {
        clientHeight.value = document.documentElement.clientHeight
        scrollTop.value = document.documentElement.scrollTop
        scrollHeight.value = document.documentElement.scrollHeight
       } else {
        clientHeight.value =el.clientHeight
        scrollTop.value = el.scrollTop
        scrollHeight.value = el.scrollHeight
       }
        if(clientHeight.value + scrollTop.value >= scrollHeight.value - 1) {
           isReachBottom.value = true
        }
    }, 100)

onMounted(() => {
    if(elRef) el = elRef.value
    el.addEventListener("scroll", scorllListenerHandler)
})

onUnmounted(() => {
    el.removeEventListener("scroll", scorllListenerHandler)
})

return { isReachBottom, clientHeight, scrollTop, scrollHeight }

}