<template>
  <div>
    <template>
      <el-table
        :data="list"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="id" label="分类编号" sortable width="180">
        </el-table-column>
        <el-table-column prop="catename" label="分类名称" sortable width="180">
        </el-table-column>
        <el-table-column  label="图片" sortable width="180">
            <template slot-scope="scope">
                <img :src="$preImg+scope.row.img" alt="">
            </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status == 1"
              >启用</el-button
            >
            <el-button type="info" v-else>禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleEdit(scope.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {reqClassifyListDel } from "@/util/request";
export default {
  components: {},
  data() {
    return {
    };
  },
  methods: {
    handleEdit(id) {
      this.$emit("add", id);
    },
    handleDelete(id) {
        reqClassifyListDel({id:id});
        this.requestClassifyListPaging();
    },
    ...mapActions({
        requestClassifyListPaging:'classify/requestClassifyListPaging'
    }),
  },
  mounted() {
    this.requestClassifyListPaging();
  },
  computed: {
    ...mapGetters({
      list: "classify/list"
    }),
  },
};
</script>
<style scoped>
img{
    width: 80px;
    height: 80px;
}
</style>