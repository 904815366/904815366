<template>
  <div style="height: 100%">
    <!-- 
    el-form 表单元素
    ref -对应vue.js ref属性 -this.$refs.属性
    :model 绑定表单对象
    label-width 宽度
    
    el-form-item 表单项
    el-input 文本框
      |-v-model双向绑定

    细节:动态绑定的值 如果是数值或布尔值,为了避免当字符串值来使用都需要加上:
    -->
    <el-row type="flex" justify="center" align="middle" style="height: 100%">
      <el-col :span="8">
        <h1>K15-后台管理系统</h1>
        <br />
        <el-form ref="loginForm" :rules="rules" :model="user" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="user.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
            <el-button @click="restForm">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    goHome() {
      this.$router.push("/home");
    },
    onSubmit() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          //发送axios请求
          // axios.post("/api/login","username="+this.user.username+
          //             "&password="+this.user.password)
          let reqUrl = this.$qs.stringify(this.user); //将请求的对象参数转换为url字符串
          //console.log(reqUrl);  //测试输出
          this.$axios.post("/api/login", reqUrl).then((res) => {
            console.log(res.data);
            if (res.data.status === 200) {
              //添加消息提示
              this.$message({
                showClose: true,
                message: "欢迎您，" + this.user.username,
                type: "success",
                offset: 300,
                duration: 1000, //显示的时间,ms
              });
              //将收到strToken存入到localStorage
              window.localStorage.setItem("strToken", res.data.data);
              window.sessionStorage.setItem("username", this.user.username);
              //进入后台首页
              this.$router.push("/home");
            } else {
              //弹出消息
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: "error", //消息框类型
                offset: 550, //距离顶端偏移量
                duration: 1000, //显示的时间,ms
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    restForm() {
      //重置
      this.$refs["loginForm"].resetFields();
    },
  },
  created() {},
};
</script>

<style scoped>
.el-row {
  height: 100%;
  background: #2d434c;
}

.el-col {
  background: #fff;
  padding: 20px 30px;
  border-radius: 15px;
}
</style>
