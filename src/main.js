import Vue from 'vue'
import VueRouter from 'vue-router'
import VueSession from 'vue-session'
// Bootstrap
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Components
import App from './App.vue'
import Dashboard from './pages/Dashboard'
import Controls from './pages/Controls'
import Bills from './pages/Bills'
import DayView from './pages/DayView'
import Login from './pages/Login'
Vue.config.productionTip = false

const routes = [
  { path: "/", component: Dashboard },
  { path: "/controls", component: Controls },
  { path: "/bills", component: Bills },
  { path: "/day", component: DayView },
  { path: "/login", component: Login }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

Vue.use(VueSession)
Vue.use(BootstrapVue)
Vue.use(VueRouter)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
