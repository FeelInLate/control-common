<template>
  <div class="header-container">
    <div class="l-content">
      <el-button @click="handleMenu" size="mini" type="info" icon="el-icon-menu"></el-button>

      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.name" :to="{ path: item.path }">{{
          item.label
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="r-content">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img src="../assets/logo.png" width="27px" alt="头像"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided>个人中心</el-dropdown-item>
          <el-dropdown-item divided command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
  data() {
    return {}
  },
  methods: {
    handleMenu() {
      return this.$store.commit('collapseMenu')
    },
    handleCommand(command) {
      if (command == 'logout') {
        //清除cookie中token
        Cookie.remove('token')
        // 清除cookie中的menu
        Cookie.remove('menu')
        //跳转到登录页面
        this.$router.push('/login')
      }

    }
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabList
    })
  },
  mounted() {
    // console.log(this.tags, 'tags')
  }


};
</script>
<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .l-content {
    display: flex;
    align-items: center;

    /deep/.el-breadcrumb {
      font-size: 20px;
      padding-left: 15px;

      .el-breadcrumb__item {
        .el-breadcrumb__inner {
          &.is-link {
            color: rgb(94, 91, 91);

            &:hover {
              color: rgb(28, 202, 214);
            }
          }
        }

        &:last-child {
          .el-breadcrumb__inner {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
