import Vue from 'vue'
import VueRouter from 'vue-router'
// Bootstrap
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Components
import App from './App.vue'
import Dashboard from './components/Dashboard'

Vue.config.productionTip = false

const routes = [
  { path: "/", component: Dashboard },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

Vue.use(BootstrapVue)
Vue.use(VueRouter)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
