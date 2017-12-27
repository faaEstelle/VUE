import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'

import Index from './pages/Index'
import Main from './pages/Main'

Vue.use(VueRouter)
Vue.config.debug = true

const routes = [
  // {
  //   path: '/',
  //   component: Index
  // },
  {
    path:'/',
    component:Main
  },
  {
    path: '*',
    component: Index
  },

]

const Router = new VueRouter({routes})

new Vue({el: '#app', router: Router, render: h => h(App)})

// console.log(global.process.mainModule)
// try {}catch
// global.process.on('uncaughtException', function (e) { console.log(e) })