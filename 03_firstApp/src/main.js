// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vant from 'Vant'
import 'vant/lib/index.css'
import App from './App'
import router from './router'
import util from '@/pages/commonJS/util'
Vue.use(Vant);
Vue.config.productionTip = false
Vue.prototype.$util = util;//工具函数导入
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
