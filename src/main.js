import Vue from 'vue';
import App from './App.vue';
import router from './router';
import element from './plugins/elementImport';
import 'amfe-flexible';
import './assets/icons';
import '@/assets/styles/vendors-extensions/_element.scss';

Vue.config.productionTip = false;
Vue.use(element);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
