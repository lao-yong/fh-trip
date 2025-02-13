import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'
import useMainStore from '@/stores/modules/main'
const mainStore = useMainStore()

class HYRequest {
    constructor(baseURL, timeout=10000) {
        this.instance = axios.create({
            baseURL,
            timeout
        })

        this.instance.interceptors.request.use(config => {
            mainStore.isLoaing = true
            return config
        }, err => {
            return err
        })
        this.instance.interceptors.response.use(res => {
            mainStore.isLoaing = false
            return res
        }, err => {
            mainStore.isLoaing = false
            return err
        })
    }

request(config) {
    // mainStore.isLoaing = true
    return new Promise((resolve, reject) => {
        this.instance.request(config).then(res => {
            resolve(res.data)
            // mainStore.isLoaing = false
        }).catch(err => {
            reject(err)
            // mainStore.isLoaing = false
        })
    })
 }

 get(config) {
    return this.request({...config, method: "get"})
  }
  post(config) {
    return this.request({...config, method:"post"})
  }
}

export default new HYRequest(BASE_URL, TIMEOUT)



