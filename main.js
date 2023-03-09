
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 导入 vuex 实例
import store from './store';

Vue.config.productionTip = false

App.mpType = 'app'

// main.js导入uView
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

const app = new Vue({
    ...App,
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif