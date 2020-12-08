import Vue from 'vue'
import App from './App'
import router from './router'
// 静态资源
import './assets/css/reset.css'
// ui框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// 图片前缀
Vue.prototype.$preImg = 'http://localhost:3000'

// 导入仓库
import store from './store/index'
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
