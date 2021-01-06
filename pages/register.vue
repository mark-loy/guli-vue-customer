<template>
  <div class="main">
    <div class="title">
      <a href="/login">登录</a>
      <span>·</span>
      <a class="active" href="/register">注册</a>
    </div>
    <div class="sign-up-container">
      <div>
        <!-- 注册表单 -->
        <el-form ref="userForm" :model="register">
          <el-form-item
            class="input-prepend restyle"
            prop="nickName"
            :rules="[
              { required: true, message: '请输入你的昵称', trigger: 'blur' },
            ]"
          >
            <el-input
              type="text"
              placeholder="你的昵称"
              v-model="register.nickName"
            />
            <i class="iconfont icon-user" />
          </el-form-item>
          <el-form-item
            class="input-prepend restyle no-radius"
            prop="mobile"
            :rules="[
              { required: true, message: '请输入手机号码', trigger: 'blur' },
              { validator: checkPhone, trigger: 'blur' },
            ]"
          >
            <el-input
              type="text"
              placeholder="手机号"
              v-model="register.mobile"
            />
            <i class="iconfont icon-phone" />
          </el-form-item>
          <el-form-item
            class="input-prepend restyle no-radius"
            prop="code"
            :rules="[
              { required: true, message: '请输入验证码', trigger: 'blur' },
            ]"
          >
            <div
              style="
                width: 100%;
                display: block;
                float: left;
                position: relative;
              "
            >
              <el-input
                type="text"
                placeholder="验证码"
                v-model="register.code"
              />
              <i class="iconfont icon-phone" />
            </div>
            <div
              class="btn"
              style="position: absolute; right: 0; top: 6px; width: 40%"
            >
              <a
                href="javascript:"
                type="button"
                @click="getCodeFun()"
                :value="codeText"
                style="border: none; background-color: none"
                >{{ codeText }}</a
              >
            </div>
          </el-form-item>
          <el-form-item
            class="input-prepend"
            prop="password"
            :rules="[
              { required: true, message: '请输入密码', trigger: 'blur' },
            ]"
          >
            <el-input
              type="password"
              placeholder="设置密码"
              v-model="register.password"
            />
            <i class="iconfont icon-password" />
          </el-form-item>
        </el-form>
      </div>

      <!-- 提交注册信息按钮 -->
      <div class="btn">
        <input
          type="button"
          class="sign-up-button"
          value="注册"
          @click="submitRegister()"
        />
      </div>
      <p class="sign-up-msg">
        点击 “注册” 即表示您同意并愿意遵守简书
        <br />
        <a target="_blank" href="http://www.jianshu.com/p/c44d171298ce"
          >用户协议</a
        >
        和
        <a target="_blank" href="http://www.jianshu.com/p/2ov8x3">隐私政策</a>
        。
      </p>

      <!-- 更多注册方式 -->
      <div class="more-sign">
        <h6>社交帐号直接注册</h6>
        <ul>
          <li>
            <a
              id="weixin"
              class="weixin"
              target="_blank"
              href="http://192.168.166.128:88/api/ucenter/wx/code"
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

import ucenterApi from "@/api/ucenter";
import smsApi from "@/api/sms";

export default {
  layout: "sign",
  data() {
    return {
      /* 注册表单 */
      register: {
        mobile: "",
        code: "",
        nickName: "",
        password: "",
      },
      /* 控制发送验证码按钮状态 */
      sending: true,
      /* 验证码倒计时 */
      second: 60,
      /* 验证码文本 */
      codeText: "获取验证码",
    };
  },
  methods: {
    /* 获取验证码 */
    getCodeFun() {
      if (this.register.mobile === "") {
        // 提示
        return this.$message.error("请先填写手机号");
      }
      // 调用获取验证码api
      smsApi.sendVerifyCode(this.register.mobile).then((res) => {
        // 提示
        this.$message.success(res.message);
        // 禁用验证码按钮
        this.sending = false;
        // 调用验证码定时器
        this.timer();
      });
    },
    /* 用户提交注册信息 */
    submitRegister() {
      // 校验表单信息
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          // 校验成功，调用注册api
          ucenterApi.memberRegister(this.register).then((res) => {
            // 提示
            this.$message.success("注册成功");
            // 路由跳转到登录页
            this.$router.push("/login");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /* 验证码定时器 */
    timer() {
      // 调用定时器方法
      let result = setInterval(() => {
        // 减少倒计时
        --this.second;
        // 设置验证码按钮文本
        this.codeText = this.second;

        // 判断倒计时
        if (this.second < 1) {
          // 清除倒计时
          clearInterval(result);
          // 启用验证码按钮
          this.sending = true;
          // 设置验证码文本
          this.codeText = "获取验证码";
          // 还原倒计时
          this.second = 60;
        }
      }, 1000);
    },
    /* 验证手机号 */
    checkPhone(rule, value, callback) {
      if (!/^1[34578]\d{9}$/.test(value)) {
        return callback(new Error("手机号码格式不正确"));
      }
      return callback();
    },
  },
};
</script>