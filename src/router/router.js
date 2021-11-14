import Vue from 'vue'
import Router from 'vue-router'
import News from '../../view/News'
import Home from '../../view/Home'
import Products from '../../view/Products'

Vue.use(Router)

// 获取原型对象上的push函数
const originalPush = Router.prototype.push
// 修改原型对象中的push方法
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/news',
      component: News,
      meta: {
        title: '新闻'
      }
    },
    {
      path: '/products',
      component: Products,
      meta: {
        title: '产品'
      }
    }
  ]
})
