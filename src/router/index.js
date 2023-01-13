import Vue from "vue";
import VueRouter from "vue-router";
// 1.创建路由组件
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import Main from "../views/Main.vue";
import Mall from "../views/Mall.vue";
import PageOne from "../views/PageOne.vue";
import PageTwo from "../views/PageTwo.vue";
import Login from '../views/Login.vue'
Vue.use(VueRouter);
// 2.将路由与组件进行映射
const routes = [
  // 主路由
  {
    path: "/",
    redirect:"/home",
    name: 'Main',
    component: Main,
    children: [
      // {
      //   path: "home", //首页
      //   component: Home,
      //   name: 'home'
      // },
      // {
      //   path: "user", //用户管理
      //   component: User,
      //   name: 'user'
      // },
      // {
      //   path:"mall",//商品管理
      //   component: Mall,
      //   name: 'mall'
      // },
      // {
      //   path:"page1",//页面1
      //   component: PageOne,
      //   name: 'page1'
      // },
      // {
      //   path:"page2",//页面2
      //   component: PageTwo,
      //   name: 'page2'
      // },
    ],
  },
  {
    path: '/login',
    component: Login,
    name: 'login'
  }
];
// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes, // (缩写) 相当于 routes: routes
});

export default router;
