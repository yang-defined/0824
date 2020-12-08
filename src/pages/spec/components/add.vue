<template>
  <div class="box">
    <el-dialog
      :title="info.show ? '商品规格添加' : '商品规格修改'"
      :visible.sync="info.isShow"
    >
      <el-form :model="form">
        <el-form-item label="规格名称" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          :label-width="formLabelWidth"
          v-for="(item, index) in arr"
          :key="index"
        >
          <el-input
            autocomplete="off"
            v-model="item.value"
            class="inp1"
          ></el-input>
          <el-button type="primary" @click="nww" v-if="index == 0"
            >新增规格属性</el-button
          >
          <el-button type="danger" @click="delArr(index)" v-else>删除</el-button>
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
  reqSpecs,
  reqSpecsListOne,
  reqSpecsListMdify
} from "../../../util/request";
export default {
  props: ["info"],
  data() {
    return {
      arr: [{value:''}],
      form: {
        specsname: "",
        attrs: [],
        status: 1,
        name: "",
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
  },
  methods: {
    ...mapActions({
      requestSpecsList: "specs/requestSpecsList",
      requestSpecsCount: "specs/requestSpecsCount",
    }),
    emit() {
      this.form = {
        specsname: "",
        attrs: [],
        status: 1,
        name: "",
      };
      this.arr=[{value:''}]
    },
    add() {
      this.form.attrs = JSON.stringify(this.arr.map(item=>{return item.value}))
      reqSpecs(this.form).then((res) => {
        this.hide();
        this.requestSpecsList()
        this.requestSpecsCount()
      });
    },
    nww() {
      this.arr.push({value:''});
    },
    delArr(index){
      this.arr.splice(index,1)
    },
    hide() {
      this.info.isShow = false;
    },
    look(id) {
      reqSpecsListOne({ id: id }).then(res => {
        this.form = res.data.list[0];
        this.arr = JSON.parse(this.form.attrs).map(item=>{return {value:item}})
        this.info.isShow = true;
        this.form.id = id;
      });
    },
    mdify() {
      this.form.attrs = JSON.stringify(this.arr.map(item=>{return item.value}))
      reqSpecsListMdify(this.form).then((res) => {
        this.hide();
        this.requestSpecsList()
      });
    },
  },
  mounted() {
  },
};
</script>
<style scoped>
.box {
  margin-top: 10px;
}
.inp1 {
  width: 74.1%;
}
.inp2 {
  width: 85.5%;
}
</style>