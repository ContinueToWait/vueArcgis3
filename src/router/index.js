import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: '首页',leftArrow:false,index:0  },
      component: resolve => (require(["@/pages/Home"], resolve))
    },
    {
      path: '/list',
      name: 'list',
      meta: { title: '列表' ,leftArrow:true,index:1 },
      component: resolve => (require(["@/pages/List"], resolve))
    }
  ]
})
