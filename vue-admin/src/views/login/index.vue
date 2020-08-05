<template>
  <div id="login">
    <div class="box">
      <div class="title-box">
        <span
          v-for="item in meadTab"
          :key="item.index"
          :class="{ login: item.current }"
          @click="toggleMneu(item)"
          class="title"
          >{{ item.txt }}</span
        >
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm login-form"
      >
        <el-form-item prop="username">
          <label>邮箱</label>
          <el-input
            type="username"
            v-model="ruleForm.username"
            size="medium"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            size="medium"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input
                v-model.number="ruleForm.code"
                size="medium"
                maxlength="6"
                minlength="6"
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="sub">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            class="sub margint-top"
            @click="submitForm('ruleForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { stripscript } from "@/utils/validate";
export default {
  data() {
    // 用户名验证
    var validateUsername = (rule, value, callback) => {
      let Username = stripscript(value);
      this.ruleForm.username = Username;
      let res = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!res.test(value)) {
        callback(new Error("用户名输入不正确"));
      } else {
        callback();
      }
    };
    //密码验证
    var validatePassword = (rule, value, callback) => {
      let passwd = stripscript(value);
      this.ruleForm.passwd = passwd;
      let res = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,20}$/;
      console.log(res.test(value));
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!res.test(value)) {
        callback(new Error("密码输入格式有误"));
      } else {
        callback();
      }
    };
    //验证码验证
    var checCode = (rule, value, callback) => {
      let code = stripscript(value);
      this.ruleForm.code = code;
      e;
      let res = /^[a-z0-9]{6}$/;
      if (value === "") {
        callback(new Error("验证码为空"));
      } else if (!res.test(value)) {
        callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    return {
      meadTab: [
        { txt: "登录", current: true },
        { txt: "注册", current: false }
      ],
      ruleForm: {
        username: "",
        password: "",
        code: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        code: [{ validator: checCode, trigger: "blur" }]
      }
    };
  },
  methods: {
    toggleMneu(el) {
      this.meadTab.forEach(el => {
        el.current = false;
      });
      el.current = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
#login {
  height: 100vh;
  color: #fff;
  background-color: #344a5f;
}
.box {
  width: 368px;
  height: 452px;
  position: relative;
  left: 40%;
  top: 20%;
}
.title-box {
  text-align: center;
  .title {
    text-align: center;
    display: inline-block;
    width: 88px;
    height: 36px;
    border-radius: 2px;
    line-height: 36px;
    cursor: pointer;
  }
  .login {
    background-color: #2f4255;
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
  }
  .sub {
    width: 100%;
  }
  .margint-top {
    margin-top: 19px;
  }
}
.el-form-item {
  margin-bottom: 10px;
}
</style>
