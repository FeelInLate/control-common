import Cookie from "js-cookie";
export default {
  state: {
    isCollapse: false, //菜单是否合并
    tabList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/Home",
      },
    ],
    menu: [],
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    selectMenu(state, val) {
      console.log(val, "val");
      // 判断添加的数据是否为首页
      if (val.name !== "home") {
        let index = state.tabList.findIndex((item) => item.name == val.name);
        if (index == -1) {
          state.tabList.push(val);
        }
      }
    },
    // 删除指定的tag数据
    closeTag(state, tag) {
      console.log(tag, "TAG");
      const index = state.tabList.findIndex((item) => item.name === tag.name);
      state.tabList.splice(index, 1);
    },
    //设置menu的数据
    setMenu(state, val) {
      state.menu = val;
      Cookie.set("menu", JSON.stringify(val));
    },
    // 动态注册路由
    addMenu(state, router) {
      //判断当前缓存中是否有数据
      if (!Cookie.get("menu")) return;
      const menu = JSON.parse(Cookie.get("menu"));
      state.menu = menu;
      // 组装动态路由的数据
      const menuArray = [];
      menu.forEach((item) => {
        // 有子菜单
        if (item.children) {
          item.children.map((item) => {
            item.component = () => import(`../views/${item.url}`)
            return item;
          })
          menuArray.push(...item.children)
        }else{
          item.component = () => import(`../views/${item.url}`)
          menuArray.push(item)
        }
      });
      // 路由的动态添加
      menuArray.forEach(item => {
        router.addRoute('Main',item)
      })
    },
  },
};
