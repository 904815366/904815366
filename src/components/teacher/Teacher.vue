<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        ><router-link to="/teacher">讲师管理</router-link></el-breadcrumb-item
      >
      <el-breadcrumb-item>讲师列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索栏 -->
    <el-row style="margin-top: 10px">
      <el-col :span="8">
        <el-input v-model="searchName" placeholder="请输入内容">
          <!-- 放大镜按钮 -->
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="findTeacherList(1)"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="8" style="margin-left: 10px"
        ><el-button type="success" @click="comName = 'addTeacher'"
          >添加讲师</el-button
        ></el-col
      >
      <el-col :span="8"></el-col>
    </el-row>
    <!-- 
      讲师列表的数据表格
      :data动态绑定属性--数组
      el-table-column 表列  
    -->
    <el-table :data="teacherData" style="width: 100%; margin-top: 10px">
      <el-table-column
        type="index"
        :index="indexMethod"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column prop="education" label="毕业院校" width="120"></el-table-column>
      <el-table-column
        prop="career"
        label="教育经历"
        width="140"
        align="center"
      ></el-table-column>
      <el-table-column label="是否名师" width="100" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isfamous == 'y' ? 'success' : 'danger'">
            {{ scope.row.isfamous == "y" ? "是" : "否" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="任课科目" width="100" align="center">
        <template slot-scope="scope">
          <span v-for="subject in subjectData" :key="subject.id">
            <span v-if="subject.id == scope.row.subjectid">{{ subject.name }}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="入职日期" width="140" align="center">
        <!-- 插槽 scope.row表示当前表格行中的对象 -->
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.hiredate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="在职状态" width="120" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status == 'y' ? 'success' : 'danger'">
            <span>{{ scope.row.status == "y" ? "在职" : "离职" }}</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件
background 是否显示背景色
layout表示显示分页的布局组件 
prev 上一页 next下一页 pager导航页码 sizes 每页记录数
:total设置总记录数
:page-size每页记录数
:current-page当前页码
-->
    <el-pagination
      :background="true"
      layout="prev, pager, next,sizes,jumper,->,total"
      prev-text="上一页"
      next-text="下一页"
      :page-sizes="[5, 10, 15, 20, 25, 30, 35, 40, 45, 50]"
      :page-size="pageInfo.pageSize"
      :current-page="pageInfo.pageNum"
      :total="pageInfo.total"
      @size-change="hanleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <!-- 显示子组件 -->
    <component
      :is="comName"
      :subjectData="subjectData"
      :objTeacher="teacher"
      @func="handleShow"
    ></component>
  </div>
</template>

<script>
//导入子组件
import addTeacher from "./AddTeacher.vue";
import editTeacher from "./EditTeacher.vue";

export default {
  data() {
    return {
      searchName: "",
      teacherData: [],
      subjectData: [],
      pageInfo: [],
      pageNum: 1,
      pageSize: 5,
      comName: "",
      teacher: {}, //用于存放要编辑的讲师
    };
  },
  components: {
    //注册子组件
    addTeacher,
    editTeacher,
  },
  methods: {
    //为type=index 属性指定生成规则
    indexMethod(index) {
      return index + 1 + this.pageSize * (this.pageInfo.pageNum - 1);
    },
    handleShow() {
      this.comName = "";
    },
    //处理'编辑'
    handleEdit(row) {
      this.teacher = row;
      this.comName = "editTeacher";
    },
    //处理'删除'
    handleDelete(id) {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发送 axios请求
          this.$axios
            .get("/api/teacher/delete", {
              params: { id: id },
            })
            .then((res) => {
              console.log(res.data);
              if (res.data.status == 200) {
                this.$message({
                  type: "success",
                  message: "删除讲师成功!",
                  offset: 300,
                  duration: 1000, //显示的时间,ms
                });
                //删除后刷新列表
                this.findTeacherList(1);
              } else if (res.data.status == 4001) {
                this.$message({
                  type: "error",
                  message: res.data.msg,
                  offset: 500,
                  duration: 1000, //显示的时间,ms
                });
              }
            })
            .catch(() => {
              alert("error");
            });
        })
        .catch(() => {});
    },
    //获取讲师列表
    findTeacherList(pno) {
      this.$axios
        .get("api/teacher/list?", {
          params: {
            name: this.searchName,
            pageNum: pno,
            pageSize: this.pageSize,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.pageInfo = res.data.data;
          this.teacherData = this.pageInfo.list;
        })
        .catch((e) => {
          this.$message({
            showClose: true,
            message: "寄!",
            type: "error",
            offset: 550,
            duration: 1000, //显示的时间
          });
        });
    },
    //查询科目列表
    findSubjectList() {
      this.$axios
        .get("/api/subject/list")
        .then((res) => {
          console.log(res.data);
          this.subjectData = res.data.data;
        })
        .catch((e) => {
          this.$message({
            showClose: true,
            message: "g!",
            type: "error",
            offset: 550,
            duration: 1000, //显示的时间,ms
          });
        });
    },
    //页尺寸改变
    hanleSizeChange(pSize) {
      console.log(pSize);
      this.pageSize = pSize;
      this.findTeacherList(1);
    },
    //当前页改变
    handleCurrentChange(pNum) {
      this.pageNum = pNum;
      this.findTeacherList(pNum);
    },
  },
  created() {
    this.findTeacherList(1);
    this.findSubjectList();
  },
};
</script>

<style scoped lang="less">
.el-breadcrumb {
  background: #d4dae0;
  padding-left: 20px;
  height: 40px;
  line-height: 40px;
}
</style>
