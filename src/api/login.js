import request from '@/utils/httpRequest'

export function login (data) {
  return request({
    url: '/sys/login',
    method: 'post',
    params: data
  })
}

export function create (data) {
  return request({
    url: '/admin/user/add',
    method: 'post',
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
