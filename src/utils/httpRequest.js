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
  config.headers['authorization'] = []
  config.headers['authorization'].push('Bearer ' + Vue.cookie.get('token'))
  if (config.method === 'put' || config.method === 'post') {
    config.transformRequest = [(data) => JSON.stringify(data)]
  }
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
    return Promise.reject(error)
  }
)

export default service
