// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Buefy from 'buefy' 

// import { dom } from '@fortawesome/fontawesome-svg-core' 
// dom.watch()
window._ = require('lodash');

library.add(fas)
 


Vue.component('fa-i', FontAwesomeIcon)

Vue.use(Buefy, {  defaultIconPack: 'fas'} ); 
Vue.http.options.root = 'http://localhost:3000/'
Vue.config.productionTip = false
/* eslint-disable */ 
/* eslint-disable */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})