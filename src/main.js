import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import './utils/register-vant'
// 表单验证初始化插件
import './utils/validation.js'

// 自己设置的样式文件要放在第三方的后面，css具有层叠性和优先级，如果放在前面就会影响第三方
import './styles/index.less'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
