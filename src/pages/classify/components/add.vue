<template>
  <div class="box">
    <el-dialog
      :title="info.show ? '商品分类添加' : '商品分类修改'"
      :visible.sync="info.isShow"
    >
      <el-form :model="form">
        <el-form-item label="上级分类" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="form.catename"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="handleAvatarSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
  reqClassify,
  reqClassifyListOne,
  reqClassifyListMdify,
} from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      imageUrl: "",
      form: {
        pid: 0,
        catename: "",
        status: 1,
        img: null,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    emit() {
      this.form = {
        pid: 0,
        catename: "",
        status: 1,
        img: null,
      };
      this.imageUrl= ""
    },
    add() {
      reqClassify(this.form).then((res) => {
        this.requestClassifyListPaging();
        this.hide();
      });
    },
    mdify() {
      reqClassifyListMdify(this.form).then((res) => {
        this.requestClassifyListPaging();
        this.hide();
      });
    },
    look(id) {
      reqClassifyListOne({ id: id }).then((res) => {
        console.log(res);
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$preImg + res.data.list.img;
        this.info.isShow = true;
      });
    },
    hide() {
      this.info.isShow = false;
    },
    handleAvatarSuccess(e) {
      var file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      console.log(this.imageUrl);
      this.form.img = file;
    },
    ...mapActions({
      requestClassifyListPaging: "classify/requestClassifyListPaging",
    }),
  },
  mounted() {
    this.requestClassifyListPaging();
  },
  computed: {
    ...mapGetters({
      list: "classify/list",
    }),
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  border: 1px dashed #d9d9d9;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>