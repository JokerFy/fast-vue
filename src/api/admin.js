import request from '@/utils/httpRequest'

export function fetchList (data) {
  return request({
    url: '/hy-admin/sys/user/list',
    method: 'get',
    params: data
  })
}

export function info (data) {
  return request({
    url: '/hy-admin/sys/user/infoById',
    method: 'get',
    params: { id: data }
  })
}

export function create (data) {
  return request({
    url: '/hy-admin/sys/user/save',
    method: 'post',
    data: data
  })
}

export function update (data) {
  return request({
    url: '/hy-admin/sys/user/update',
    method: 'put',
    data: data
  })
}

export function deleted (id) {
  return request({
    url: '/hy-admin/sys/user/delete',
    method: 'delete',
    params: { id: id }
  })
}
