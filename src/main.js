import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './common/axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import store from './store/index'

Vue.use(ElementUI)
var echarts = require('echarts');
// require('echarts/lib/chart/bar');
// require('echarts/lib/chart/pie');
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');

Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
