<template>
  <div class="tags">
    <el-tag
      v-for="(tag, index) in tags"
      :key="index"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'light'"
      @click="clickTag(tag)"
      @close="handleTag(tag,index)"
      size="small"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>
<script>
import { mapState,mapMutations } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  methods: {
    ...mapMutations(['closeTag']),
    // 点击tag跳转功能
    clickTag(tag) {
      if (
        this.$route.path != tag.path &&
        !(this.$route.path == "/home" && tag.path == "/")
      ) {
        this.$router.push(tag.path);
      }
    },
    // 点击tag关闭功能
    handleTag(tag,index) { //index：删除之前的值 
        this.closeTag(tag)
        const length = this.tags.length // length:删除之后的值
        // 删除之后的跳转逻辑
        if (tag.name !== this.$route.name){
            return
        }
        // 表示的是删除的最后一项
        if (index === length) {
            this.$router.push({
                name: this.tags[index-1].name
            })
        } else {
            this.$router.push({
                name: this.tags[index].name
            })
        }
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
};
</script>
<style lang="less" scoped>
.tags {
    margin-top: 20px;
    margin-left: 20px;
    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}

</style>