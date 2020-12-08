<template>
  <div class="box">
    <template>
      <el-table
        :data="list"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="id" label="规格编号" sortable width="180">
        </el-table-column>
        <el-table-column prop="specsname" label="规格名称" sortable width="180">
        </el-table-column>
        <el-table-column prop="rolename" label="规格属性" sortable width="280">
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.attrs" :key="item">
            {{item}}
          </el-tag>
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
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="size"
        :current-page="page"
        @current-change="ye"
      >
      </el-pagination>
    </template>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqRoleListOne, reqSpecsListDel } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "specs/list",
      page: "specs/page",
      size: "specs/size",
      total: "specs/total",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    handleDelete(id) {
      reqSpecsListDel({id:id}).then((res) => {
       this.requestSpecsList();
       this.requestSpecsCount()
       this.changeCurrentPages(1)
      });
    },
    handleEdit(id) {
      this.$emit("add", id);
    },
    ...mapActions({
      requestSpecsList: "specs/requestSpecsList",
      requestSpecsCount: "specs/requestSpecsCount",
      changeCurrentPages: "specs/changeCurrentPages",
    }),
    ye(e){
      this.changeCurrentPages(e)
    }
  },
  mounted() {
    this.requestSpecsList()
    this.requestSpecsCount()
  },
};
</script>
<style>
</style>