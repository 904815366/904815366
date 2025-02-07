<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8" class="col_l"> <img src="../../assets/logo.jpg" /> </el-col>
        <el-col :span="8"><h1>WoniuK15教育-后台管理系统</h1></el-col>
        <el-col :span="8" class="col_r">
          <span style="color: #fff"> 您好，{{ username }} </span>&nbsp;&nbsp;
          <el-button type="danger" size="small" @click="logout()">退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="210px">
        <!-- 
          el-menu 表示菜单
          default-active 默认激活 对应的是 el-menu-item 的index属性值
          el-submenu  子菜单
          el-menu-item 菜单项
          el-menu-item-group 菜单项分组
          active-text-color 激活颜色
          :router表示开启vue-router模式,导航时以 index 作为 path 进行路由跳转
          :default-active="$route.path"  //默认激活样式为当前路由的路径
        -->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-menu-item index="/home">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="String(menu.id)" v-for="menu in menuData" :key="menu.id">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>{{ menu.name }}</span>
            </template>
            <el-menu-item
              :index="'/' + item.link"
              v-for="item in menu.children"
              :key="item.id"
            >
              <i class="el-icon-menu"></i>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue"; //导入子组件

export default {
  name: "Home",
  data() {
    return {
      username: "",
      menuData: [],
    };
  },
  created() {
    this.username = window.sessionStorage.getItem("username");
    //获取菜单栏
    this.$axios.get("/api/perms/list?username=" + this.username).then((res) => {
      this.menuData = res.data.data;
    });
  },
  methods: {
    logout() {
      this.$confirm("此操作将退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "欢迎下次光临!",
            offset: 300,
            duration: 1000, //显示的时间,ms
          });
          //移除localStorage 里面的strToken
          window.localStorage.removeItem("strToken");
          window.sessionStorage.removeItem("username");
          //路由到登录
          this.$router.push("/login");
        })
        .catch(() => {});
    },
  },
  components: {},
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
