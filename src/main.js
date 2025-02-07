import Vue from 'vue'  //当不使用相对路径时,会去本地node_modules中查找 vue.js包  <script src="vue-2.6.xx.js">
import axios from '@/utils/axiosutil.js'
import qs from 'qs'  //导入本地库的     qs.js
import App from './App.vue' //指定相对路径名,查找当前路径下组件
import router from './router'  //导入router目录下的默认文件 index.js
// 引入 element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/common.css'

// 使用use安装一下
Vue.use(ElementUI)
//配置一个全局属性
Vue.prototype.$axios=axios
Vue.prototype.$qs=qs

//关闭用于生产环境的提示信息
Vue.config.productionTip = false

//创建根组件对象
new Vue({
  router,  //注册路由
  render: h => h(App) //指定根组件模板元素
}).$mount('#app') //挂载模板

