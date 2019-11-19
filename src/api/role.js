import request from '@/utils/httpRequest'

export function fetchList (data) {
  return request({
    url: '/hy-admin/sys/role/list',
    method: 'get',
    params: data
  })
}

export function info (data) {
  return request({
    url: '/hy-admin/sys/role/info',
    method: 'get',
    params: { id: data }
  })
}

export function create (data) {
  return request({
    url: '/hy-admin/sys/role/save',
    method: 'post',
    data: data
  })
}

export function update (data) {
  return request({
    url: '/hy-admin/sys/role/update',
    method: 'put',
    data: data
  })
}

export function deleted (id) {
  return request({
    url: '/hy-admin/sys/role/delete',
    method: 'delete',
    params: { id: id }
  })
}

export function select () {
  return request({
    url: '/hy-admin/sys/role/select',
    method: 'get',
    params: {}
  })
}
