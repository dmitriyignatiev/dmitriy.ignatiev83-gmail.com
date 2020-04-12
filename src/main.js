import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
Vue.use(VueResource);



Vue.config.productionTip = false

export const bus =new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')
