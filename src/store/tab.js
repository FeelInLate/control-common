export default {
    state: {
        isCollapse: false //菜单是否合并
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        }
    }

}