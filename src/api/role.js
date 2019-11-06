import request from '@/utils/httpRequest'

export function fetchList (data) {
  return request({
    url: '/sys/role/list',
    method: 'get',
    params: data
  })
}

export function info (data) {
  return request({
    url: '/sys/role/info/' + data,
    method: 'get'
  })
}

export function create (data) {
  return request({
    url: '/sys/role/add',
    method: 'post',
    params: data
  })
}

export function update (data) {
  return request({
    url: '/sys/role/update',
    method: 'post',
    params: data
  })
}

export function deleted (id) {
  return request({
    url: '/sys/role/delete',
    method: 'post',
    params: id
  })
}

export function select () {
  return request({
    url: '/sys/role/select',
    method: 'get',
    params: {}
  })
}
