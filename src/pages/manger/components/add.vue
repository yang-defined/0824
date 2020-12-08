<template>
  <div class="box">
    <el-dialog
      :title="info.show ? '管理员添加' : '管理员修改'"
      :visible.sync="info.isShow"
    >
      <el-form :model="form">
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            placeholder="请输入密码"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="success" @click="add" v-if="info.show">确认</el-button>
        <el-button type="primary" v-else @click="mdify">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import {
  reqManger,
  reqMangerListOne,
  reqMangerListMdify,
} from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
        status: 1,
        roleid: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    emit() {
      this.form = {
        username: "",
        password: "",
        status: 1,
        roleid: "",
      };
    },
    add() {
      reqManger(this.form).then((res) => {
        this.hide();
        this.requestMangerList();
        this.requestuserCount();
      });
    },
    mdify() {
      reqMangerListMdify(this.form).then((res) => {
        this.requestMangerList();
        this.hide();
      });
    },
    look(e) {
      reqMangerListOne({ uid: e }).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
        this.form.uid = e;
        this.info.isShow = true;
      });
    },
    hide() {
      this.info.isShow = false;
    },
    ...mapActions({
      requestRoleList: "role/requestRoleList",
      requestMangerList: "manger/requestMangerList",
      requestuserCount: "manger/requestuserCount",
      changeCurrentPages: "manger/changeCurrentPages",
    }),
  },
  mounted() {
    this.requestRoleList();
  },
  computed: {
    ...mapGetters({
      list: "role/list",
    }),
  },
};
</script>
<style>
</style>