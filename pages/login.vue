<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>
    <div class="sign-up-container">
      <div>
        <el-form ref="userForm" :rules="userRule" :model="user">
          <el-form-item class="input-prepend restyle" prop="mobile">
            <div>
              <el-input
                type="text"
                placeholder="手机号"
                v-model="user.mobile"
              />
              <i class="iconfont icon-phone" />
            </div>
          </el-form-item>

          <el-form-item class="input-prepend" prop="password">
            <div>
              <el-input
                type="password"
                placeholder="密码"
                v-model="user.password"
              />
              <i class="iconfont icon-password" />
            </div>
          </el-form-item>
        </el-form>
      </div>

      <div class="btn">
        <input
          type="button"
          class="sign-in-button"
          value="登录"
          @click="submitLogin()"
        />
      </div>

      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li>
            <a
              id="weixin"
              class="weixin"
              target="_blank"
              href="http://qy.free.idcfengye.com/api/ucenter/weixinLogin/login"
              ><i class="iconfont icon-weixin"
            /></a>
          </li>
          <li>
            <a id="qq" class="qq" target="_blank" href="#"
              ><i class="iconfont icon-qq"
            /></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import "~/assets/css/sign.css";
import "~/assets/css/iconfont.css";

import cookie from 'js-cookie'
import ucenterApi from "@/api/ucenter";

export default {
  layout: "sign",
  data() {
    /* 验证手机号 */
    var checkPhone = (rule, value, callback) => {
      if (!/^1[34578]\d{9}$/.test(value)) {
        return callback(new Error("手机号码格式不正确"));
      }
      return callback();
    };
    return {
      /* 登录表单 */
      user: {
        mobile: "",
        password: "",
      },
      /* 登录表单验证规则 */
      userRule: {
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    /* 用户登录 */
    submitLogin() {
      // 校验表单信息
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          // 校验成功，调用注册api
          ucenterApi.memberLogin(this.user).then((res) => {
            // 提示
            this.$message.success("登录成功");
            // 获取token
            const token = res.data.token
            // 将token存入cookie
            cookie.set("token", token, {domain: 'localhost'})

            // 调用获取用户信息api
            ucenterApi.getMemberBytoken().then(res => {
              // 将用户信息存入cookie
              cookie.set("member", res.data.member, {domain: 'localhost'})
              // 路由跳转到首页
              window.location.href = "/"
            })
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
