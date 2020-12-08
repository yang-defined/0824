<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="请选择" @change="qie">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item
          label="菜单图标"
          :label-width="formLabelWidth"
          v-if="form.type == 1"
        >
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option label="惊叹号" value="el-icon-warning">
              <i class="el-icon-warning"></i>
            </el-option>
            <el-option label="人物" value="el-icon-user-solid">
              <i class="el-icon-user-solid"></i>
            </el-option>
            <el-option label="铃铛" value="el-icon-message-solid">
              <i class="el-icon-message-solid"></i>
            </el-option>
            <el-option label="书签" value="el-icon-collection-tag">
              <i class="el-icon-collection-tag"></i>
            </el-option>
            <el-option label="图片" value="el-icon-picture">
              <i class="el-icon-picture"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
          <el-select v-model="form.url" placeholder="请选择活动区域">
            <el-option
              v-for="item in indexRouters"
              :key="item.path"
              :label="'/' + item.path"
              :value="item.name"
            ></el-option>
          </el-select>
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
        <el-button @click="hide()">取 消</el-button>
        <el-button type="success" @click="add" v-if="!info.show"
          >确认</el-button
        >
        <el-button type="primary" @click="modify" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { indexRouters } from "../../../router/index";
import {
  reqMenuAdd,
  reqMenuListOne,
  reqMenuModify,
  // requestMenuList
} from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  data() {
    return {
      form: {
        pid: "",
        title: "",
        type: 1,
        icon: "",
        url: "",
        status: 1,
      },
      indexRouters: indexRouters,
      formLabelWidth: "120px",
    };
  },
  methods: {
    hide() {
      this.info.isShow = false;
    },
    add() {
      reqMenuAdd(this.form).then((res) => {
        this.hide();
        this.requestMenuList()
      });
      
    },
    reset(){
      this.form= {
        pid: "",
        title: "",
        type: 1,
        icon: "",
        url: "",
        status: 1,
      }
    },
    qie() {
      this.form.pid == 0 ? (this.form.type = 1) : (this.form.type = 2);
    },
    look(id) {
      reqMenuListOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    modify() {
      reqMenuModify(this.form).then((res) => {
        this.hide();
        this.requestMenuList()
      });
    },
    ...mapActions({
      requestMenuList:'menu/requestMenuList'
    })
  },
  mounted() {
    
  },
};
</script>
<style scoped>
.box{
  margin-top: 10px;
}
</style>