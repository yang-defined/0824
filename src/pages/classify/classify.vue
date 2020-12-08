<template>
  <div>
    <el-button type="primary" class="btn" @click="btn"> 添加</el-button>
      <v-add :info='info' ref="one"></v-add>
      <v-list @add='add'></v-list>
  </div>
</template>
<script>
import vAdd from './components/add'
import vList from './components/list'
export default {
  components: {
    vAdd,
    vList
  },
  data() {
    return {
      info:{
        isShow:false,
        show:true
      }
    };
  },
  methods: {
    btn(){
      this.info.isShow=!this.info.isShow
      this.info.show = true
      this.$refs.one.emit()
    },
    add(e){
      this.$refs.one.look(e)
      this.info.show = false
    }
  },
  mounted() {},
};
</script>
<style scoped>
.btn{
  margin-top: 10px;
}
</style>