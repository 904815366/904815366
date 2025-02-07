<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8" class="col_l"><img src="../../assets/logo.jpg" /></el-col>
        <el-col :span="8"><h1>WoniuK15教育-后台管理系统</h1></el-col>
        <el-col :span="8" class="col_r">
          <span style="color: #fff">您好，{{ username }}</span
          >&nbsp;&nbsp;
          <el-button type="danger" size="small" @click="logout()">退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-menu-item index="/homeContent">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span slot="title">讲师管理</span>
            </template>
            <el-menu-item index="/teacher">
              <i class="el-icon-menu"></i>
              <span slot="title">讲师列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-upload"></i>
              <span slot="title">课程管理</span>
            </template>
            <el-menu-item index="/course">
              <i class="el-icon-collection-tag"></i>
              <span slot="title">课程列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item index="/userList">
              <i class="el-icon-s-promotion"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="4">
            <i class="el-icon-picture"></i>
            <span slot="title">图形报表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      username: "",
    };
  },
  created() {
    this.username = window.sessionStorage.getItem("username");
  },
  methods: {
    logout() {
      this.$confirm("此操作将退出系统,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "欢迎下次光临!",
          });
          //移除localStorage里面的"strToken"
          window.localStorage.removeItem("strToken");
          window.sessionStorage.removeItem("username");
          //路由到登录
          this.$router.push("/login");
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background: #632c90;
  padding: 0;
  h1 {
    color: #fff;
    text-align: center;
    line-height: 60px;
    font-size: 26px;
  }
  .col_r {
    line-height: 60px;
    text-align: right;
    padding-right: 30px;
    a {
      color: #daa520;
    }
  }
  .col_l {
    text-align: left;
  }
}
.el-aside {
  background: #545c64;
}

.el-main {
  background: #eaeef1;
}
</style>
