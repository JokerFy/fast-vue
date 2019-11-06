// import Vue from 'vue'
// import axios from 'axios'
// import router from '@/router'
// import qs from 'qs'
// import merge from 'lodash/merge'
// import { clearLoginInfo } from '@/utils'
//
// const http = axios.create({
//   baseURL: (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : window.SITE_CONFIG.apiURL),
//   timeout: 1000 * 30,
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json; charset=utf-8'
//   }
// })
//
// /**
//  * 请求拦截
//  */
// http.interceptors.request.use(config => {
//   config.headers['token'] = Vue.cookie.get('token') // 请求头带上token
//   return config
// }, error => {
//   return Promise.reject(error)
// })
//
// /**
//  * 响应拦截
//  */
// http.interceptors.response.use(response => {
//   if (response.data && response.data.code === 401) { // 401, token失效
//     clearLoginInfo()
//     router.push({ name: 'login' })
//   }
//   return response
// }, error => {
//   return Promise.reject(error)
// })
//
// /**
//  * 请求地址处理
//  * @param {*} actionName action方法名称
//  */
// http.adornUrl = (actionName) => {
//   // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
//   return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : window.SITE_CONFIG.apiURL) + actionName
// }
//
// /**
//  * get请求参数处理
//  * @param {*} params 参数对象
//  * @param {*} openDefultParams 是否开启默认参数?
//  */
// http.adornParams = (params = {}, openDefultParams = false) => {
//   var defaults = {
//     't': new Date().getTime()
//   }
//   return openDefultParams ? merge(defaults, params) : params
// }
//
// /**
//  * post请求数据处理
//  * @param {*} data 数据对象
//  * @param {*} openDefultdata 是否开启默认数据?
//  * @param {*} contentType 数据格式
//  *  json: 'application/json; charset=utf-8'
//  *  form: 'application/x-www-form-urlencoded; charset=utf-8'
//  */
// http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
//   var defaults = {
//     't': new Date().getTime()
//   }
//   data = openDefultdata ? merge(defaults, data) : data
//   return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
// }
//
// export default http

import Vue from 'vue'
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { clearLoginInfo } from '@/utils'

const service = axios.create({
  baseURL: (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : window.SITE_CONFIG.apiURL),
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

/**
 * 请求拦截
 */
service.interceptors.request.use(config => {
  config.headers['token'] = Vue.cookie.get('token') // 请求头带上token
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
service.interceptors.response.use(
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      // 50008: Illegal token; 50012: Other clients logged in; 50014: token失效
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          clearLoginInfo()
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
