// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store/index";
import ElementUI from 'element-ui';
import Echarts from 'echarts'
import 'echarts-liquidfill'
import scroll from 'vue-seamless-scroll'
import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/css/style.css"
import * as mapUtil from '@/utils/mapUtil.js'
import * as configUrl from "@/assets/js/config.js";

import axiosApi from '@/assets/js/axios.js'
Vue.use(axiosApi)
Vue.prototype.mapUtil=mapUtil;
Vue.prototype.configUrl=configUrl;


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(scroll);
Vue.prototype.$echarts = Echarts;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
