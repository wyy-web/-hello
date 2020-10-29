//模块化方式引入
import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import "u-reset.css";
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import filter from "./fiter/index";


Object.keys(filter).forEach(ele=>{
  Vue.filter(ele,filter[ele]);
})

Vue.prototype.$http = axios;
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
