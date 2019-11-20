import request from '@/utils/httpRequest'

export function fetchList (data) {
  return request({
    url: '/hy-admin/sys/menu/list',
    method: 'get',
    params: data
  })
}

export function create (data) {
  return request({
    url: '/hy-admin/sys/menu/save',
    method: 'post',
    data: data
  })
}

export function update (data) {
  return request({
    url: '/hy-admin/sys/menu/update',
    method: 'put',
    data: data
  })
}

export function deleted (id) {
  return request({
    url: '/hy-admin/sys/menu/delete',
    method: 'post',
    params: { id: id }
  })
}

export function select () {
  return request({
    url: '/hy-admin/sys/menu/select',
    method: 'get',
    params: {}
  })
}

export function info (id) {
  return request({
    url: '/hy-admin/sys/menu/info/' + id,
    method: 'get',
    params: {}
  })
}
