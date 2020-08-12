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
        <el-form-item prop="password2" v-show="model === 'register'">
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
              <el-button type="success" class="sub" @click="getsms()">
                获取验证码
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            class="sub margint-top"
            @click="submitForm('ruleForm')"
            disabled
          >
            {{ model === "login" ? "登录" : "注册" }}</el-button
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
//引用axios
// import axios from "axios";
// 模块化思想使用单独封装请求功能的service
import { GetSms } from "@/api/login";
//引用vue3.0 composition-api
import { reactive, ref, onMounted } from "@vue/composition-api";
export default {
  // eslint-disable-next-line no-unused-vars
  //vue3.0将所有的data数据、生命周期函数、自定义函数存在setup中
  setup(props, { refs, root }) {
    //定义函数的地方
    // ref中存取基本数据类型
    // 注意要先函数在变量不然会出现不可预知的错误。
    const toggleMneu = data => {
      meadTab.forEach(el => {
        el.current = false;
      });
      data.current = true;
      model.value = data.type;
    };
    //登录函数
    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          console.log("挂在完成后");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
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
    let validatePassword = (rule, value, callback) => {
      let passwd = stripscript(value);
      ruleForm.passwd = passwd;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(passwd)) {
        callback(new Error("密码输入格式有误"));
      } else {
        callback();
      }
    };
    //验证密码两次输入正确不
    let validatePassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请重新输入密码"));
      } else if (ruleForm.password !== value) {
        callback(new Error("两次密码不一样重新输入"));
      } else {
        callback();
      }
    };
    //验证码验证
    let checCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("验证码为空"));
      } else if (ChecCode(value)) {
        callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    // 获取验证码
    let getsms = () => {
      if (ruleForm.username == "") {
        root.$message.error("邮箱不能为空！！");
        return false;
      }
      if (validateUser(ruleForm.username)) {
        root.$message.error("邮箱格式有误，请重新输入！！");
        return false;
      }
      let requestData = {
        username: ruleForm.username,
        module: "login"
      };
      GetSms(requestData)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    };
    // reactive中存取引用数据类型
    //存放数据的地方
    const meadTab = reactive([
      { txt: "登录", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" }
    ]);
    const ruleForm = reactive({
      username: "",
      password: "",
      password2: "",
      code: ""
    });
    const model = ref("login");
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      password2: [{ validator: validatePassword2, trigger: "blur" }],
      code: [{ validator: checCode, trigger: "blur" }]
    });
    // 生命周期函数
    onMounted(() => {
      //拿到开发者模式中值的方法
      // console.log(process.env.VUE_APP_HTTP);
    });
    //返回出去
    return {
      meadTab,
      model,
      rules,
      submitForm,
      ruleForm,
      toggleMneu,
      getsms
    };
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
