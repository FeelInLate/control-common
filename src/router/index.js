import Vue from "vue";
import VueRouter from "vue-router";
// 1.创建路由组件
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import Main from "../views/Main.vue";
import Mall from "../views/Mall.vue";
import PageOne from "../views/PageOne.vue";
import PageTwo from "../views/PageTwo.vue";

Vue.use(VueRouter);
// 2.将路由与组件进行映射
const routes = [
  // 主路由
  {
    path: "/",
    redirect:"/home",
    component: Main,
    children: [
      {
        path: "home", //首页
        component: Home,
      },
      {
        path: "user", //用户管理
        component: User,
      },
      {
        path:"mall",//商品管理
        component: Mall,
      },
      {
        path:"page1",//页面1
        component: PageOne,
      },
      {
        path:"page2",//页面2
        component: PageTwo,
      },
    ],
  },
];
// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes, // (缩写) 相当于 routes: routes
});

export default router;
