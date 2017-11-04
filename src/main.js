import Vue from 'vue';
import App from './App';

import Router from 'vue-router';
import goods from '@/components/goods/goods';
import ratings from '@/components/ratings/ratings';
import seller from '@/components/seller/seller';

import VueResource from 'vue-resource';

Vue.config.productionTip = false;

Vue.use(Router);

var router = new Router({
  routes: [
		  { path: '/goods', component: goods },
		  { path: '/ratings', component: ratings },
		  { path: '/seller', component: seller }
		],
	linkActiveClass: "active"
})

router.push('/goods');	

Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  router: router,
  render: h => h(App)                                                           // ES5  
}).$mount('#app')		                  		                                //(function (h) {  
																				//  return h(App);  
    																			//});  
  
																				// ES6  
																				// h => h(App);
																				
																				//new Vue({
																				//  el: '#app',
																				//  components: { App:APP }
																				//});

