import request from '@/utils/request'

export default {
  /* 发送短信验证码 */
  sendVerifyCode(mobile) {
    return request({
      method: 'get',
      url: `msm/send/${mobile}`
    })
  }
}