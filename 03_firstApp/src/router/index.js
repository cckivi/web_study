import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MyProject from '@/pages/MyProject'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: MyProject
    },
    {
      path: '/echartDemo',
      name: 'echartDemo',
      component: resolve => require(['@/pages/EchartDemo.vue'], resolve)
    },
    {
      path: '/vantDemo',
      name: 'vantDemo',
      component: resolve => require(['@/pages/vantDemo.vue'], resolve)
    },
    {
      path: '/elementDemo',
      name: 'elementDemo',
      component: resolve => require(['@/pages/elementDemo.vue'], resolve)
    },
  ]
})
