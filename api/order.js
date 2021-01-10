import request from '@/utils/request'

export default {
  /* 生成订单 */
  saveOrder(cid) {
    return request({
      method: 'post',
      url: `order/${cid}`
    })
  },
  /* 根据订单号获取订单 */
  getOrderInfo(orderNo) {
    return request({
      method: 'get',
      url: `order/${orderNo}`
    })
  },
  /* 获取微信支付二维码 */
  getWxPayCode(orderNo) {
    return request({
      method: 'get',
      url: `order/code/${orderNo}`
    })
  },
  /* 检查微信支付状态 */
  checkWxPayState(orderNo) {
    return request({
      method: 'get',
      url: `order/pay/state/${orderNo}`
    })
  },
  /* 检查订单状态 */
  checkOrderState(courseId) {
    return request({
      method: 'get',
      url: `order/check/${courseId}`
    })
  }
}