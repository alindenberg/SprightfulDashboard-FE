import Vue from 'vue'
import VueRouter from 'vue-router'
// Bootstrap
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Components
import App from './App.vue'
import Dashboard from './pages/Dashboard'
import Controls from './pages/Controls'
import Bills from './pages/Bills'

Vue.config.productionTip = false

const routes = [
  { path: "/", component: Dashboard },
  { path: "/controls", component: Controls },
  { path: "/bills", component: Bills }
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
