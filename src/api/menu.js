import request from '@/utils/httpRequest'

export function fetchList (data) {
  return request({
    url: '/sys/menu/list',
    method: 'get',
    params: data
  })
}

export function create (data) {
  return request({
    url: '/sys/menu/save',
    method: 'post',
    params: data
  })
}

export function update (data) {
  return request({
    url: '/sys/menu/update',
    method: 'post',
    params: data
  })
}

export function deleted (id) {
  return request({
    url: '/sys/menu/delete',
    method: 'post',
    params: id
  })
}

export function select () {
  return request({
    url: '/sys/menu/select',
    method: 'get',
    params: {}
  })
}

export function info () {
  return request({
    url: '/sys/menu/info',
    method: 'get',
    params: {}
  })
}
