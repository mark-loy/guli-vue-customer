import request from '@/utils/request'

export default {
  /* 分页查询名师列表页信息 */
  getTeacherPage(current, limit) {
    return request({
      method: 'get',
      url: `edu/front/teacher/${current}/${limit}`
    })
  },
  /* 根据id查询名师详情页信息 */
  getTeacherDetail(id) {
    return request({
      method: 'get',
      url: `edu/front/teacher/${id}`
    })
  }
}