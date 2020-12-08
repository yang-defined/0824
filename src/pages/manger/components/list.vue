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
        <el-table-column prop="id" label="用户编号" sortable width="180">
        </el-table-column>
        <el-table-column prop="username" label="用户名" sortable width="180">
        </el-table-column>
        <el-table-column prop="rolename" label="所属角色" sortable width="180">
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
            <el-button type="primary" @click="handleEdit(scope.row.uid)"
              >编辑</el-button
            >
            <el-button type="danger" @click="handleDelete(scope.row.uid)"
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
import { mapGetters, mapActions } from "vuex";
import { reqMangerList, reqMangerListDel } from "@/util/request";
export default {
  components: {},
  data() {
    return {
      content: 0,
    };
  },
  methods: {
    handleEdit(uid) {
      this.$emit("add", uid);
    },
    handleDelete(uid) {
      reqMangerListDel({ uid: uid }).then((res) => {
        this.changeCurrentPages(1);
        this.requestMangerList();
        this.requestuserCount();
      });
    },
    ...mapActions({
      requestMangerList: "manger/requestMangerList",
      requestuserCount: "manger/requestuserCount",
      changeCurrentPages: "manger/changeCurrentPages",
    }),
    ye(p) {
      this.$store.state.manger.page = p;
      this.requestMangerList();
    },
  },
  mounted() {
    this.requestMangerList();
    this.requestuserCount();
  },
  computed: {
    ...mapGetters({
      list: "manger/list",
      page: "manger/page",
      size: "manger/size",
      total: "manger/total",
    }),
  },
};
</script>
<style>
</style>