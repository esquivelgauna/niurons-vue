import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import NiuronsNavBar from '@/components/NiuronsNavBar'
import Landing from '@/components/Landing'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Resource)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/nav',
      name: 'NiuronsNavBar',
      component: NiuronsNavBar
    }
  ]
})