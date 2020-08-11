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
        <el-form-item prop="password2" v-show="mode === 'register'">
          <label>重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password2"
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
import {
  stripscript,
  validateUser,
  ChecCode,
  validatePass
} from "@/utils/validate";
export default {
  data() {
    // 用户名验证
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateUser(value)) {
        callback(new Error("用户名输入格式错误"));
      } else {
        callback();
      }
    };
    //密码验证
    var validatePassword = (rule, value, callback) => {
      let passwd = stripscript(value);
      this.ruleForm.passwd = passwd;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(passwd)) {
        callback(new Error("密码输入格式有误"));
      } else {
        callback();
      }
    };
    var validatePassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请重新输入密码"));
      } else if (this.ruleForm.password !== value) {
        callback(new Error("两次密码不一样重新输入"));
      } else {
        callback();
      }
    };
    //验证码验证
    var checCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("验证码为空"));
      } else if (ChecCode(value)) {
        callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    return {
      meadTab: [
        { txt: "登录", current: true, type: "login" },
        { txt: "注册", current: false, type: "register" }
      ],
      ruleForm: {
        username: "",
        password: "",
        password2: "",
        code: ""
      },
      mode: "login",
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        password2: [{ validator: validatePassword2, trigger: "blur" }],
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
      this.mode = el.type;
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
