import request from '@/utils/request'

export default {
  /* 用户登录 */
  memberLogin(login) {
    return request({
      method: 'post',
      url: 'ucenter/login',
      data: login
    })
  },
  /* 用户注册 */
  memberRegister(register) {
    return request({
      method: 'post',
      url: 'ucenter/register',
      data: register
    })
  },
  /* 获取用户信息 */
  getMemberBytoken() {
    return request({
      method: 'get',
      url: 'ucenter/member'
    })
  }
}
