/**
 * 获取地址栏参数值
 * @param name
 * @returns {null}
 * @constructor
 */
export function GetQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  var s = window.location.search
  var href = window.location.href
  var index = href.indexOf('?')
  if (s === '') {
    r = href.substr(index + 1).match(reg)
  }
  if (r != null) return unescape(r[2])
  return null
}

export function setUser (user) {
  localStorage.setItem('user', JSON.stringify(user))
}

export function getUser () {
  const user = localStorage.getItem('user')
  if (!user) {
    return null
  }
  return JSON.parse(user)
}
