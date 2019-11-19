import request from '@/utils/httpRequest'

export function login (data) {
  return request({
    url: '/common/sys/login',
    method: 'post',
    params: data
  })
}

export function create (data) {
  return request({
    url: '/hy-admin/sys/user/add',
    method: 'post',
    params: data
  })
}

export function update (data) {
  return request({
    url: '/hy-admin/sys/user/update',
    method: 'post',
    params: data
  })
}

export function deleted (id) {
  return request({
    url: '/hy-admin/sys/user/delete',
    method: 'post',
    params: id
  })
}
