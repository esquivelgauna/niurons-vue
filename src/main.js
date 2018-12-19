// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Buefy from 'buefy'

window.validate = require("validate.js");
window._ = require('lodash');
library.add(fas);
Vue.component('fa-i', FontAwesomeIcon);
Vue.use(Buefy, {  defaultIconPack: 'fas'} ); 

Vue.prototype.$host = 'http://localhost:3000';
Vue.http.options.root = 'http://localhost:3000/api/' ;
Vue.config.productionTip = false;
Vue.http.options.credentials = false;
Vue.http.interceptors.push(function(request  , next ) {
  if (localStorage.getItem('token')) {
    try {
      request.headers.set("Accept", "application/json");
      request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token') );
    } catch (e) { 
    }
  }
  // next();
});

//  
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  
})