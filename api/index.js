import request from '@/utils/request'

export default {
  /* 获取banner图发布数据 */
  getBannerPublish() {
    return request({
      method: 'get',
      url: 'cms/banner/publish'
    })
  },
  /* 获取首页的热门课程和名师 */
  getIndexAll() {
    return request({
      method: 'get',
      url: 'edu/front/index/all'
    })
  }

}