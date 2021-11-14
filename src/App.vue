<template>
  <div id="app">
<!--element样式导航栏，需要用到js-->
<!--    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" class="nav">-->
<!--      <el-menu-item>-->
<!--        <el-link href="/">-->
<!--          <img src="./assets/logo.png" height="30" width="30" alt="logo">-->
<!--          1316公司-->
<!--        </el-link>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="0">首页</el-menu-item>-->
<!--      <el-menu-item index="1">新闻</el-menu-item>-->
<!--      <el-menu-item index="2">产品</el-menu-item>-->
<!--    </el-menu>-->

<!--改用bootstrap，仅用到css-->
    <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <a class="navbar-brand" href="/">
        <img src="./assets/logo.png" width="30px" height="30px" class="d-inline-block align-top" alt="">
        1316公司
      </a>
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link">主页</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/news" class="nav-link">新闻</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/products" class="nav-link">产品</router-link>
        </li>
      </ul>
    </nav>

    <router-view></router-view>

      <el-divider><span style="text-align: center; color: #AAA;">
      Made by 1900301316黄伟浩 with 💗. Powered by <el-link href="https://cn.vuejs.org/" :underline="false" type="primary" target="_blank">VUE</el-link>
      </span></el-divider>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      activeIndex: '0',
      routers: ['/', '/news', '/products']
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      this.$router.push({path: this.routers[key]})
    }
  }
}

</script>

<style scoped>
/*使用element导航栏时启用.nav*/
/*.nav {*/
/*  !*固定导航栏位置在页面上方*!*/
/*  position: sticky;*/
/*  top: 0;*/
/*  !*置顶导航栏*!*/
/*  z-index: 1000;*/
/*  !* 样式 *!*/
/*  opacity: 90%;*/
/*}*/
</style>
