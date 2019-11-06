import request from '@/utils/httpRequest'

export function nav (data) {
  return request({
    url: '/sys/menu/nav',
    method: 'get',
    params: data
  })
}

export function info (data) {
  return request({
    url: '/sys/user/info',
    method: 'get',
    params: data
  })
}

export function update (data) {
  return request({
    url: '/admin/user/update',
    method: 'post',
    params: data
  })
}

export function deleted (id) {
  return request({
    url: '/sys/user/delete',
    method: 'post',
    params: id
  })
}
