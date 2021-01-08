<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
      <header class="comm-title all-teacher-title">
        <h2 class="fl tac">
          <span class="c-333">全部讲师</span>
        </h2>
        <section class="c-tab-title">
          <a id="subjectAll" title="全部" href="#">全部</a>
          <!-- <c:forEach var="subject" items="${subjectList }">
                            <a id="${subject.subjectId}" title="${subject.subjectName }" href="javascript:void(0)" onclick="submitForm(${subject.subjectId})">${subject.subjectName }</a>
          </c:forEach>-->
        </section>
      </header>
      <section class="c-sort-box unBr">
        <div>
          <!-- /无数据提示 开始-->
          <section v-if="teachers.length === 0" class="no-data-wrap">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam"
              >没有相关数据，小编正在努力整理中...</span
            >
          </section>
          <!-- /无数据提示 结束-->

          <article v-else class="i-teacher-list">
            <ul class="of">
              <li v-for="teacher in teachers" :key="teacher.id">
                <section class="i-teach-wrap">
                  <div class="i-teach-pic">
                    <a
                      :href="'/teacher/' + teacher.id"
                      :title="teacher.name"
                      target="_blank"
                    >
                      <img :src="teacher.avatar" :alt="teacher.name" />
                    </a>
                  </div>
                  <div class="mt10 hLh30 txtOf tac">
                    <a
                      :href="'/teacher/' + teacher.id"
                      :title="teacher.name"
                      target="_blank"
                      class="fsize18 c-666"
                      >{{ teacher.name }}
                    </a>
                  </div>
                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999">
                      {{ teacher.intro }}
                    </span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{ teacher.career }}</p>
                  </div>
                </section>
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
              @click="getTeacherPage(1)"
              title="首页"
              :class="{ undisable: !hasPrevious }"
              >首</a
            >
            <a
              href="javascript:void(0)"
              @click="getTeacherPage(current - 1)"
              title="前一页"
              :class="{ undisable: !hasPrevious }"
              >&lt;</a
            >
            <a
              href="javascript:void(0)"
              v-for="index in pages"
              :key="index"
              :title="'第' + index + '页'"
              @click="getTeacherPage(index)"
              :class="{
                current: current == index,
                undisable: current == index,
              }"
              >{{ index }}
            </a>
            <a
              href="javascript:void(0)"
              @click="getTeacherPage(current + 1)"
              title="后一页"
              :class="{ undisable: !hasNext }"
              >&gt;</a
            >
            <a
              href="javascript:void(0)"
              @click="getTeacherPage(pages)"
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
    <!-- /讲师列表 结束 -->
  </div>
</template>
<script>
import teacherApi from "@/api/teacher";

export default {
  data() {
    return {
      /* 名师列表数据 */
      teachers: [],
      /* 当前页 */
      current: 1,
      /* 当页显示数 */
      limit: 8,
      /* 总页数 */
      pages: 0,
      /* 总记录数 */
      total: 0,
      /* 是否可以点击下一页 */
      hasNext: false,
      /* 是否可以点击前一页 */
      hasPrevious: false,
    };
  },
  created() {
    this.getTeacherPage();
  },
  methods: {
    /* 获取名师分页数据 */
    getTeacherPage(current = 1) {
      this.current = current;
      // 调用获取名师数据api
      teacherApi.getTeacherPage(this.current, this.limit).then((res) => {
        // 设置名师列表数据
        this.teachers = res.data.teachers;
        // 设置总页数
        this.pages = res.data.pages;
        // 设置总记录数
        this.total = res.data.total;
        this.hasNext = res.data.hasNext;
        this.hasPrevious = res.data.hasPrevious;
      });
    },
  },
};
</script>