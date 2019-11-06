import request from '@/utils/httpRequest'

export function fetchList (data) {
  return request({
    url: '/sys/user/list',
    method: 'get',
    params: data
  })
}

export function create (data) {
  return request({
    url: '/sys/user/save',
    method: 'post',
    params: data
  })
}

export function update (data) {
  return request({
    url: '/sys/user/update',
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
