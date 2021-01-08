<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="javascript:void(0)" @click="searchAll()">全部</a>
                </li>
                <li
                  v-for="(one, index) in oneSubject"
                  :key="one.id"
                  :class="{ active: oneIndex == index }"
                >
                  <a
                    :title="one.title"
                    @click="getTwoSubject(one.id, index)"
                    href="javascript:void(0)"
                    >{{ one.title }}</a
                  >
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li
                  v-for="(two, index) in twoSubject"
                  :key="two.id"
                  :class="{ active: twoIndex == index }"
                >
                  <a
                    :title="two.title"
                    @click="selectTwoSubject(two.id, index)"
                    href="javascript:void(0)"
                    >{{ two.title }}
                  </a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{ 'current bg-orange': query.buyCountSort != '' }">
                <a
                  title="销量"
                  href="javascript:void(0);"
                  @click="searchBuyCount()"
                  >销量
                  <span :class="{ hide: query.buyCountSort == '' }">↓</span>
                </a>
              </li>
              <li :class="{ 'current bg-orange': query.gmtCreateSort != '' }">
                <a
                  title="最新"
                  href="javascript:void(0);"
                  @click="searchGmtCreate()"
                  >最新
                  <span :class="{ hide: query.gmtCreateSort == '' }">↓</span>
                </a>
              </li>
              <li :class="{ 'current bg-orange': query.priceSort != '' }">
                <a
                  title="价格"
                  href="javascript:void(0);"
                  @click="searchPrice()"
                  >价格&nbsp;
                  <span :class="{ hide: query.priceSort == '' }">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section v-if="total === 0" class="no-data-wrap">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam"
              >没有相关数据，小编正在努力整理中...</span
            >
          </section>
          <!-- /无数据提示 结束-->
          <article v-else class="comm-course-list">
            <ul class="of" id="bna">
              <li v-for="course in courses" :key="course.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img
                      :src="course.cover"
                      class="img-responsive"
                      :alt="course.title"
                    />
                    <div class="cc-mask">
                      <a
                        :href="'/course/' + course.id"
                        title="开始学习"
                        class="comm-btn c-btn-1"
                        >开始学习</a
                      >
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a
                      :href="'/course/' + course.id"
                      :title="course.title"
                      class="course-title fsize18 c-333"
                      >{{ course.title }}
                    </a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span
                      v-if="Number(course.price) === 0"
                      class="fr jgTag bg-green"
                    >
                      <i class="c-fff fsize12 f-fA">免费</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{ course.buyCount }} 人学习</i>
                      |
                      <i class="c-999 f-fA">{{ course.viewCount }} 评论</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a
              href="javascript:void(0)"
              @click="getCoursePageQuery(1)"
              title="首页"
              :class="{ undisable: !hasPrevious }"
              >首</a
            >
            <a
              href="javascript:void(0)"
              @click="getCoursePageQuery(current - 1)"
              title="前一页"
              :class="{ undisable: !hasPrevious }"
              >&lt;</a
            >
            <a
              href="javascript:void(0)"
              v-for="index in pages"
              :key="index"
              :title="'第' + index + '页'"
              @click="getCoursePageQuery(index)"
              :class="{
                current: current == index,
                undisable: current == index,
              }"
              >{{ index }}
            </a>
            <a
              href="javascript:void(0)"
              @click="getCoursePageQuery(current + 1)"
              title="后一页"
              :class="{ undisable: !hasNext }"
              >&gt;</a
            >
            <a
              href="javascript:void(0)"
              @click="getCoursePageQuery(pages)"
              title="末页"
              :class="{ undisable: !hasNext }"
              >末</a
            >
            <div class="clear"></div>
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import courseApi from "@/api/course";

export default {
  data() {
    return {
      /* 课程列表数据 */
      courses: [],
      /* 总记录数 */
      total: 0,
      /* 总页数 */
      pages: 1,
      /* 当前页 */
      current: 1,
      /* 当页显示数 */
      limit: 8,
      /* 是否可以点击下一页 */
      hasNext: false,
      /* 是否可以点击前一页 */
      hasPrevious: false,
      /* 查询条件对象 */
      query: {
        /* 一级分类id */
        subjectParentId: "",
        /* 二级分类id */
        subjectId: "",
        /* 关注度排序 */
        buyCountSort: "",
        /* 最新时间排序 */
        gmtCreateSort: "",
        /* 价格排序 */
        priceSort: "",
      },
      /* 一级分类数据 */
      oneSubject: [],
      /* 二级分类数据 */
      twoSubject: [],
      /* 当前选中的一级分类 */
      oneIndex: -1,
      /* 当前选中的二级分类 */
      twoIndex: -1,
    };
  },
  created() {
    this.getCoursePageQuery();
    this.getSubjectClassify();
  },
  methods: {
    /* 多条件组合查询课程信息 */
    getCoursePageQuery(current = 1) {
      this.current = current;
      // 调用api
      courseApi
        .getCoursePageQuery(this.current, this.limit, this.query)
        .then((res) => {
          // 设置课程数据
          this.courses = res.data.courses;
          this.total = res.data.total;
          this.pages = res.data.pages;
          this.current = res.data.pages;
          this.limit = res.data.size;
        });
    },
    /* 点击全部分类按钮 */
    searchAll() {
      // 清楚查询条件
      this.current = 1
      this.query.subjectParentId = ''
      this.query.subjectId = ''
      this.query.buyCountSort = ''
      this.query.gmtCreateSort = ''
      this.query.priceSort = ''
      this.oneIndex = -1
      this.twoIndex = -1
      this.twoSubject = []
      // 刷新数据
      this.getCoursePageQuery()
    },
    /* 查询课程分类一级信息 */
    getSubjectClassify() {
      // 调用api
      courseApi.getSubjectClassify().then((res) => {
        this.oneSubject = res.data.subjectClassify;
      });
    },
    /* 选中一级分类，查询课程分类二级信息 */
    getTwoSubject(oneId, index) {
      // 设置当前选中的一级分类
      this.oneIndex = index;
      // 遍历一级分类
      this.oneSubject.forEach((one) => {
        // 判断一级id
        if (one.id === oneId) {
          // 设置二级分类数据
          this.twoSubject = one.children;
        }
      });
      // 设置查询对象的一级分类id
      this.query.subjectParentId = oneId;
      // 清楚查询对象的二级分类id
      this.twoIndex = -1;
      this.query.subjectId = "";
      // 刷新数据
      this.getCoursePageQuery();
    },
    /* 选中二级分类 */
    selectTwoSubject(twoId, index) {
      // 设置查询对象的二级分类id
      this.query.subjectId = twoId;
      // 设置当前选中的二级分类
      this.twoIndex = index;
      // 刷新数据
      this.getCoursePageQuery();
    },
    /* 关注度排序 */
    searchBuyCount() {
      // 设置关注度排序
      this.query.buyCountSort = '1'
      // 清楚时间和价格排序
      this.query.gmtCreateSort = ''
      this.query.priceSort = ''
    },
    /* 最新时间排序 */
    searchGmtCreate() {
      // 设置最新时间排序
      this.query.gmtCreateSort = '1'
      // 清楚关注度、价格排序
      this.query.buyCountSort = ''
      this.query.priceSort = ''
    },
    /* 价格排序 */
    searchPrice() {
      // 设置价格排序
      this.query.priceSort = '1'
      // 请求关注度、时间排序
      this.query.buyCountSort = ''
      this.query.gmtCreateSort = ''
    }
  },
};
</script>

<style scoped>
.active {
  background: #bdbdbd;
}
.hide {
  display: none;
}

.show {
  display: block;
}
</style>