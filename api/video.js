import request from '@/utils/request'

export default {
  /* 获取视频的播放凭证 */
  getVideoPlayCode(vid) {
    return request({
      method: 'get',
      url: `vod/auth/${vid}`
    })
  }
}