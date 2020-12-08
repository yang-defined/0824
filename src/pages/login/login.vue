<template>
  <div class="box">
    <div class="login">
      <h2>登录</h2>
      <div>
        <input type="text" placeholder="请输入用户名" v-model="form.username" />
      </div>
      <div>
        <input
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
        />
      </div>
      <button @click="login">登录</button>
    </div>
  </div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
import { reqMangerLogin } from "../../util/request";
export default {
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      reqMangerLogin(this.form).then((res) => {
        alert(res.data.msg);
        if (res.data.msg == "登录成功") {
          this.requestuserList(res.data.list);
          this.$router.push("/index/home");
        }
      });
    },
    ...mapActions({
      requestuserList:'user/requestuserList'
    })
  },
  mounted() {},
};
</script>
<style scoped>
.box {
  width: 100vw;
  height: 100vh;
  text-align: center;
  background: linear-gradient(to right, #563443, #303d60);
}
.login {
  width: 500px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
}
::-webkit-input-placeholder {
  color: #dccfcc;
  font-size: 14px;
}
input {
  width: 300px;
  height: 40px;
  padding-left: 15px;
  font-size: 18px;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
  margin-top: 20px;
}
button {
  width: 315px;
  height: 40px;
  background-color: #409eff;
  border: none;
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  margin-top: 20px;
}
h2 {
  margin-top: 30px;
}
</style>