<template>
  <div class="box">
    <el-dialog
      :title="info.show ? '角色添加' : '角色修改'"
      :visible.sync="info.isShow"
    >
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="form.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="list"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="defaultProps"
          >
          </el-tree>
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
  reqRoleAdd,
  reqRoleListOne,
  reqRoleListMdify,
} from "../../../util/request";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        rolename: "",
        menus: [],
        status: 1,
      },
      formLabelWidth: "120px",
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      requestMenuList: "menu/requestMenuList",
      requestRoleList: "role/requestRoleList",
    }),
    emit() {
      this.form = {
        rolename: "",
        menus: [],
        status: 1,
      };
      this.$nextTick(() => {
         this.$refs.tree.setCheckedKeys([]);
      });
    },
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then((res) => {
        this.hide();
        this.requestRoleList();
      });
    },
    hide() {
      this.info.isShow = false;
    },
    look(id) {
      reqRoleListOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.$nextTick(() => {
          this.form.menus = this.$refs.tree.setCheckedKeys(
            JSON.parse(this.form.menus)
          );
        });
        this.info.isShow = true;
        this.form.id = id;
      });
    },
    mdify() {
      this.form.menus = JSON.stringify(this.form.menus);
      reqRoleListMdify(this.form).then((res) => {
        this.hide();
        this.requestRoleList();
      });
    },
  },
  mounted() {
    if (this.list.length <= 0) {
      this.requestMenuList();
    }
  },
};
</script>
<style>
.box {
  margin-top: 10px;
}
</style>