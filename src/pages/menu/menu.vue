<template>
  <div>
    <el-button type="primary" class="btn" @click="btn"> 添加</el-button>
    <v-add :info="info" ref="one"></v-add>
    <v-list @add="add($event)"></v-list>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info: {
        isShow: false,
        show: false,
        title: "添加菜单",
      },
    };
  },
  methods: {
    btn() {
      this.info.isShow = !this.info.isShow;
      this.info.title = "添加菜单";
      this.$refs.one.reset();
    },
    add(e) {
      this.info = {
        isShow: true,
        show: true,
        title: "修改菜单",
      };
      this.$refs.one.look(e);
    },
  },
  mounted() {},
};
</script>
<style scoped>
.btn {
  margin-top: 20px;
}
</style>