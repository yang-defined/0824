<template>
  <div>
    <el-button type="primary" class="btn" @click="btn"> 添加</el-button>
      <v-list @add='add($event)'></v-list>
      <v-add :info='info' ref="one"></v-add>
  </div>
</template>
<script>
import vList from './components/list'
import vAdd from './components/add'
export default {
  components: {
    vList,
    vAdd
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
      this.info.isShow = !this.info.isShow
      this.info.show=true
      this.$refs.one.emit()
    },
    add(e){
      this.$refs.one.look(e)
       this.info.show=false
    }
  },
  mounted() {
    
  },
};
</script>
<style scoped>
.btn{
  margin-top: 10px;
}
</style>