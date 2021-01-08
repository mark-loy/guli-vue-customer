import request from '@/utils/request'

export default {
  /* 多条件组合分页查询课程信息 */
  getCoursePageQuery(current, limit, query) {
    return request({
      method: 'post',
      url: `edu/front/course/${current}/${limit}`,
      data: query
    })
  },
  /* 查询课程详情信息 */
  getCourseDetail(id) {
    return request({
      method: 'get',
      url: `edu/front/course/${id}`
    })
  },
  /* 查询课程分类信息 */
  getSubjectClassify() {
    return request({
      method: 'get',
      url: 'edu/subject/list'
    })
  }
}