<template>
  <div class="header-container">
    <div class="l-content">
      <el-button @click="handleMenu" size="mini" type="info" icon="el-icon-menu"></el-button>
      <span class="text">首页</span>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="../assets/logo.png" width="27px" alt="头像"></img>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided>个人中心</el-dropdown-item>
          <el-dropdown-item divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleMenu() {
      return this.$store.commit('collapseMenu')
    }
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

  .text {
    font-size: 14px;
    color: aliceblue;
    margin-left: 10px;
  }
}
</style>
