import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui'
import cookie from 'js-cookie'

// 创建axios实例
const service = axios.create({
  baseURL: "http://192.168.166.128:88/api/", // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// TODO request 拦截器
service.interceptors.request.use(
  request => {
    // 获取cookie中的token
    const token = cookie.get('token')
    // 判断token值
    if (token !== undefined && token !== null && token !== "") {
      // 在请求头信息中附带token
      request.headers["token"] = token
    }
    return request
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== 20000) {
      if (res.code === 25000) {
        return response.data
      } else {
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject('error')
      }
    }
    return response.data

  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
