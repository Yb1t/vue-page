<template>
  <div class="bg">
  <div class="home">
    <div style="text-align: center">
      <h1>欢迎来到1316公司</h1>
      <img src="../src/assets/logo.png"  height="200px" width="200px" style="margin: 50px">
      <div class="tag-group">
        <el-tag
          v-for="item in items"
          :key="item.label"
          :type="item.type"
          effect="dark"
          style="margin: 0 20px">
          <el-link :href="item.url" style="color: white" target="_blank">{{ item.label }}</el-link>
        </el-tag>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      items: [
        { type: '', label: '公司简介', url: 'https://www.guet.edu.cn/xxjj.htm' },
        { type: 'success', label: '客户服务', url: 'https://utsc.guet.edu.cn/' },
        { type: 'warning', label: '人才招聘', url: 'https://www.guet.edu.cn/rsc/list.jsp?urltype=tree.TreeTempUrl&wbtreeid=1105' },
        { type: 'danger', label: '联系我们', url: 'https://www.guet.edu.cn/zs/' }
      ]
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.bg {
  padding: 20px 0;
  background-image: linear-gradient(25deg, #ab3157, #ab5e83, #a283b1, #8ba7e2)
}
.home {
  width: 1280px;
  /*height: 800px;*/
  margin: 220px auto;
  color: white;
}
</style>
