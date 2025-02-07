import Vue from 'vue'  //基础vue.js库
import VueRouter from 'vue-router'  //导入本地库第三方js库文件
import Home from '../views/home/Home.vue' // 开发的组件文件,导入的是组件对象
import Login from '../views/login/Login.vue'

Vue.use(VueRouter)
//调用Vue.use()时会调用插件的install方法,使得其能够全局使用 全局导入,其他要使用路由的地方,无需再import
// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

const router = new VueRouter({
  routes:[
    {path:'/',redirect:'/login'}, //路由重定向
    {path:'/login',name:'Login',component:Login},
    {
      path:'/home',
      name:'Home',
      component:Home,
      children:[  //嵌套路由
        {
          path:'/teachers',
          name:'Teacher',
          component:()=>import('../components/teacher/Teacher.vue')
        },
        {
          path:'/course',
          name:'Course',
          component:()=>import('../components/course/Course.vue')
        }
      ]
    }
  ]
});

router.beforeEach((to,from,next)=>{
  if(to.path === '/login'){ //如果请求的path为login 
    next(); //放行
  }
  else{ //否则，路由的path不是请求login
    const token = localStorage.getItem('strToken');  //获取token
    token ? next() : next('/login') //如果取到了，放行，没有取到转路径login
  }
})

export default router
