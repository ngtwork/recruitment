import { Toast } from 'antd-mobile'
import axios from 'axios'

axios.interceptors.request.use(function(config){
    Toast.loading('loading', 1)
    return config
})

axios.interceptors.response.use(function(config){
    Toast.hide()
    return config
})